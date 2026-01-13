import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "./QuizHeader";
import QuizCard from "./QuizCard";
import QuizNavigation from "./QuizNavigation";
import apiClient from "../../services/apiClient";

const QuizLayout = () => {
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [topicError, setTopicError] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [requiresAuth, setRequiresAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadTopics = async () => {
      try {
        const res = await apiClient.get("/api/quiz/topics");
        if (!active) return;
        const fetchedTopics = res.data?.topics || [];
        setTopics(fetchedTopics);
        if (fetchedTopics.length > 0) {
          setSelectedTopicId(fetchedTopics[0].id);
        }
      } catch (error) {
        console.error("Failed to load topics:", error);
        if (!active) return;
        if (error.response?.status === 401) {
          setRequiresAuth(true);
          setTopicError("Please sign in to take a quiz.");
        } else {
          setTopicError("Unable to load quiz topics.");
        }
      } finally {
        if (active) setTopicsLoading(false);
      }
    };

    loadTopics();

    return () => {
      active = false;
    };
  }, []);

  const currentQuestion = useMemo(
    () => (questions.length > 0 ? questions[index] : null),
    [questions, index]
  );

  const currentAnswer = answers[index] ?? null;

  const handleTopicSelect = (topicId) => {
    if (submitting || loadingQuestions) return;
    setSelectedTopicId(topicId);
  };

  const resetQuizState = () => {
    setQuestions([]);
    setAnswers([]);
    setIndex(0);
    setActiveTopic(null);
    setResult(null);
  };

  const handleStartQuiz = async () => {
    if (!selectedTopicId) return;

    setLoadingQuestions(true);
    setSubmitError("");
    setResult(null);

    try {
      const res = await apiClient.get(`/api/quiz/topics/${selectedTopicId}`);
      const topic = res.data?.topic;
      const fetchedQuestions = res.data?.questions || [];

      if (!topic || fetchedQuestions.length === 0) {
        throw new Error("Questions not available for this topic");
      }

      setActiveTopic(topic);
      setQuestions(fetchedQuestions);
      setAnswers(new Array(fetchedQuestions.length).fill(null));
      setIndex(0);
    } catch (error) {
      console.error("Failed to load quiz questions:", error);
      setSubmitError(
        error.response?.data?.message || "Unable to load quiz questions."
      );
      resetQuizState();
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSelectAnswer = (answer) => {
    if (!questions.length) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = answer;
      return next;
    });
  };

  const handlePrev = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  const handleNext = async () => {
    if (!questions.length) return;

    const lastQuestionIndex = questions.length - 1;

    if (index < lastQuestionIndex) {
      setIndex((prev) => prev + 1);
      return;
    }

    await handleSubmit();
  };

  const handleSubmit = async () => {
    if (!activeTopic) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        topicId: activeTopic.id,
        responses: questions.map((question, idx) => ({
          questionId: question.id,
          answer: answers[idx],
        })),
      };

      const res = await apiClient.post("/api/quiz/submit", payload);
      const responseData = res.data || {};

      setResult({
        topic: responseData.topic,
        score: responseData.score,
        totalQuestions: responseData.totalQuestions,
      });

      window.dispatchEvent(new Event("quiz:completed"));
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      setSubmitError(
        error.response?.data?.message || "Unable to submit quiz right now."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSubmitError("");
    resetQuizState();
  };

  if (topicsLoading) {
    return <p className="loading">Loading quiz topics...</p>;
  }

  if (requiresAuth) {
    return (
      <div className="quiz-page">
        <div className="quiz-topic-selector auth-request">
          <h2>{topicError || "Sign in required"}</h2>
          <p>You need an active account to access quizzes.</p>
          <button className="next-btn" onClick={() => navigate("/signin")}>Sign In</button>
        </div>
      </div>
    );
  }

  if (topicError) {
    return (
      <div className="quiz-page">
        <div className="quiz-topic-selector error-state">
          <h2>Something went wrong</h2>
          <p>{topicError}</p>
          <button className="next-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="quiz-page">
        <div className="quiz-complete-card">
          <h2>Quiz Completed!</h2>
          <p>
            You scored <strong>{result.score}</strong> out of {result.totalQuestions}
            .
          </p>
          <p className="quiz-complete-topic">Topic: {result.topic}</p>
          <button className="next-btn" onClick={handleRetake}>
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length || !activeTopic) {
    return (
      <div className="quiz-page">
        <div className="quiz-topic-selector">
          <h2>Select a Topic</h2>
          <p>Pick one focus area to receive 8 tailored questions.</p>
          <div className="quiz-topic-grid">
            {topics.map((topic) => {
              const isActive = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  className={`quiz-topic-pill ${isActive ? "active" : ""}`}
                  onClick={() => handleTopicSelect(topic.id)}
                  disabled={loadingQuestions || submitting}
                >
                  <span className="quiz-topic-name">{topic.name}</span>
                  <span className="quiz-topic-count">
                    {topic.questionCount} questions
                  </span>
                </button>
              );
            })}
          </div>

          {submitError && <p className="error">{submitError}</p>}

          <button
            className="next-btn"
            onClick={handleStartQuiz}
            disabled={!selectedTopicId || loadingQuestions || submitting}
          >
            {loadingQuestions ? "Preparing..." : "Start Quiz"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <QuizHeader
        currentIndex={index}
        total={questions.length}
        topic={activeTopic.name}
      />

      <QuizCard
        question={currentQuestion?.question || ""}
        options={currentQuestion?.options || []}
        selected={currentAnswer}
        onSelect={handleSelectAnswer}
      />

      {submitError && <p className="error">{submitError}</p>}

      <QuizNavigation
        index={index}
        total={questions.length}
        disabled={!currentAnswer}
        submitting={submitting}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default QuizLayout;
