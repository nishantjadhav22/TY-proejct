import QuizProgress from "./QuizProgress";

const QuizHeader = ({ current, total }) => {
  return (
    <div className="quiz-header">
      <h1>Career Discovery Quiz</h1>
      <p>
        Question {current + 1} of {total} •{" "}
        {Math.round(((current + 1) / total) * 100)}% Complete
      </p>
      <QuizProgress value={(current + 1) / total} />
    </div>
  );
};

export default QuizHeader;
