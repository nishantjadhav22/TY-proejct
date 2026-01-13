import quizBank from "../data/quizBank.js";
import User from "../models/User.js";
import Activity from "../models/Activity.js";

const QUESTIONS_PER_QUIZ = 8;

const findTopic = (topicId) =>
  quizBank.find((topic) => topic.id === topicId);

const sanitizeQuestion = ({ id, text, options }) => ({
  id,
  question: text,
  options,
});

export const listQuizTopics = (req, res) => {
  const topics = quizBank.map((topic) => ({
    id: topic.id,
    name: topic.name,
    questionCount: Math.min(topic.questions.length, QUESTIONS_PER_QUIZ),
  }));

  res.json({ topics });
};

export const getQuizQuestions = (req, res) => {
  const { topicId } = req.params;
  const topic = findTopic(topicId);

  if (!topic) {
    return res.status(404).json({ message: "Topic not found" });
  }

  const selectedQuestions = topic.questions.slice(0, QUESTIONS_PER_QUIZ);

  res.json({
    topic: {
      id: topic.id,
      name: topic.name,
    },
    questions: selectedQuestions.map(sanitizeQuestion),
  });
};

export const submitQuizResponses = async (req, res) => {
  try {
    const { topicId, responses } = req.body;

    if (!topicId || !Array.isArray(responses)) {
      return res
        .status(400)
        .json({ message: "Topic and responses are required" });
    }

    const topic = findTopic(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const selectedQuestions = topic.questions.slice(0, QUESTIONS_PER_QUIZ);
    const answerMap = new Map(
      selectedQuestions.map((question) => [question.id, question.answer])
    );

    let score = 0;

    for (const response of responses) {
      if (!response || typeof response !== "object") continue;
      const { questionId, answer } = response;
      if (!questionId) continue;
      const correctAnswer = answerMap.get(questionId);
      if (correctAnswer && answer && answer === correctAnswer) {
        score += 1;
      }
    }

    const totalQuestions = selectedQuestions.length;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.quizzes.push({
      quizName: topic.name,
      score,
      totalQuestions,
    });

    await user.save();

    try {
      await Activity.create({
        user: user._id,
        type: "quiz",
        message: `Completed ${topic.name} quiz (${score}/${totalQuestions})`,
      });
    } catch (activityError) {
      console.error("Quiz activity log error:", activityError);
    }

    const testNumber = user.quizzes.length;
    const latestEntry = user.quizzes[user.quizzes.length - 1];

    res.json({
      topic: topic.name,
      score,
      totalQuestions,
      historyEntry: {
        testNumber,
        topic: topic.name,
        score,
        totalQuestions,
        date: latestEntry.date,
      },
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};

export const getQuizHistory = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const user = await User.findById(req.user._id).select("quizzes");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const history = (user.quizzes || []).map((entry, index) => ({
      testNumber: index + 1,
      topic: entry.quizName,
      score: entry.score,
      totalQuestions: entry.totalQuestions || QUESTIONS_PER_QUIZ,
      date: entry.date,
    }));

    res.json({ history });
  } catch (error) {
    console.error("Quiz history error:", error);
    res.status(500).json({ message: "Failed to load quiz history" });
  }
};
