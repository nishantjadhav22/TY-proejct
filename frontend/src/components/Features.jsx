import "../styles/features.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  MapPin,
  Clock,
  Zap,
  BookOpen,
  Target,
} from "lucide-react";

/* ---------------- DATA ---------------- */

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

/* ---------------- FEATURE CARD ---------------- */

const FeatureCard = ({ feature, index, size }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      className={`feature-card ${size}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
    >
      <div className={`icon-wrap ${size} ${feature.color}`}>
  <Icon
    size={size === "large" ? 28 : 22}
    className="feature-icon"
  />
  <span className="icon-glow"></span>
</div>


      {size === "large" ? (
        <>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </>
      ) : (
        <div className="text">
          <h4>{feature.title}</h4>
          <p>{feature.desc}</p>
        </div>
      )}
    </motion.div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section className="features-page" ref={sectionRef}>
      {/* HEADING */}
      <motion.h1
        className="features-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span>Powerful Features</span> for Your Future
      </motion.h1>

      <motion.p
        className="features-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover the tools and insights you need to make informed decisions
        about your career and education path.
      </motion.p>

      {/* TOP LARGE CARDS */}
      <div className="top-features">
        {topFeatures.map((f, i) => (
          <FeatureCard
            key={i}
            feature={f}
            index={i}
            size="large"
          />
        ))}
      </div>

      {/* BOTTOM SMALL CARDS */}
      <div className="bottom-features">
        {bottomFeatures.map((f, i) => (
          <FeatureCard
            key={i}
            feature={f}
            index={i}
            size="small"
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="features-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.button
          className="explore-btn"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore All Features
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Features;
