import "../styles/features.css";
import {
  Sparkles,
  MapPin,
  Clock,
  Zap,
  BookOpen,
  Target,
} from "lucide-react";

const topFeatures = [
  {
    title: "3D Career Visualization",
    desc: "Interactive 3D maps to explore career paths and opportunities",
    icon: Sparkles,
    color: "cyan",
  },
  {
    title: "Smart College Recommendations",
    desc: "Find the perfect colleges based on your preferences and career goals",
    icon: MapPin,
    color: "pink",
  },
  {
    title: "Personalized Career Quiz",
    desc: "AI-driven assessment to discover your strengths and ideal career paths",
    icon: Clock,
    color: "purple",
  },
];

const bottomFeatures = [
  {
    title: "AI-Powered Insights",
    desc: "Get personalized recommendations based on your skills and interests",
    icon: Zap,
    color: "cyan",
  },
  {
    title: "Study Materials",
    desc: "Access curated resources for entrance exams and skill development",
    icon: BookOpen,
    color: "pink",
  },
  {
    title: "Goal Setting",
    desc: "Set and track academic and career goals with smart reminders",
    icon: Target,
    color: "purple",
  },
];

const Features = () => {
  return (
    <section className="features-page">
      <h1 className="features-heading">
        <span>Powerful Features</span> for Your Future
      </h1>

      <p className="features-subtitle">
        Discover the tools and insights you need to make informed decisions
        about your career and education path.
      </p>

      {/* TOP LARGE CARDS */}
      <div className="top-features">
        {topFeatures.map((f, i) => (
          <div className="feature-card large" key={i}>
            <div className={`icon-circle ${f.color}`}>
              <f.icon size={28} />
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* BOTTOM SMALL CARDS */}
      <div className="bottom-features">
        {bottomFeatures.map((f, i) => (
          <div className="feature-card small" key={i}>
            <div className={`icon-square ${f.color}`}>
              <f.icon size={22} />
            </div>
            <div className="text">
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="features-cta">
        <button className="explore-btn">Explore All Features</button>
      </div>
    </section>
  );
};

export default Features;
