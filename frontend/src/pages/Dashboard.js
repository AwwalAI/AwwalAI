import React from 'react';
import ContentUpload from '../components/Dashboard/ContentUpload';
import QuizList from '../components/Dashboard/QuizList';
import QuizResult from '../components/Dashboard/QuizResult';  // If you want to display a specific quiz result

const Dashboard = () => {
  return (
    <div className="container mx-auto py-4 ">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-normal py-4 my-4 font-gothic">
          Dashboard
        </h1>
        <p className="text-xl my-4">
          Manage your content, quizzes, and track your progress in one place
        </p>
      </div>

      <div className="space-y-12">
        {/* Content Upload Section */}
        <ContentUpload />
        
        {/* Quiz List Section */}
        <QuizList />

        {/* Example Quiz Result Section */}
        <QuizResult quizId={1} />
      </div>
    </div>
  );
};

export default Dashboard;
