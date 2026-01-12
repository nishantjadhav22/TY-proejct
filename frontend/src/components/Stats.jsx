import "../styles/stats.css";
import { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Stats = () => {
  const statsRef = useRef();
  useScrollAnimation(statsRef);

  return (
    <section ref={statsRef} className="stats scroll-hidden">
      <div className="stat-box">
        <h2>10K+</h2>
        <p>Students Guided</p>
      </div>

      <div className="stat-box">
        <h2>500+</h2>
        <p>Career Paths</p>
      </div>

      <div className="stat-box">
        <h2>1000+</h2>
        <p>Colleges Listed</p>
      </div>
    </section>
  );
};

export default Stats;
