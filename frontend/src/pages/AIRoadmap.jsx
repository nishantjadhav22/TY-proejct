import "../styles/roadmap.css";
import { Sparkles, Map, CheckCircle2 } from "lucide-react";

const milestones = [
  {
    title: "Discover",
    description: "Assess strengths, preferred industries, and growth opportunities with quick diagnostics.",
  },
  {
    title: "Plan",
    description: "Convert insights into a semester-wise learning plan powered by AI recommendations.",
  },
  {
    title: "Execute",
    description: "Track progress, unlock practice missions, and adapt with weekly nudges.",
  },
];

const AIRoadmap = () => {
  return (
    <div className="roadmap-page">
      <section className="roadmap-hero">
        <div>
          <p className="eyebrow">AI Roadmap</p>
          <h1>Convert your ambition into a guided journey</h1>
          <p>
            Build a living roadmap that adapts with every quiz, saved college, and dashboard insight.
            Visualize milestones, remove uncertainty, and stay accountable.
          </p>
        </div>
        <div className="roadmap-callout">
          <Sparkles size={20} />
          <div>
            <strong>Live synchronization</strong>
            <p>Your roadmap mirrors dashboard data, so wins are reflected instantly.</p>
          </div>
        </div>
      </section>

      <section className="roadmap-grid">
        {milestones.map((step) => (
          <article key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </section>

      <section className="roadmap-cta">
        <div>
          <Map size={28} />
          <div>
            <h2>Ready for your personalized map?</h2>
            <p>Connect interests, resources, and colleges to build a confident plan.</p>
          </div>
        </div>
        <button>
          <CheckCircle2 size={18} /> Generate Roadmap
        </button>
      </section>
    </div>
  );
};

export default AIRoadmap;
