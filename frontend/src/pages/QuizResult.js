import React, { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { getQuizResult } from '../services/api';

const QuizResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await getQuizResult(id);
        console.log(response.data);
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching quiz result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const handleTryAgain = () => {
    navigate(`/quiz/${id}`); // Navigate back to the quiz page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="flex justify-center p-4 ">
      <div className="w-1/2 ">
      <h1 className="text-4xl font-gothic mb-6">Quiz Result</h1>
      <hr className="border-black"/>
      <div className='space-y'>
      {result ? (
        <div className="space-y-4 my-4 font-bold">
          <p>Total Score: {result.score} %</p>
          <p>Total Questions: {result.total_questions}</p>
          <p>Correct Answers: {result.correct_answers}</p>
          {/* Display more detailed results as needed */}
        </div>
      ) : (
        <div>Result not found.</div>
      )}
      </div>
      <button
          onClick={handleTryAgain}
          className="bg-white  text-black py-2 px-4 border-2 font-semibold border-black hover:bg-black hover:text-white mt-4"
        >
          Try Again
        </button>
      </div>
    </div>
    
  );
};

export default QuizResult;
