from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class AnswerComparisonService:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()

    def compare_answers(self, user_answer, model_answer):
        # Vectorize the input text
        vectors = self.vectorizer.fit_transform([user_answer, model_answer])
        
        # Compute cosine similarity
        similarity_score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
        
        # Determine if the answers are similar enough to be considered correct
        threshold = 0.7  # You can adjust the threshold for correctness
        is_correct = similarity_score >= threshold
        
        return {
            'similarity_score': similarity_score,
            'is_correct': is_correct,
            'user_answer': user_answer,
            'model_answer': model_answer
        }
