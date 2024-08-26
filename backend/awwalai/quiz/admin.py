from django.contrib import admin
from .models import Document, Quiz, Question, UserAnswer, QuizResult, QuizHistory

# Register the Document model
@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content_type', 'created_at')
    list_filter = ('content_type', 'created_at')
    search_fields = ('user__username', 'link')
    readonly_fields = ('created_at',)

# Register the Quiz model
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'content', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'content__id')
    readonly_fields = ('created_at',)

# Register the Question model
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'quiz', 'question_type', 'question_text')
    list_filter = ('question_type',)
    search_fields = ('question_text', 'quiz__id')
    readonly_fields = ('quiz',)

# Register the UserAnswer model
@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'question', 'is_correct', 'submitted_at')
    list_filter = ('is_correct', 'submitted_at')
    search_fields = ('user__username', 'question__question_text')
    readonly_fields = ('submitted_at',)

# Register the QuizResult model
@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'quiz', 'score', 'total_questions', 'correct_answers', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'quiz__id')
    readonly_fields = ('created_at',)

# Register the QuizHistory model
@admin.register(QuizHistory)
class QuizHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'quiz', 'quiz_result', 'taken_at')
    list_filter = ('taken_at',)
    search_fields = ('user__username', 'quiz__id')
    readonly_fields = ('taken_at',)