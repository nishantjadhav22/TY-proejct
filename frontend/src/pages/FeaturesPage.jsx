import Features from "../components/Features";
import Footer from "../components/Footer";
import "../styles/featuresPage.css";

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <section className="features-hero-block">
        <p className="eyebrow">Product Overview</p>
        <h1>Powerful features built for students</h1>
        <p className="subtitle">
          Explore every capability Career Advisor ships with out of the box. From AI-powered quizzes
          to personalized dashboards, everything is designed to keep you ahead.
        </p>
      </section>

      <Features />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
