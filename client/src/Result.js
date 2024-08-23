import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import "./css/Result.css";
import checkIcon from "./images/blue_tick.png";

const Result = () => {
  const location = useLocation();
  const { userAnswers } = location.state || {};
  const [numberOfTrue, setNumberOfTrue] = useState(0);
  const [numberOfFalse, setNumberOfFalse] = useState(0);
  const [numberOfEmpty, setNumberOfEmpty] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [scoreCalculated, setScoreCalculated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState([]);
  const [modalBackgroundClass, setModalBackgroundClass] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/question/correct-answers"
      ) /* Correct answers and questions are fetched from SQL database */
      .then((response) => {
        setCorrectAnswers(response.data);
      });
  }, []);

  useEffect(() => {
    if (correctAnswers.length > 0 && userAnswers && !scoreCalculated) {
      /* Firstly, score is calculated */
      calculateScore();
      setScoreCalculated(true);
    }
  }, [correctAnswers, scoreCalculated]);

  const calculateScore = () => {
    /* Calculation of score based on the answers of user */
    let trueCount = 0;
    let falseCount = 0;
    let emptyCount = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === "") {
        emptyCount++;
      } else if (answer === correctAnswers[index].correct_answer) {
        trueCount++;
      } else {
        falseCount++;
      }
    });

    setNumberOfTrue(trueCount);
    setNumberOfFalse(falseCount);
    setNumberOfEmpty(emptyCount);
  };

  const handleCircleClick = (category) => {
    setModalTitle(
      `Details for ${
        category.charAt(0).toUpperCase() +
        category.slice(
          1
        ) /* Title of pop up page. It specifies the type of questions which is true, false or empty */
      } Answers`
    );
    setModalBackgroundClass(
      category === "true"
        ? "bg-true"
        : category ===
          "false" /* Questions are separated based on the categories which are true, false and empty for choosing their backgorund  */
        ? "bg-false"
        : "bg-empty"
    );

    const content = userAnswers.map((answer, index) => {
      /* Displaying the true, false and empty questions separately and keeping it in a variable*/
      if (
        (category === "true" &&
          answer === correctAnswers[index].correct_answer) ||
        (category === "false" &&
          answer !== correctAnswers[index].correct_answer &&
          answer !== "") ||
        (category === "empty" && answer === "")
      ) {
        const answerClass =
          category === "true"
            ? "answer-true"
            : category === "false"
            ? "answer-false"
            : "answer-empty";

        return (
          <div key={index} className={`detail-item ${answerClass}`}>
            <p>
              <strong>Question:</strong> {correctAnswers[index].question}
            </p>
            <p>
              <strong>Your Answer:</strong> {answer || "No answer given"}
            </p>
            <p>
              <strong>Correct Answer:</strong>{" "}
              {correctAnswers[index].correct_answer}
            </p>
          </div>
        );
      }
      return null;
    });

    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false); /* To close the pop up page */

  if (!userAnswers) {
    return <div>No results available.</div>;
  }

  return (
    <div className="result">
      <h1 className="result-container-quiz-completed">Quiz Completed!</h1>
      <p className="result-score">Your score is : {10 * numberOfTrue}</p>{" "}
      {/* The messages and score are displayed. */}
      <div className="result-message">
        <p>You submitted the quiz successfully.</p>
        <img src={checkIcon} className="check-icon"></img>
      </div>
      <div className="circle-container">
        <div className="circle true" onClick={() => handleCircleClick("true")}>
          {numberOfTrue}
        </div>
        <div
          className="circle false"
          onClick={() => handleCircleClick("false")}
        >
          {/* Click handlers to print true, false and empty questions */}
          {numberOfFalse}
        </div>
        <div
          className="circle empty"
          onClick={() => handleCircleClick("empty")}
        >
          {numberOfEmpty}
        </div>
      </div>
      {/* Modal for displaying details */}
      <Modal
        show={showModal}
        handleClose={closeModal}
        title={modalTitle}
        backgroundClass={modalBackgroundClass}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Result;
