import React, { useEffect, useState } from 'react';
import { getQuizResult } from '../../services/api';  // Add your API service to fetch quiz results

const QuizResult = ({ quizId }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const response = await getQuizResult(quizId);
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching quiz result:', error);
      }
    };
    fetchQuizResult();
  }, [quizId]);

  return (
    <div className="bg-white p-6 flex justify-center mb-6">
      <div className="w-3/4">
      <h2 className="text-3xl font-gothic font-bold mb-4">Quiz Result</h2>
      <hr className='border border-black'/>
      {result ? (
        <div>
          <p>Total Score: {result.total_score}</p>
          <p>Correct Answers: {result.correct_answers}</p>
          <p>Incorrect Answers: {result.incorrect_answers}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default QuizResult;
