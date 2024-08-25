import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, submitAnswer } from '../services/api';

const QuizPage = () => {
  const { id } = useParams();  // Get quiz ID from URL parameters
  const navigate = useNavigate();  // To redirect after submission
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuiz(id);  // Fetch the quiz data
        console.log(response);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const optionLetters = ["A", "B", "C", "D"];

  const handleInputChange = (questionId, value, questionType) => {
    let answerValue = value;

    if (questionType === 'objective') {
      answerValue = optionLetters[value];  // Convert index to A, B, C, D for objective questions
    }

    setAnswers({
      ...answers,
      [questionId]: answerValue,
    });
    console.log(answers)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const question of quiz.questions) {
        await submitAnswer(id, question.id, answers[question.id]);  // Submit each answer
      }
      navigate(`/quiz/${id}/result`);  // Redirect to result page after submission
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-gothic font-bold mb-8 text-center">Quiz</h1>
      {quiz ? (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="mb-8">
              <h2 className="text-2xl font-semibold  mb-4">
                Question {index + 1} <span className="text-sm font-normal">({question.question_type === 'objective' ? 'Objective' : 'Subjective'})</span>
              </h2>
              <p className="text-lg mb-4">{question.question_text}</p>
              {question.question_type === 'objective' ? (
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`question_${question.id}`}
                          value={optionIndex}  // Pass index to handleInputChange
                          onChange={(e) => handleInputChange(question.id, optionIndex, 'objective')}
                          className="mr-2 w-4 h-4 accent-black"
                        />
                        <span className="text-lg">{optionLetters[optionIndex]}: {option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <textarea
                    name={`question_${question.id}`}
                    rows="4"
                    className="w-full p-4 border-2 border-gray-300 "
                    onChange={(e) => handleInputChange(question.id, e.target.value, 'subjective')}
                    placeholder="Enter your answer here..."
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-white border-2 border-black text-black py-3 px-6 hover:bg-black hover:text-white transition font-bold text-lg"
          >
            Submit Answers
          </button>
        </form>
      ) : (
        <div>Quiz not found.</div>
      )}
    </div>
  );
};

export default QuizPage;
