import { useState } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Play,
  FileText,
  ExternalLink,
  Clock,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/LearningResources.css";
import Footer from "../components/Footer";

/* ================= DATA ================= */

const learningResources = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    type: "course",
    category: "Programming",
    difficulty: "Beginner",
    duration: "65 hours",
    rating: 4.8,
    description: "Learn full-stack web development from scratch.",
    link: "https://example.com",
    author: "Angela Yu",
    topics: ["HTML", "CSS", "JavaScript", "React"],
    free: false,
  },
  {
    id: "2",
    title: "Python for Data Science",
    type: "video",
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "12 hours",
    rating: 4.7,
    description: "Master data science using Python.",
    link: "https://example.com",
    author: "Jose Portilla",
    topics: ["Python", "Pandas", "NumPy"],
    free: true,
  },
  {
    id: "3",
    title: "Machine Learning Crash Course",
    type: "course",
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "40 hours",
    rating: 4.6,
    description: "Learn ML fundamentals with real examples.",
    link: "https://example.com",
    author: "Google AI",
    topics: ["ML", "TensorFlow", "Neural Networks"],
    free: true,
  },
  {
    id: "4",
    title: "React Practice Projects",
    type: "practice",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "10 hours",
    rating: 4.4,
    description: "Hands-on React projects to improve skills.",
    link: "https://example.com",
    author: "FreeCodeCamp",
    topics: ["React", "Hooks", "State"],
    free: true,
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    type: "book",
    category: "Design",
    difficulty: "Beginner",
    duration: "8 hours",
    rating: 4.9,
    description: "Learn the basics of user-centered design.",
    link: "https://example.com",
    author: "Don Norman",
    topics: ["UX", "Design", "Usability"],
    free: false,
  },
  {
    id: "6",
    title: "Figma Design System",
    type: "video",
    category: "Design",
    difficulty: "Intermediate",
    duration: "6 hours",
    rating: 4.7,
    description: "Create scalable design systems in Figma.",
    link: "https://example.com",
    author: "Design Academy",
    topics: ["Figma", "UI", "Design System"],
    free: false,
  },
  {
    id: "7",
    title: "Digital Marketing Fundamentals",
    type: "course",
    category: "Marketing",
    difficulty: "Beginner",
    duration: "20 hours",
    rating: 4.5,
    description: "SEO, social media and online marketing basics.",
    link: "https://example.com",
    author: "Google",
    topics: ["SEO", "Social Media", "Ads"],
    free: true,
  },
  {
    id: "8",
    title: "Content Marketing Guide",
    type: "article",
    category: "Marketing",
    difficulty: "Beginner",
    duration: "2 hours",
    rating: 4.3,
    description: "Learn content marketing strategies.",
    link: "https://example.com",
    author: "HubSpot",
    topics: ["Content", "Branding"],
    free: true,
  },
  {
    id: "9",
    title: "Financial Planning for Beginners",
    type: "video",
    category: "Finance",
    difficulty: "Beginner",
    duration: "4 hours",
    rating: 4.5,
    description: "Basics of budgeting and saving money.",
    link: "https://example.com",
    author: "Finance Pro",
    topics: ["Budgeting", "Savings"],
    free: true,
  },
  {
    id: "10",
    title: "Financial Modeling in Excel",
    type: "course",
    category: "Finance",
    difficulty: "Advanced",
    duration: "15 hours",
    rating: 4.6,
    description: "Advanced financial modeling techniques.",
    link: "https://example.com",
    author: "Wharton",
    topics: ["Excel", "Valuation"],
    free: false,
  },
  {
    id: "11",
    title: "Agile Project Management",
    type: "article",
    category: "Management",
    difficulty: "Intermediate",
    duration: "2 hours",
    rating: 4.4,
    description: "Guide to agile and scrum frameworks.",
    link: "https://example.com",
    author: "PMI",
    topics: ["Agile", "Scrum"],
    free: true,
  },
  {
    id: "12",
    title: "Leadership Skills",
    type: "course",
    category: "Management",
    difficulty: "Beginner",
    duration: "8 hours",
    rating: 4.2,
    description: "Improve leadership and communication skills.",
    link: "https://example.com",
    author: "Coursera",
    topics: ["Leadership", "Team"],
    free: false,
  },
  {
    id: "13",
    title: "JavaScript Advanced Concepts",
    type: "video",
    category: "Programming",
    difficulty: "Advanced",
    duration: "10 hours",
    rating: 4.6,
    description: "Deep dive into advanced JavaScript.",
    link: "https://example.com",
    author: "JS Mastery",
    topics: ["Closures", "Async", "Performance"],
    free: false,
  },
  {
    id: "14",
    title: "SQL for Beginners",
    type: "course",
    category: "Programming",
    difficulty: "Beginner",
    duration: "6 hours",
    rating: 4.4,
    description: "Learn SQL queries and databases.",
    link: "https://example.com",
    author: "DataCamp",
    topics: ["SQL", "Database"],
    free: true,
  },
];

