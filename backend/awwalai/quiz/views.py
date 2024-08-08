from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Document, Quiz, Question
from .serializers import DocumentSerializer, QuizSerializer, QuestionSerializer
import google.generativeai as genai

genai.configure(api_key="AIzaSyC-LUvMCSM3oaFimJxK1ROjXlrb67T3Kd0")

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def generate_quiz(self, request, pk=None):
        document = self.get_object()
        # Process the document and extract context
        context = self.extract_text(document.file.path)
        
        # Generate questions and answers
        prompt = f"""
        Read the following text carefully:

        Context: {context}

        Task: Generate up to 10 high-quality question and answer pairs based on the given context. Follow these guidelines:

        1. Question:
           - Make it relevant to the context
           - Ensure it's specific and thought-provoking
           - Use clear and concise language

        2. Answer:
           - Provide a comprehensive and accurate response
           - Include key details from the context
           - Keep the answer focused and to-the-point

        Format:
        Q: [Your generated question]
        A: [Your generated answer]

        Now, generate question and answer pairs:
        """
        
        generation_config = {
            "temperature": 0.9,
            "top_p": 0.95,
            "top_k": 32,
            "max_output_tokens": 1024,
            "response_mime_type": "text/plain",
        }

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
        )

        response = model.generate_content(prompt)

        quiz = Quiz.objects.create(user=request.user, context=context)
        for qa_pair in response.text.split("\n\n"):
            question_text, answer_text = qa_pair.split("\nA: ")
            question_text = question_text.replace("Q: ", "")
            Question.objects.create(quiz=quiz, question_text=question_text, answer_text=answer_text)

        return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)

    def extract_text(self, file_path):
        # Implement your document extraction logic here
        return "Extracted text from document"

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
