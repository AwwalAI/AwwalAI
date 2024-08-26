import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/api';  // Add your API service to fetch quizzes
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data.quizzes);
        console.log(response.data.quizzes)
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleCardClick = (quizId) => {
    navigate(`/quiz/${quizId}`);  // Navigate to the quiz detail page
  };

  return (
    <div className="bg-[#712EFF] text-white p-6 flex justify-center">
      <div className="w-3/4">
        <h2 className="text-3xl font-gothic font-bold py-4">Your Quizzes</h2>
        <hr className='border-white border'></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => handleCardClick(quiz.id)}  // Handle card click
              className="bg-white text-black p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
              <p className="text-gray-600">Created on: {new Date(quiz.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
