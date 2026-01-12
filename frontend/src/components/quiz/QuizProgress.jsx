const QuizProgress = ({ value }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
};

export default QuizProgress;
