from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, QuizViewSet

router = DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'quizzes', QuizViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
