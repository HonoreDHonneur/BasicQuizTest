import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/EntrancePage.css";

const EntrancePage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/home"); // Navigate to the Home.js component
  };

  return (
    <div className="entrance-page">
      <h1>Welcome to the Quiz</h1>
      <p>Test your knowledge by taking this quiz.</p>
      <div className="button-wrapper">
        <button onClick={handleStartQuiz}>
          {/* Handler for navigation from entrance page to home page*/}
          <span>Start Quiz </span>
        </button>
      </div>
    </div>
  );
};

export default EntrancePage;
