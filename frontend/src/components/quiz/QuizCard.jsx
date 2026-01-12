import QuizOption from "./QuizOption";

const QuizCard = ({ question, options, selected, onSelect }) => {
  return (
    <div className="quiz-card-glass">
      <h2>{question}</h2>

      <div className="quiz-options">
        {options.map((opt, i) => (
          <QuizOption
            key={i}
            label={opt}
            active={selected === opt}
            onClick={() => onSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
