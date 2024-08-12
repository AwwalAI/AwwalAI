from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .services.file_processing_service import FileProcessingService
from .services.webscrapService import get_text_from_url
from .services.aiService import generate_quiz

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
            content_text = content.file.read().decode('utf-8') if content.file else content.link

            objective = request.data.get('objective', True)
            subjective = request.data.get('subjective', True)
            num_objective = int(request.data.get('num_objective', 5))
            num_subjective = int(request.data.get('num_subjective', 5))

            quiz_content = generate_quiz(content_text, objective, subjective, num_objective, num_subjective)

            quiz = Quiz.objects.create(user=request.user, content=content)

            for q in quiz_content['objective']:
                Question.objects.create(quiz=quiz, question_text=q['question'], question_type='objective', options=q['options'], correct_answer=q['answer'])

            for q in quiz_content['subjective']:
                Question.objects.create(quiz=quiz, question_text=q['question'], question_type='subjective', correct_answer=q['answer'])

            return Response({'quiz_id': quiz.id, 'questions': quiz_content}, status=status.HTTP_200_OK)

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

            return Response({'quiz': quiz.id, 'questions': question_data}, status=status.HTTP_200_OK)

        except Quiz.DoesNotExist:
            return Response({'error': 'Quiz not found or you do not have permission to access this quiz.'}, status=status.HTTP_404_NOT_FOUND)


from .models import UserAnswer, QuizResult, Question

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

            # Create a QuizResult entry for the quiz
            quiz_result = QuizResult.objects.create(
                user=request.user,
                quiz=quiz,
                score=score,
                total_questions=total_questions,
                correct_answers=correct_answers
            )

            # Create an entry in QuizHistory if needed (not mandatory)
            QuizHistory.objects.create(user=request.user, quiz=quiz, quiz_result=quiz_result)

            return Response({
                'score': score,
                'total_questions': total_questions,
                'correct_answers': correct_answers
            }, status=status.HTTP_200_OK)

        except Quiz.DoesNotExist:
            return Response({
                'error': 'Quiz not found or you do not have permission to access this quiz.'
            }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserQuizHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        try:
            if request.user.id != user_id:
                return Response({'error': 'You do not have permission to view this history.'}, status=status.HTTP_403_FORBIDDEN)

            quiz_history = QuizHistory.objects.filter(user=request.user).order_by('-taken_at')

            history_data = []
            for history in quiz_history:
                history_data.append({
                    'quiz_id': history.quiz.id,
                    'score': history.quiz_result.score,
                    'total_questions': history.quiz_result.total_questions,
                    'correct_answers': history.quiz_result.correct_answers,
                    'taken_at': history.taken_at
                })

            return Response({'quiz_history': history_data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
