import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Info,
  ArrowLeft,
  Zap,
  Star,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/careerTree.css";
import Footer from "../components/Footer";


/* ================= 3D PLACEHOLDER ================= */

function CareerTree3D({ careerPath, relatedCareers, skills }) {
  return (
    <motion.div
      className="tree-placeholder"
      key={careerPath}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h4>{careerPath} 3D View</h4>
      <p>Skills: {skills.join(", ")}</p>
      <p>Related: {relatedCareers.join(", ")}</p>
    </motion.div>
  );
}

/* ================= DATA ================= */

const categories = [
  "All",
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "Management",
];

const careerDatabase = {
  "Software Engineer": {
    name: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software applications and systems using programming languages and development frameworks.",
    averageSalary: "$85,000 - $150,000",
    growthRate: "22%",
    education: ["Computer Science", "Software Engineering", "Information Technology"],
    skills: ["Programming", "Problem Solving", "Algorithms", "Database Management", "Version Control", "Testing"],
    relatedCareers: ["Full Stack Developer", "Backend Developer", "Frontend Developer", "DevOps Engineer", "Mobile Developer"],
    keyActivities: ["Code Development", "System Design", "Bug Fixing", "Code Review", "Documentation", "Testing"],
    workEnvironment: "Office or Remote, collaborative team environment"
  },
  "Data Scientist": {
    name: "Data Scientist",
    category: "Technology",
    description: "Analyze large datasets to extract insights and build predictive models using statistical methods and machine learning.",
    averageSalary: "$95,000 - $165,000",
    growthRate: "31%",
    education: ["Data Science", "Statistics", "Computer Science", "Mathematics"],
    skills: ["Python/R", "Statistics", "Machine Learning", "Data Visualization", "SQL", "Research"],
    relatedCareers: ["Data Analyst", "Machine Learning Engineer", "Business Intelligence Analyst", "Research Scientist"],
    keyActivities: ["Data Analysis", "Model Building", "Research", "Visualization", "Reporting", "Experimentation"],
    workEnvironment: "Office or Remote, research-focused environment"
  },
  "Digital Marketing Manager": {
    name: "Digital Marketing Manager",
    category: "Marketing",
    description: "Plan and execute digital marketing campaigns across various online platforms to drive brand awareness and sales.",
    averageSalary: "$65,000 - $120,000",
    growthRate: "19%",
    education: ["Marketing", "Communications", "Business", "Digital Media"],
    skills: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics", "Campaign Management", "Creativity"],
    relatedCareers: ["Content Marketing Manager", "Social Media Manager", "SEO Specialist", "Brand Manager"],
    keyActivities: ["Campaign Planning", "Content Creation", "Analytics Review", "Strategy Development", "Team Coordination"],
    workEnvironment: "Fast-paced office environment, client interaction"
  },
  "UX Designer": {
    name: "UX Designer",
    category: "Design",
    description: "Research user needs and design intuitive, user-friendly interfaces and experiences for digital products.",
    averageSalary: "$70,000 - $130,000",
    growthRate: "13%",
    education: ["Design", "Psychology", "Human-Computer Interaction", "Fine Arts"],
    skills: ["User Research", "Prototyping", "Wireframing", "Design Tools", "Empathy", "Visual Communication"],
    relatedCareers: ["UI Designer", "Product Designer", "Interaction Designer", "User Researcher"],
    keyActivities: ["User Research", "Design Creation", "Prototyping", "Testing", "Collaboration", "Iteration"],
    workEnvironment: "Creative studio or office environment, collaborative"
  },
  "Financial Analyst": {
    name: "Financial Analyst",
    category: "Finance",
    description: "Analyze financial data and trends to provide insights for investment decisions and business strategy.",
    averageSalary: "$60,000 - $110,000",
    growthRate: "5%",
    education: ["Finance", "Economics", "Accounting", "Business Administration"],
    skills: ["Financial Modeling", "Excel", "Analysis", "Reporting", "Attention to Detail", "Communication"],
    relatedCareers: ["Investment Banker", "Portfolio Manager", "Risk Analyst", "Corporate Finance Analyst"],
    keyActivities: ["Financial Analysis", "Report Writing", "Data Interpretation", "Forecasting", "Presentations"],
    workEnvironment: "Corporate office, deadline-driven environment"
  },
  "Product Manager": {
    name: "Product Manager",
    category: "Management",
    description: "Guide product development from conception to launch, coordinating between teams and stakeholders.",
    averageSalary: "$90,000 - $160,000",
    growthRate: "19%",
    education: ["Business", "Engineering", "Computer Science", "MBA"],
    skills: ["Strategic Thinking", "Leadership", "Communication", "Analytics", "Project Management", "Market Research"],
    relatedCareers: ["Program Manager", "Business Analyst", "Strategy Consultant", "Marketing Manager"],
    keyActivities: ["Strategy Development", "Team Coordination", "Market Research", "Feature Planning", "Stakeholder Management"],
    workEnvironment: "Collaborative office environment, cross-functional teams"
  }
}

