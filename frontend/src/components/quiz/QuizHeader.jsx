import QuizProgress from "./QuizProgress";

const QuizHeader = ({ currentIndex, total, topic }) => {
  const currentQuestion = currentIndex + 1;
  const progress = total > 0 ? currentQuestion / total : 0;

  return (
    <div className="quiz-header">
      <h1>{topic ? `${topic} Quiz` : "Career Discovery Quiz"}</h1>
      <p>
        Question {currentQuestion} of {total} • {Math.round(progress * 100)}%
        {" "}
        Complete
      </p>
      <QuizProgress value={progress} />
    </div>
  );
};

export default QuizHeader;
