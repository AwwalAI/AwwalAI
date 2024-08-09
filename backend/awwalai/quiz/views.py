from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .services.file_processing_service import FileProcessingService
from .services.webscrapService import get_text_from_url
from .services.aiService import generate_quiz  # Assuming this is the function in your aiservice.py
from .models import QuizHistory  # You'll need to create this model

class GenerateQuizAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.file_processing_service = FileProcessingService()

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        url = request.data.get('url')
        
        if not file and not url:
            return Response({'error': 'Either a file or URL must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if file and url:
            return Response({'error': 'Please provide either a file or URL, not both.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if file:
                content = self.process_file(file)
            else:
                content = self.scrape_url(url)

            # Extract quiz parameters from request data
            objective = request.data.get('objective', True)
            subjective = request.data.get('subjective', True)
            num_objective = int(request.data.get('num_objective', 5))
            num_subjective = int(request.data.get('num_subjective', 5))

            # Generate quiz
            quiz = generate_quiz(content, objective, subjective, num_objective, num_subjective)
            # Save quiz to user's history
            QuizHistory.objects.create(
                user=request.user,
                content=content,
                quiz=quiz
            )

            return Response({'quiz': quiz}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def process_file(self, file):
        max_file_size = 10 * 1024 * 1024  # 10 MB
        if file.size > max_file_size:
            raise ValueError('File size exceeds the limit of 10MB')
        return self.file_processing_service.process_file(file)

    def scrape_url(self, url):
        content = get_text_from_url(url)
        if content is None:
            raise ValueError('Unable to scrape the provided URL. Please ensure the web page is publicly available.')
        return content