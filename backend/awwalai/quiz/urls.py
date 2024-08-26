from django.urls import path
from .views import (
    ContentUploadAPIView,
    GenerateQuizAPIView,
    RetrieveQuizAPIView,
    SubmitQuizAnswerAPIView,
    QuizResultAPIView,
    UserQuizzesAPIView,
    UserQuizResultsAPIView
)

urlpatterns = [
    path('content/upload/', ContentUploadAPIView.as_view(), name='content-upload'),
    path('generate/', GenerateQuizAPIView.as_view(), name='quiz-generate'),
    path('<int:quiz_id>/', RetrieveQuizAPIView.as_view(), name='quiz-retrieve'),
    path('<int:quiz_id>/submit/', SubmitQuizAnswerAPIView.as_view(), name='quiz-submit'),
    path('<int:quiz_id>/result/', QuizResultAPIView.as_view(), name='quiz-result'),
    path('user/quizzes/', UserQuizzesAPIView.as_view(), name='user-quizzes'),
    path('user/quiz-results/', UserQuizResultsAPIView.as_view(), name='user-quiz-results'),
]
