import "../styles/hero.css";
import { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import Particles from "./Particles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // 🔹 Added for routing

const Hero = () => {
  const heroRef = useRef();
  useScrollAnimation(heroRef);

  const { t } = useTranslation();

  const stats = [
    { title: "10K+", desc: "Students Guided", descKey: "hero.stats1Desc" },
    { title: "500+", desc: "Career Paths", descKey: "hero.stats2Desc" },
    { title: "1000+", desc: "Colleges Listed", descKey: "hero.stats3Desc" },
  ];

  return (
    <section ref={heroRef} className="hero scroll-hidden">
      <Particles />

      <h1>
        {t("hero.headerLine1", "Your Personalized Career &")} <br />
        {t("hero.headerLine2", "College Guide")}
      </h1>

      <p>
        {t(
          "hero.subHeader",
          "Discover your path with AI-powered quizzes, 3D career maps & nearby government college suggestions."
        )}
      </p>

      <div className="hero-buttons">
        <Link to="/career-quiz">
          <button className="btn-primary">
            {t("hero.btnStartQuiz", "Start Your Quiz")}
          </button>
        </Link>
        <button className="btn-secondary">
          {t("hero.btnLearnHow", "Learn How It Works")}
        </button>
      </div>

      <div className="hero-stats">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-number">{stat.title}</div>
            <div className="stat-label">{t(stat.descKey, stat.desc)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
