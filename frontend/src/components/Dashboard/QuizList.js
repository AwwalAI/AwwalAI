import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/api';  // Add your API service to fetch quizzes

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className=" bg-[#712EFF] text-white p-6 flex justify-center">
      <div className="w-3/4">
      <h2 className="text-3xl font-gothic font-bold py-4">Your Quizzes</h2>
      <hr className='border-white border'></hr>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-2 p-2 border-b border-gray-200">
            <div className="text-lg font-semibold">{quiz.question_text}</div>
            <div className="text-gray-700">{quiz.question_type}</div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default QuizList;
