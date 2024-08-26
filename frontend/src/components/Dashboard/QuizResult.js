import React, { useEffect, useState } from 'react';
import { getQuizResultsByUser } from '../../services/api';  // Update your API service to fetch all quiz results

const QuizResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await getQuizResultsByUser();  // Fetch all quiz results for the user
        setResults(response.data.quiz_results);  // Access 'quiz_results' from the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
        setLoading(false);
      }
    };
    fetchQuizResults();
  }, []);

  return (
    <div className="bg-gray-100 p-6 flex justify-center mb-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-gothic font-bold mb-6">Quiz Results</h2>
        <hr className='border border-black mb-6'/>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div key={result.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{result.quiz_title}</h3>
                <p className="text-gray-700">Total Score: {result.score} / {result.total_questions}</p>
                <p className="text-gray-700">Correct Answers: {result.correct_answers}</p>
                <p className="text-gray-700">Incorrect Answers: {result.total_questions - result.correct_answers}</p>
                <p className="text-gray-500 text-sm">Date Taken: {new Date(result.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No quiz results available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
