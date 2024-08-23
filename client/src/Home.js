import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState(
    []
  ); /* Variables for doing operations on data */
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/question/answers-without-correct"
      ) /* Fetching data from SQL database without correct answers */
      .then((response) => {
        setQuestionList(response.data);
      });
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      const currentQuestion = questionList[currentIndex];
      const shuffledAnswer = currentQuestion.answers.sort(
        /* Shuffling answer options in each questions */
        () => Math.random() - 0.5
      );
      setShuffledAnswers(shuffledAnswer);
    }
  }, [currentIndex, questionList]);

  useEffect(() => {
    if (!isProcessing && pendingAction) {
      /* If an operation is not finished. Program does not allow to start another operation if they are related operation didn't be finished */
      pendingAction();
      setPendingAction(null);
    }
  }, [isProcessing, pendingAction]);

  useEffect(() => {
    if (showResult) {
      navigate("/result", {
        state: { userAnswers },
      }); /* If test is completed. Navgitaion to result page */
    }
  }, [showResult]);

  const handleAnswerClick = (selectedAnswer) => {
    setIsProcessing(true);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] =
      selectedAnswer; /* User answers are kept in a variable for answer validation */
    setUserAnswers(newUserAnswers);

    setIsProcessing(false);
  };

  const handleNext = () => {
    if (isProcessing) {
      setPendingAction(() => handleNext);
    } else {
      if (userAnswers[currentIndex] === undefined) {
        setUserAnswers((prevAnswers) => {
          const newAnswers = [
            ...prevAnswers,
          ]; /* It is checked whether user answered the question. After that, index is increased to get the new question */
          newAnswers[currentIndex] = "";
          return newAnswers;
        });
      }

      if (currentIndex < questionList.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  const handlePrevious = () => {
    if (isProcessing) {
      setPendingAction(
        () => handlePrevious
      ); /* If user pressed back button, index is decreased to get the right question */
    } else {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  if (questionList.length === 0 || currentIndex >= questionList.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questionList[currentIndex];

  if (showResult) {
  }

  return (
    <div className="home">
      <h1 className="title">Quiz</h1>
      <p className="question">
        {currentQuestion.id + ") " + currentQuestion.question}{" "}
        {/* Question number and question itself is printed */}
      </p>

      <div className="answer-buttons">
        {/* Shuffled questions are printed and if an answer is clicked its class name changes. It is for show the button as pressed if user comes back to that question  */}
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={userAnswers[currentIndex] === answer ? "clicked" : ""}
            onClick={() => handleAnswerClick(answer)}
            disabled={showResult == true}
          >
            {answer}
          </button>
        ))}
      </div>

      <div className="prev-next-buttons">
        {/* Buttons to get next and previous questions */}
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          &lt;
        </button>
        <button onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Home;
