import React, { useState } from "react";
import UploadIcon from "../../media/icon/UploadIcon.png";

export default function Section() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(""); // State to store the file name

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
    
    // Handle files
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].name); // Set the file name in state
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileName(files[0].name); // Set the file name in state
    }
  };
 
  

  return (
    <div className="container flex justify-center items-center relative z-10">
      <div className="container1 w-2/3">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-5xl font-normal py-4 my-4 font-gothic">
            Ace Your Exams with Instant, Interactive Quizzes!
          </h1>
          <p className="text-base md:text-xl my-4 mx-8">
            Upload any file or paste a link to create interactive quizzes and
            enhance your learning experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Drag and Drop Upload Section */}
          <div
            className={`border-2 border-dashed p-4 mb-2 text-center bg-white ${
              dragging ? "border-blue-500" : "border-black"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-lg font-semibold font-gothic flex flex-col items-center"
            >
              <img src={UploadIcon} alt="Upload Icon" className="w-12 h-12 mx-auto mb-4" />
              {fileName ? (
                <p className="text-lg font-semibold text-green-600">{fileName}</p>
              ) : (
                <>
                  <p>Drop or upload any file here</p>
                  <p className="text-gray-500">pdf, excel, .doc etc.</p>
                </>
              )}
            </label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept=".pdf,.xls,.xlsx,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>

          <div className="relative flex mb-2 items-center">
            <div className="flex-grow border-t border-white"></div>
            <span className="flex-shrink mx-4 text-black">OR</span>
            <div className="flex-grow border-t border-white"></div>
          </div>

          <div className="flex flex-col sm:flex-row sm:pb-2 bg-white p-2 hover:outline outline-gray-500">
            <input
              type="text"
              placeholder="Paste any link here..."
              className="flex-grow px-4 py-2 focus:outline-none font-gothic placeholder:text-gray-400"
            />
            <button  className="bg-gray-800 text-white px-4 py-4 transition duration-200 font-sans">
              Create Quiz →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
