const QuizNavigation = ({
  index,
  total,
  onPrev,
  onNext,
  disabled,
  submitting,
}) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="quiz-nav">
      <button disabled={isFirst || submitting} onClick={onPrev}>
        ← Previous
      </button>

      <button
        className="next-btn"
        disabled={disabled || submitting}
        onClick={onNext}
      >
        {submitting ? "Submitting..." : isLast ? "Submit Quiz" : "Next →"}
      </button>
    </div>
  );
};

export default QuizNavigation;