/* ================= COMPONENT ================= */

export default function CareerTreePage() {
  const [selectedCareer, setSelectedCareer] = useState("Software Engineer");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfo, setShowInfo] = useState(true);

  const filteredCareers = Object.values(careerDatabase).filter((career) => {
    const matchesCategory =
      selectedCategory === "All" ||
      career.category === selectedCategory;

    const matchesSearch = career.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const currentCareer = careerDatabase[selectedCareer];

  return (
    <motion.div
      className="career-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="career-container">

        {/* ================= TOPBAR ================= */}

        <motion.div
          className="career-topbar"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <button
            className="info-btn"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info size={16} />
            {showInfo ? "Hide Info" : "Show Info"}
          </button>
        </motion.div>

        {/* ================= HEADING ================= */}

        <motion.div
          className="career-heading"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>3D Career Tree</h1>
          <p>
            Explore career paths in an interactive environment.
          </p>
        </motion.div>

        {/* ================= CONTROLS ================= */}

        <motion.div
          className="career-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search career..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <Filter size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* ================= MAIN GRID ================= */}

        <div className="career-grid">

          {/* LEFT LIST */}

          <div className="career-list">
            <h3>
              <Zap size={18} /> Career Options
            </h3>

            {filteredCareers.map((career) => (
              <motion.button
                key={career.name}
                className={
                  selectedCareer === career.name
                    ? "career-item active"
                    : "career-item"
                }
                onClick={() => setSelectedCareer(career.name)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>{career.name}</span>
                <small>{career.category}</small>
              </motion.button>
            ))}
          </div>

          {/* RIGHT VISUAL */}

          <motion.div
            className="career-visual"
            key={currentCareer.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3>
              <Star size={18} /> {currentCareer.name}
            </h3>

            <CareerTree3D
              careerPath={currentCareer.name}
              relatedCareers={currentCareer.relatedCareers}
              skills={currentCareer.skills}
            />
          </motion.div>
        </div>

        {/* ================= DETAILS ================= */}

        <AnimatePresence>
          {showInfo && (
            <motion.div
              className="career-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="details-wrapper">

                <div className="details-left">
                  <div className="details-header">
                    <BookOpen size={24} className="details-icon" />
                    <h2>{currentCareer.name}</h2>
                  </div>

                  <h4 className="heading-cyan">Overview</h4>
                  <p className="details-text">
                    {currentCareer.description}
                  </p>

                  <h4 className="heading-pink">Work Environment</h4>
                  <p className="details-text">
                    {currentCareer.workEnvironment}
                  </p>
                </div>

                <div className="details-middle">
                  <h4 className="heading-cyan">Salary Range</h4>
                  <p className="salary-text">
                    {currentCareer.averageSalary}
                  </p>

                  <h4 className="heading-pink">Growth Rate</h4>
                  <p className="growth-text">
                    <TrendingUp size={16} /> {currentCareer.growthRate}
                  </p>

                  <h4 className="heading-purple">Education</h4>
                  <div className="education-tags">
                    {currentCareer.education.map((edu, i) => (
                      <span key={i} className="edu-tag">
                        {edu}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="details-right">
                  <h4 className="heading-cyan">Key Skills</h4>
                  <div className="skills-tags">
                    {currentCareer.skills.map((skill, i) => (
                      <span key={i} className="skill-tag-new">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h4 className="heading-pink">Key Activities</h4>
                  <ul className="activity-list">
                    {currentCareer.keyActivities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= CTA SECTION ================= */}

        <motion.div
          className="career-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Explore Your Career Path?</h2>
          <p>
            Take our career quiz to discover which path aligns with your interests and skills.
          </p>

          <div className="cta-buttons">
            <Link to="/quiz" className="cta-primary">
              Take Career Quiz
            </Link>

            <Link to="/learning-path" className="cta-secondary">
              Create Learning Path
            </Link>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>

    </motion.div>
  );
}
