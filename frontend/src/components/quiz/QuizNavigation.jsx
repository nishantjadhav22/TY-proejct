import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <>
      {/* 🔹 Previous + Next (same as before) */}
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

      {/* 🔹 Back to Quiz Hub (sirf first question pe dikhe) */}
      {isFirst && (
        <div className="quiz-back">
          <button
            className="back-to-hub"
            onClick={() => navigate("/career-quiz")}
          >
            ← Back to Quiz Hub
          </button>
        </div>
      )}
    </>
  );
};

export default QuizNavigation;
