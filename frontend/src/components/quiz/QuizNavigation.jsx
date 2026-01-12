const QuizNavigation = ({
  index,
  total,
  onPrev,
  onNext,
  disabled,
}) => {
  return (
    <div className="quiz-nav">
      <button disabled={index === 0} onClick={onPrev}>
        ← Previous
      </button>

      <button
        className="next-btn"
        disabled={disabled}
        onClick={onNext}
      >
        Next →
      </button>
    </div>
  );
};

export default QuizNavigation;
