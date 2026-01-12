import { useEffect, useState } from "react";
import axios from "axios";
import QuizHeader from "./QuizHeader";
import QuizCard from "./QuizCard";
import QuizNavigation from "./QuizNavigation";

const QuizLayout = () => {
  const [index, setIndex] = useState(0); // Start question 1
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalQuestions = 10; // Quiz 1–10

  // Backend endpoint (do NOT call Gemini directly)
  const BACKEND_API_URL = "http://localhost:5000/api/quiz/next";

  const fetchQuestion = async (prevAnswer = null) => {
    try {
      setLoading(true);

      const res = await axios.post(BACKEND_API_URL, {
        prevAnswer,
        questionIndex: index,
      });

      if (res.data.completed) {
        setQuestion({ question: "Quiz completed!", options: [] });
      } else {
        setQuestion(res.data);
      }

    } catch (err) {
      console.error("Error fetching question:", err);
      // Pure AI mode → no fallback questions
      setQuestion({ question: "Unable to load question. Please refresh.", options: [] });
    } finally {
      setSelected(null); // Reset previous selection after new question
      setLoading(false);
    }
  };

  // Fetch new question when index changes
  useEffect(() => {
    fetchQuestion(index === 0 ? null : selected);
  }, [index]);

  if (loading) return <p className="loading">Loading question...</p>;
  if (!question) return <p className="loading">No question available.</p>;

  return (
    <div className="quiz-page">
      <QuizHeader current={index + 1} total={totalQuestions} />
      <QuizCard
        question={question.question}
        options={question.options}
        selected={selected}
        onSelect={setSelected}
      />
      <QuizNavigation
        index={index}
        total={totalQuestions}
        disabled={!selected}
        onNext={() => index < totalQuestions - 1 && setIndex(index + 1)}
        onPrev={() => index > 0 && setIndex(index - 1)}
      />
    </div>
  );
};

export default QuizLayout;
