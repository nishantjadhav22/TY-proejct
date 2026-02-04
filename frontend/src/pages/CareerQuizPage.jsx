import { useState } from "react";
import QuizLayout from "../components/quiz/QuizLayout";
import QuizLoader from "../components/quiz/QuizLoader";
import "../styles/quiz.css";

const CareerQuizPage = () => {
  const [showLoader, setShowLoader] = useState(false);

  // 🔥 helper function (minimum loader time)
  const showLoaderWithDelay = (delay = 2500) => {
    setShowLoader(true);

    return () => {
      setTimeout(() => {
        setShowLoader(false);
      }, delay);
    };
  };

  return (
    <>
      {showLoader && <QuizLoader />}
      <QuizLayout
        setShowLoader={setShowLoader}
        showLoaderWithDelay={showLoaderWithDelay}
      />
    </>
  );
};

export default CareerQuizPage;
