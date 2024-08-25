from django.urls import path
from .views import (
    ContentUploadAPIView,
    GenerateQuizAPIView,
    RetrieveQuizAPIView,
    SubmitQuizAnswerAPIView,
    QuizResultAPIView,
    UserQuizHistoryAPIView,
)

urlpatterns = [
    path('content/upload/', ContentUploadAPIView.as_view(), name='content-upload'),
    path('generate/', GenerateQuizAPIView.as_view(), name='quiz-generate'),
    path('<int:quiz_id>/', RetrieveQuizAPIView.as_view(), name='quiz-retrieve'),
    path('<int:quiz_id>/submit/', SubmitQuizAnswerAPIView.as_view(), name='quiz-submit'),
    path('<int:quiz_id>/result/', QuizResultAPIView.as_view(), name='quiz-result'),
    path('user/<int:user_id>/history/', UserQuizHistoryAPIView.as_view(), name='user-quiz-history'),
]
