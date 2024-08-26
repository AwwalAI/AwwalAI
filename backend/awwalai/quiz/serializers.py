from rest_framework import serializers
from .models import Document, Quiz, Question, QuizResult

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = '__all__'
        
class QuizSerializerR(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'created_at']
        
class QuizResultSerializer(serializers.ModelSerializer):
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)

    class Meta:
        model = QuizResult
        fields = ['id', 'quiz_title', 'score', 'total_questions', 'correct_answers', 'created_at']
