import "../../styles/quizLoader.css";

const QuizLoader = ({ text }) => {
  return (
    <div className="quiz-loader-overlay">
      <div className="quiz-loader-content">
        <div className="quiz-spinner"></div>

        {/* 🔥 Rotating Loader Text */}
        <h2 className="quiz-loader-title">
          {text || "Analyzing Your Responses..."}
        </h2>

        <p className="quiz-loader-subtitle">
          Our AI is calculating your perfect career match
        </p>
      </div>
    </div>
  );
};

export default QuizLoader;
