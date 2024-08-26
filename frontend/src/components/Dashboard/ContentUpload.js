import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadContent, generateQuiz } from '../../services/api';
import UploadIcon from "../../media/icon/UploadIcon.png";
import RemoveIcon from "../../media/icon/remove-icon.png"; // Assuming you have a remove icon

const ContentUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [objective, setObjective] = useState(false);
  const [subjective, setSubjective] = useState(false);
  const [numObjective, setNumObjective] = useState(1);
  const [numSubjective, setNumSubjective] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(""); 
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file && url) {
      setError('Please provide only one source: either upload a file or paste a URL.');
      return;
    }

    if (!file && !url) {
      setError('Please provide a source: either upload a file or paste a URL.');
      return;
    }

    if (!objective && !subjective) {
      setError('Please select at least one question type (Objective or Subjective).');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (url) formData.append('url', url);

    try {
      // Step 1: Upload Content
      const contentResponse = await uploadContent(formData);
      if (contentResponse.status !== 200) {
        throw new Error('Content upload failed');
      }
      const contentId = contentResponse.data.content_id;

      // Step 2: Generate Quiz
      const quizData = {
        content_id: contentId,
        objective,
        subjective,
        num_objective: objective ? numObjective : 0,
        num_subjective: subjective ? numSubjective : 0,
      };

      const quizResponse = await generateQuiz(quizData);
      if (quizResponse.status !== 200) {
        throw new Error('Quiz generation failed');
      }
      const quizId = quizResponse.data.quiz_id;

      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error('Error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
          case 400:
            setError(error.response.data.error || 'Bad request. Please check your input.');
            break;
          case 401:
            setError('Unauthorized. Please log in again.');
            // You might want to redirect to login page here
            break;
          case 403:
            setError('Forbidden. You do not have permission to perform this action.');
            break;
          case 404:
            setError('Resource not found. Please try again later.');
            break;
          case 500:
            setError('Internal server error. Please try again later.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred while processing your request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileName(files[0].name); 
      setFile(files[0]); 
      setUrl(''); // Clear URL if a file is selected
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();  // Prevent any default action
    setFile(null);
    setFileName("");
  };

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].name); 
      setFile(files[0]); 
      setUrl(''); // Clear URL if a file is selected
    }
  };

  return (
    <div className="flex justify-center z-10">
      <div className="p-8 w-2/3">
        <h2 className="text-3xl font-semibold font-gothic mb-6">Create New Quiz</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div
            className={`border-2 border-dashed p-4 mb-2 text-center bg-white ${
              dragging ? "border-blue-500" : "border-black"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!fileName ? (
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-lg font-semibold font-gothic flex flex-col items-center"
              >
                <img src={UploadIcon} alt="Upload Icon" className="w-12 h-12 mx-auto mb-4" />
                <p>Drop or upload any file here</p>
                <p className="text-gray-500">pdf, excel, .doc etc.</p>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.xls,.xlsx,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-lg font-semibold text-green-600">{fileName}</p>
                <button 
                  type="button" 
                  onClick={handleRemoveFile} 
                  className="ml-2"
                >
                  <img src={RemoveIcon} alt="Remove Icon" className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          <div className="mb-6">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Link Here..."
              className="w-full px-4 py-4 border-2 border-gray-300 hover:border-black font-gothic placeholder:text-gray-400"
              disabled={file} // Disable URL input if a file is selected
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Generate Objective Questions?</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={objective}
                onChange={(e) => setObjective(e.target.checked)}
                className="mx-2 w-5 h-5 accent-black"
              />
              <label>Yes</label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Number of Objective Questions</label>
            <input
              type="number"
              value={numObjective}
              onChange={(e) => setNumObjective(e.target.value)}
              className="w-full border-2 border-gray-300 hover:border-black p-4 mt-2"
              min="1"
              disabled={!objective}
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Generate Subjective Questions?</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={subjective}
                onChange={(e) => setSubjective(e.target.checked)}
                className="mx-2 w-5 h-5 accent-black"
              />
              <label>Yes</label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Number of Subjective Questions</label>
            <input
              type="number"
              value={numSubjective}
              onChange={(e) => setNumSubjective(e.target.value)}
              className="w-full border-2 border-gray-300 hover:border-black p-4 mt-2"
              min="1"
              disabled={!subjective}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-5 text-xl font-semibold hover:bg-black transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <span className="loading loading-spinner text-info"></span>
                <span>Generating Quiz</span>
                <span className="animate-pulse text-3xl">...</span>
              </div>
            ) : (
              <span>Create Quiz</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentUpload;