from django.db import models
from django.conf import settings

# Assuming `CustomUser` is defined in your `users` app
User = settings.AUTH_USER_MODEL

class Document(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('link', 'Link'),
        ('file', 'File'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(upload_to='documents/', null=True, blank=True)
    link = models.URLField(max_length=500, null=True, blank=True)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document {self.id} by {self.user.username}"

class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quizzes')
    content = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='quizzes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quiz {self.id} by {self.user.username}"

class Question(models.Model):
    QUESTION_TYPE_CHOICES = [
        ('objective', 'Objective'),
        ('subjective', 'Subjective'),
    ]
    
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPE_CHOICES)
    options = models.JSONField(null=True, blank=True)  # For objective questions
    correct_answer = models.TextField()

    def __str__(self):
        return f"Question {self.id} in Quiz {self.quiz.id}"

class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='user_answers')
    user_answer = models.TextField()
    is_correct = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Answer by {self.user.username} for Question {self.question.id}"

class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_results')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='results')
    score = models.FloatField()
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result of Quiz {self.quiz.id} by {self.user.username}"

class QuizHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_histories')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='histories')
    quiz_result = models.ForeignKey(QuizResult, on_delete=models.CASCADE, related_name='histories')
    taken_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"History of Quiz {self.quiz.id} by {self.user.username}"
