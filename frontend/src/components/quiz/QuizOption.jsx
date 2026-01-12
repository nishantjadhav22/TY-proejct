const QuizOption = ({ label, active, onClick }) => {
  return (
    <div
      className={`quiz-option ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="radio" />
      {label}
    </div>
  );
};

export default QuizOption;
