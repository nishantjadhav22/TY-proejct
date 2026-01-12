import "../styles/navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* ✅ ADD: TOAST */
import toast from "react-hot-toast";

/* ✅ LUCIDE ICONS */
import {
  ChevronDown,
  Sparkles,
  MapPin,
  Target,
  Zap,
  Layers,
  BookOpen,
  Crown,
} from "lucide-react";

/* ================= NAVBAR ================= */
const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  /* STATE */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  /* AUTH PAGE CHECK */
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/register";

  /* LANGUAGES */
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मराठी" },
  ];

  /* REFS */
  const dropdownRef = useRef(null);
  const userRef = useRef(null);

  /* CLICK OUTSIDE HANDLER */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ ADD (safe)

    setUser(null);

    toast.success("Logged out successfully 👋"); // ✅ ADD

    navigate("/");
  };

  /* 🔐 PROTECTED NAV */
  const handleProtectedNav = (path) => {
    if (!user) navigate("/signin");
    else navigate(path);
  };

  return (
    <nav className={`navbar ${isAuthPage ? "navbar-black" : ""}`}>
      {/* ================= LOGO ================= */}
      <div className="logo-container" onClick={() => navigate("/")}>
        <svg
          className="logo-svg"
          width="42"
          height="42"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#00f6ff"
            strokeWidth="4"
            fill="none"
          />
          <path d="M50 20 L60 50 L50 80 L40 50 Z" fill="#00f6ff" />
          <circle cx="50" cy="50" r="6" fill="#ff00c8" />
        </svg>
        <h2 className="logo-text">{t("appName")}</h2>
      </div>

      {/* ================= NAV LINKS ================= */}
      <ul className="nav-links">
        <li
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => navigate("/")}
        >
          {t("nav.home")}
        </li>

        <li
          className={location.pathname === "/colleges" ? "active" : ""}
          onClick={() => navigate("/colleges")}
        >
          {t("nav.colleges")}
        </li>

        {user && (
          <li
            className={location.pathname === "/pricing" ? "active" : ""}
            onClick={() => navigate("/pricing")}
          >
            {t("nav.pricing")}
          </li>
        )}

        {/* ================= FEATURES DROPDOWN ================= */}
        <li className="dropdown-item">
          {t("nav.features")}
          <ChevronDown className="dropdown-icon" size={14} />

          <div className="features-dropdown">
            <FeatureItem
              icon={<Sparkles size={16} />}
              title={t("featuresDropdown.careerQuiz.title")}
              desc={t("featuresDropdown.careerQuiz.desc")}
              onClick={() => handleProtectedNav("/career-quiz")}
            />

            <FeatureItem
              icon={<MapPin size={16} />}
              title={t("featuresDropdown.collegeFinder.title")}
              desc={t("featuresDropdown.collegeFinder.desc")}
              onClick={() => navigate("/colleges")}
            />

            <FeatureItem
              icon={<Target size={16} />}
              title={t("featuresDropdown.aiRoadmap.title")}
              desc={t("featuresDropdown.aiRoadmap.desc")}
              locked={!user}
              onClick={() => handleProtectedNav("/ai-roadmap")}
            />

            <FeatureItem
              icon={<Zap size={16} />}
              title={t("featuresDropdown.jobHunting.title")}
              desc={t("featuresDropdown.jobHunting.desc")}
              locked={!user}
              onClick={() => handleProtectedNav("/job-hunting")}
            />

            <FeatureItem
              icon={<Layers size={16} />}
              title={t("featuresDropdown.careerTree.title")}
              desc={t("featuresDropdown.careerTree.desc")}
              onClick={() => navigate("/career-tree")}
            />

            <FeatureItem
              icon={<BookOpen size={16} />}
              title={t("featuresDropdown.learningResources.title")}
              desc={t("featuresDropdown.learningResources.desc")}
              onClick={() => navigate("/resources")}
            />

            <FeatureItem
              icon={<Crown size={16} />}
              title={t("featuresDropdown.subscriptionPlans.title")}
              desc={t("featuresDropdown.subscriptionPlans.desc")}
              onClick={() => navigate("/pricing")}
            />
          </div>
        </li>

        {user && (
          <li
            className="btn-dashboard"
            onClick={() => navigate("/dashboard")}
          >
            {t("nav.dashboard")}
          </li>
        )}
      </ul>

      {/* ================= LANGUAGE SWITCHER ================= */}
      <div className="language-switcher" ref={dropdownRef}>
        <button
          className="language-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {t("language.select")}
          <ChevronDown
            className={`dropdown-icon ${dropdownOpen ? "rotate" : ""}`}
            size={14}
          />
        </button>

        {dropdownOpen && (
          <ul className="language-dropdown">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setDropdownOpen(false);
                }}
              >
                {lang.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= AUTH / USER ================= */}
      <div className="nav-buttons">
        {!user ? (
          <>
            <button
              className="btn-login"
              onClick={() => navigate("/signin")}
            >
              {t("auth.signIn")}
            </button>
            <button
              className="btn-signup"
              onClick={() => navigate("/register")}
            >
              {t("auth.signUp")}
            </button>
          </>
        ) : (
          <div className="user-dropdown" ref={userRef}>
            <button
              className="user-btn btn-dashboard"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {user.name}
              <ChevronDown
                className={`dropdown-icon ${userMenuOpen ? "rotate" : ""}`}
                size={14}
              />
            </button>

            {userMenuOpen && (
              <div className="user-menu">
                <button onClick={() => navigate("/profile")}>
                  {t("auth.profile")}
                </button>
                <button onClick={handleLogout}>
                  {t("auth.logout")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

/* ================= FEATURE ITEM ================= */
const FeatureItem = ({ icon, title, desc, onClick, locked }) => {
  return (
    <div className="feature-item" onClick={onClick}>
      <div className="feature-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
        {locked && <span className="lock-text">Sign in required</span>}
      </div>
    </div>
  );
};

export default Navbar;
