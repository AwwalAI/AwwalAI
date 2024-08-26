from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .services.file_processing_service import FileProcessingService
from .services.webscrapService import get_text_from_url
from .services.aiService import generate_quiz
from .models import UserAnswer, QuizResult, Question
from .serializers import *

class ContentUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        url = request.data.get('url')

        if not file and not url:
            return Response({'error': 'Either a file or URL must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if file and url:
            return Response({'error': 'Please provide either a file or URL, not both.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            content_type = 'file' if file else 'link'
            content = None

            if file:
                file_processing_service = FileProcessingService()
                content = file_processing_service.process_file(file)
            else:
                content = get_text_from_url(url)
                if content is None:
                    return Response({'error': 'Unable to scrape the provided URL. Please ensure the web page is publicly available.'}, status=status.HTTP_400_BAD_REQUEST)

            # Save the content in the Document model
            document = Document.objects.create(user=request.user, content_type=content_type, file=file if file else None, link=url if url else None)
            return Response({'content_id': document.id, 'status': 'Content uploaded successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GenerateQuizAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        content_id = request.data.get('content_id')
        if not content_id:
            return Response({'error': 'Content ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            content = Document.objects.get(id=content_id, user=request.user)
            # Check if a quiz already exists for this content
            existing_quiz = Quiz.objects.filter(content=content).first()
            if existing_quiz:
                # Serialize existing quiz questions and return them
                quiz_content = {
                    'title': existing_quiz.title,
                    'objective': [],
                    'subjective': []
                }
                
                for question in existing_quiz.questions.all():
                    question_data = {
                        'question_text': question.question_text,
                        'question_type': question.question_type,
                    }
                    if question.question_type == 'objective':
                        question_data['options'] = question.options
                    quiz_content[question.question_type].append(question_data)

                return Response({'quiz_id': existing_quiz.id, 'title': quiz_content['title'], 'questions': quiz_content}, status=status.HTTP_200_OK)

            # If no quiz exists, generate a new one
            content_text = content.file.read().decode('utf-8') if content.file else content.link

            objective = request.data.get('objective', True)
            subjective = request.data.get('subjective', True)
            num_objective = int(request.data.get('num_objective', 5))
            num_subjective = int(request.data.get('num_subjective', 5))

            # Generate the quiz content including the title
            quiz_content = generate_quiz(content_text, objective, subjective, num_objective, num_subjective)

            # Create a new quiz with the generated title
            quiz = Quiz.objects.create(user=request.user, content=content, title=quiz_content['title'])

            # Save the generated questions to the database
            for q in quiz_content['objective']:
                Question.objects.create(
                    quiz=quiz,
                    question_text=q['question'],
                    question_type='objective',
                    options=q['options'],
                    correct_answer=q['answer']
                )

            for q in quiz_content['subjective']:
                Question.objects.create(
                    quiz=quiz,
                    question_text=q['question'],
                    question_type='subjective',
                    correct_answer=q['answer']
                )

            return Response({'quiz_id': quiz.id, 'title': quiz.title, 'questions': quiz_content}, status=status.HTTP_200_OK)

        except Document.DoesNotExist:
            return Response({'error': 'Document not found or you do not have permission to access this content.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
class RetrieveQuizAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id, *args, **kwargs):
        try:
            quiz = Quiz.objects.get(id=quiz_id, user=request.user)
            questions = quiz.questions.all()

            question_data = []
            for question in questions:
                question_data.append({
                    'id': question.id,
                    'question_text': question.question_text,
                    'question_type': question.question_type,
                    'options': question.options if question.question_type == 'objective' else None
                })

            return Response({'quiz_id': quiz.id, 'title': quiz.title, 'questions': question_data}, status=status.HTTP_200_OK)

        except Quiz.DoesNotExist:
            return Response({'error': 'Quiz not found or you do not have permission to access this quiz.'}, status=status.HTTP_404_NOT_FOUND)

class SubmitQuizAnswerAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id, *args, **kwargs):
        try:
            quiz = Quiz.objects.get(id=quiz_id, user=request.user)
            question_id = request.data.get('question_id')
            user_answer = request.data.get('user_answer')

            question = Question.objects.get(id=question_id, quiz=quiz)

            is_correct = question.correct_answer == user_answer

            UserAnswer.objects.create(user=request.user, question=question, user_answer=user_answer, is_correct=is_correct)

            return Response({'is_correct': is_correct}, status=status.HTTP_200_OK)

        except Quiz.DoesNotExist:
            return Response({'error': 'Quiz not found or you do not have permission to access this quiz.'}, status=status.HTTP_404_NOT_FOUND)

        except Question.DoesNotExist:
            return Response({'error': 'Question not found or it does not belong to this quiz.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class QuizResultAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id, *args, **kwargs):
        try:
            # Fetch the quiz for the authenticated user
            quiz = Quiz.objects.get(id=quiz_id, user=request.user)

            # Fetch all the user's answers for the quiz
            user_answers = UserAnswer.objects.filter(user=request.user, question__quiz=quiz)

            total_questions = quiz.questions.count()
            correct_answers = user_answers.filter(is_correct=True).count()

            # Calculate the score as a percentage
            score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0

            # Check if a QuizResult already exists for this user and quiz
            quiz_result, created = QuizResult.objects.get_or_create(
                user=request.user,
                quiz=quiz,
                defaults={
                    'score': score,
                    'total_questions': total_questions,
                    'correct_answers': correct_answers
                }
            )

            # If the QuizResult already exists, update it with the new score
            if not created:
                quiz_result.score = score
                quiz_result.total_questions = total_questions
                quiz_result.correct_answers = correct_answers
                quiz_result.save()

            # Optionally update or create a QuizHistory entry
            QuizHistory.objects.update_or_create(
                user=request.user,
                quiz=quiz,
                defaults={'quiz_result': quiz_result}
            )

            return Response({
                'score': quiz_result.score,
                'total_questions': quiz_result.total_questions,
                'correct_answers': quiz_result.correct_answers
            }, status=status.HTTP_200_OK)

        except Quiz.DoesNotExist:
            return Response({
                'error': 'Quiz not found or you do not have permission to access this quiz.'
            }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserQuizzesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Fetch all quizzes taken by the authenticated user
            user_quizzes = Quiz.objects.filter(user=request.user).order_by('-created_at')

            # Serialize the quiz data including the title
            serialized_quizzes = QuizSerializerR(user_quizzes, many=True).data

            return Response({'quizzes': serialized_quizzes}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserQuizResultsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Fetch all quiz results for the authenticated user
            user_quiz_results = QuizResult.objects.filter(user=request.user).order_by('-created_at')

            # Serialize the quiz results data
            serialized_results = QuizResultSerializer(user_quiz_results, many=True).data

            return Response({'quiz_results': serialized_results}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)