/* ================= CONSTANTS ================= */

const categories = [
  "All",
  "Programming",
  "Data Science",
  "Design",
  "Marketing",
  "Finance",
  "Management",
];
const types = ["All", "course", "video", "article", "book", "practice"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const typeIcons = {
  course: BookOpen,
  video: Play,
  article: FileText,
  book: BookOpen,
  practice: Star,
};

/* ================= CARD ================= */

const ResourceCard = ({ resource }) => {
  const { t } = useTranslation();
  const Icon = typeIcons[resource.type];

  return (
    <div
      className="resource-card"
      onClick={() => window.open(resource.link, "_blank")}
      tabIndex={0}
    >
      <div className="card-header">
        <div className="icon-box">
          <Icon size={20} />
        </div>

        <div>
          <h3>{t(resource.title)}</h3>
          <p className="author">
            {t("by")} {resource.author}
          </p>
        </div>

        <span className={`badge ${resource.free ? "free" : "paid"}`}>
          {resource.free ? t("Free") : t("Paid")}
        </span>
      </div>

      <p className="description">{t(resource.description)}</p>

      <div className="topics">
        {resource.topics.map((tpc, i) => (
          <span key={i}>{t(tpc)}</span>
        ))}
      </div>

      <div className="meta">
        <div>
          <Clock size={14} /> {resource.duration}
        </div>
        <div>
          <Star size={14} /> {resource.rating}
        </div>
        <span className={`difficulty ${resource.difficulty.toLowerCase()}`}>
          {t(resource.difficulty)}
        </span>
      </div>

      <button
        className="access-btn"
        onClick={(e) => {
          e.stopPropagation();
          window.open(resource.link, "_blank");
        }}
      >
        {t("Access")} <ExternalLink size={16} />
      </button>
    </div>
  );
};

/* ================= PAGE ================= */

const LearningResources = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = learningResources.filter((r) => {
    const text = r.title + r.description + r.topics.join(" ");
    return (
      (category === "All" || r.category === category) &&
      (type === "All" || r.type === type) &&
      (difficulty === "All" || r.difficulty === difficulty) &&
      text.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="resources-page">
      <div className="top-bar">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} /> {t("Back")}
        </Link>

        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} /> {t("Filters")}
        </button>
      </div>

      <h1 className="page-title">{t("Learning Resources")}</h1>
      <p className="subtitle">
        {t("Curated courses, videos & practice material")}
      </p>

      <div className="search-box">
        <Search size={18} />
        <input
          placeholder={t("Search resources, topics...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showFilters && (
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c}>{t(c)}</option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((tp) => (
              <option key={tp}>{t(tp)}</option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficulties.map((d) => (
              <option key={d}>{t(d)}</option>
            ))}
          </select>
        </div>
      )}

      <div className="resources-grid">
        {filtered.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="no-results">
          <Search size={40} />
          <p>{t("No resources found")}</p>
        </div>
      )}

      <div className="cta">
        <h2>{t("Ready to Start Learning?")}</h2>
        <div className="cta-actions">
          <Link to="/quiz">{t("Take Career Quiz")}</Link>
          <Link to="/roadmap" className="outline">
            {t("Create Learning Path")}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LearningResources;
