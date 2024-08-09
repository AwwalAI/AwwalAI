from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class QuizHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    quiz = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']