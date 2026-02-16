import "../styles/navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";
import {
  ChevronDown,
  Sparkles,
  MapPin,
  Target,
  Zap,
  Layers,
  BookOpen,
  Crown,
  Settings,
  Globe,
  BarChart3,
  Bookmark,
  Activity,
  BellRing,
  Map,
  Menu,
  X,
  Home,
  Building2,
  CreditCard,
  LayoutDashboard,
  UserCircle,
  LogOut,
  Briefcase,
  TreePine,
  Compass,
  BookOpenCheck,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, logout } = useUser();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userRef = useRef(null);

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/register";

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मराठी" },
  ];

  const userDisplayName =
    user?.firstName?.length || user?.lastName?.length
      ? [user.firstName, user.lastName].filter(Boolean).join(" ")
      : user?.name || user?.email || t("auth.profile");

  const avatarUrl = user?.profilePhoto || user?.avatar || "";

  const navigationLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Colleges", path: "/colleges", icon: Building2 },
    { label: "Pricing", path: "/pricing", icon: CreditCard },
    { label: "Features", path: "/features", icon: Sparkles },
  ];

  const quickAccessLinks = [
    { label: "Career Quiz", path: "/quiz", icon: Target },
    { label: "College Finder", path: "/colleges", icon: MapPin },
    { label: "AI Roadmap", path: "/roadmap", icon: Compass, requiresAuth: true },
    { label: "Job Hunting", path: "/jobs", icon: Briefcase },
    { label: "3D Career Tree", path: "/career-tree", icon: TreePine },
    { label: "Learning Resources", path: "/resources", icon: BookOpenCheck },
  ];

  const userLinks = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, requiresAuth: true },
    { label: "Profile", path: "/profile", icon: UserCircle, requiresAuth: true },
    { label: "Saved Colleges", path: "/saved-colleges", icon: Bookmark, requiresAuth: true },
  ];

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setFeaturesOpen(false);
    setDropdownOpen(false);
    setUserMenuOpen(false);
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setFeaturesOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenuAndNavigate = (path, needsAuth, hash = "") => {
    if (needsAuth && !user) {
      navigate("/signin");
      return;
    }

    setFeaturesOpen(false);
    setDropdownOpen(false);
    setUserMenuOpen(false);
    setDrawerOpen(false);

    if (hash) {
      navigate(`${path}${hash}`);
      return;
    }

    navigate(path);
  };

  const handleFeaturesToggle = () => {
    if (window.innerWidth > 1024) return;
    setFeaturesOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    setDrawerOpen(false);
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${isAuthPage ? "navbar-black" : ""}`}>
      <div className="logo-container" onClick={() => navigate("/")}>
        <svg
          className="logo-svg"
          width="42"
          height="42"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" stroke="#00f6ff" strokeWidth="4" fill="none" />
          <path d="M50 20 L60 50 L50 80 L40 50 Z" fill="#00f6ff" />
          <circle cx="50" cy="50" r="6" fill="#ff00c8" />
        </svg>
        <h2 className="logo-text">{t("appName")}</h2>
      </div>

      <div className="nav-right desktop-nav">
        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""} onClick={() => closeMenuAndNavigate("/")}>
            {t("nav.home")}
          </li>

          <li
            className={location.pathname === "/colleges" ? "active" : ""}
            onClick={() => closeMenuAndNavigate("/colleges")}
          >
            {t("nav.colleges")}
          </li>

          <li
            className={location.pathname === "/pricing" ? "active" : ""}
            onClick={() => closeMenuAndNavigate("/pricing")}
          >
            {t("nav.pricing", "Pricing")}
          </li>

          <li className={`dropdown-item ${featuresOpen ? "open" : ""}`} onClick={handleFeaturesToggle}>
            {t("nav.features")}
            <ChevronDown className="dropdown-icon" size={14} />

            <div className={`features-dropdown ${featuresOpen ? "show" : ""}`}>
              <FeatureItem
                icon={<Sparkles size={16} />}
                title={t("featuresDropdown.careerQuiz.title")}
                desc={t("featuresDropdown.careerQuiz.desc")}
                onClick={() => closeMenuAndNavigate("/career-quiz", true)}
              />

              <FeatureItem
                icon={<MapPin size={16} />}
                title={t("featuresDropdown.collegeFinder.title")}
                desc={t("featuresDropdown.collegeFinder.desc")}
                onClick={() => closeMenuAndNavigate("/colleges")}
              />

              <FeatureItem
                icon={<Target size={16} />}
                title={t("featuresDropdown.aiRoadmap.title")}
                desc={t("featuresDropdown.aiRoadmap.desc")}
                locked={!user}
                onClick={() => closeMenuAndNavigate("/roadmap", true)}
              />

              <FeatureItem
                icon={<Zap size={16} />}
                title={t("featuresDropdown.jobHunting.title")}
                desc={t("featuresDropdown.jobHunting.desc")}
                locked={!user}
                onClick={() => closeMenuAndNavigate("/jobs", true)}
              />

              <FeatureItem
                icon={<Layers size={16} />}
                title={t("featuresDropdown.careerTree.title")}
                desc={t("featuresDropdown.careerTree.desc")}
                onClick={() => closeMenuAndNavigate("/career-tree")}
              />

              <FeatureItem
                icon={<BookOpen size={16} />}
                title={t("featuresDropdown.learningResources.title")}
                desc={t("featuresDropdown.learningResources.desc")}
                onClick={() => closeMenuAndNavigate("/resources")}
              />

              <FeatureItem
                icon={<Crown size={16} />}
                title={t("featuresDropdown.subscriptionPlans.title")}
                desc={t("featuresDropdown.subscriptionPlans.desc")}
                locked={!user}
                onClick={() => closeMenuAndNavigate("/pricing")}
              />

              <FeatureItem
                icon={<BarChart3 size={16} />}
                title={t("dashboardNav.overview", "Dashboard Overview")}
                desc={t("dashboardNav.overviewDesc", "Personalized insights and alerts")}
                locked={!user}
                onClick={() => closeMenuAndNavigate("/dashboard", true)}
              />

              <FeatureItem
                icon={<Activity size={16} />}
                title={t("dashboardNav.stats", "Performance Stats")}
                desc={t("dashboardNav.statsDesc", "Quizzes, skills, achievements")}
                locked={!user}
                onClick={() =>
                  closeMenuAndNavigate("/dashboard", true, "#dashboard-stats")
                }
              />

              <FeatureItem
                icon={<Bookmark size={16} />}
                title={t("dashboardNav.saved", "Saved Colleges")}
                desc={t("dashboardNav.savedDesc", "Quick jump to your shortlist")}
                locked={!user}
                onClick={() =>
                  closeMenuAndNavigate("/dashboard", true, "#dashboard-saved-colleges")
                }
              />

              <FeatureItem
                icon={<Activity size={16} />}
                title={t("dashboardNav.weekly", "Weekly Progress")}
                desc={t("dashboardNav.weeklyDesc", "Track growth week by week")}
                locked={!user}
                onClick={() =>
                  closeMenuAndNavigate("/dashboard", true, "#dashboard-weekly-progress")
                }
              />

              <FeatureItem
                icon={<BellRing size={16} />}
                title={t("dashboardNav.activity", "Recent Activity")}
                desc={t("dashboardNav.activityDesc", "See what changed lately")}
                locked={!user}
                onClick={() =>
                  closeMenuAndNavigate("/dashboard", true, "#dashboard-activity")
                }
              />

              <FeatureItem
                icon={<Map size={16} />}
                title={t("dashboardNav.roadmap", "Roadmap Preview")}
                desc={t("dashboardNav.roadmapDesc", "Jump to your AI roadmap")}
                locked={!user}
                onClick={() =>
                  closeMenuAndNavigate("/dashboard", true, "#dashboard-roadmap")
                }
              />
            </div>
          </li>

          {user && (
            <li className="btn-dashboard" onClick={() => closeMenuAndNavigate("/dashboard")}>
              <Settings size={16} />
              <span>{t("nav.dashboard")}</span>
            </li>
          )}
        </ul>

        <div className="language-switcher" ref={dropdownRef}>
          <button className="language-btn-next" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Globe size={16} />
            <span>{t("language.select")}</span>
            <ChevronDown className={`dropdown-icon ${dropdownOpen ? "rotate" : ""}`} size={14} />
          </button>

          {dropdownOpen && (
            <ul className="language-dropdown-next">
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

        <div className="nav-buttons">
          {!user ? (
            <>
              <button className="btn-login" onClick={() => closeMenuAndNavigate("/signin")}>
                {t("auth.signIn")}
              </button>
              <button className="btn-signup" onClick={() => closeMenuAndNavigate("/register")}>
                {t("auth.signUp")}
              </button>
            </>
          ) : (
            <div className="user-dropdown" ref={userRef}>
              <button className="user-btn btn-dashboard" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                {userDisplayName}
                <ChevronDown className={`dropdown-icon ${userMenuOpen ? "rotate" : ""}`} size={14} />
              </button>

              {userMenuOpen && (
                <div className="user-menu">
                  <button onClick={() => closeMenuAndNavigate("/profile")}>{t("auth.profile")}</button>
                  <button onClick={handleLogout}>{t("auth.logout")}</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <button className="hamburger-btn" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
        <Menu size={22} />
      </button>

      <div className={`nav-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="drawer-user">
            {avatarUrl ? (
              <img src={avatarUrl} alt="User avatar" className="drawer-avatar" />
            ) : (
              <div className="drawer-avatar placeholder">{userDisplayName?.[0] || "C"}</div>
            )}
            <div>
              <p>{userDisplayName}</p>
              <span>{user?.email || "Guest"}</span>
            </div>
          </div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <DrawerSection
          title="Navigation"
          links={navigationLinks}
          isActive={isActive}
          onNavigate={closeMenuAndNavigate}
        />

        <DrawerSection
          title="Quick Access"
          links={quickAccessLinks}
          isActive={isActive}
          onNavigate={closeMenuAndNavigate}
        />

        <DrawerSection
          title="User"
          links={userLinks}
          isActive={isActive}
          onNavigate={closeMenuAndNavigate}
        />

        {user ? (
          <button className="drawer-logout" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <div className="drawer-auth-actions">
            <button onClick={() => closeMenuAndNavigate("/signin")}>{t("auth.signIn")}</button>
            <button className="primary" onClick={() => closeMenuAndNavigate("/register")}>
              {t("auth.signUp")}
            </button>
          </div>
        )}
      </div>

      {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />}
    </nav>
  );
};

const FeatureItem = ({ icon, title, desc, onClick, locked }) => (
  <div
    className="feature-item"
    onClick={(event) => {
      event.stopPropagation();
      if (onClick) onClick();
    }}
  >
    <div className="feature-icon">{icon}</div>
    <div>
      <h4>{title}</h4>
      <p>{desc}</p>
      {locked && <span className="lock-text">Sign in required</span>}
    </div>
  </div>
);

const DrawerSection = ({ title, links, isActive, onNavigate }) => (
  <div className="drawer-section">
    <p className="drawer-section-title">{title}</p>
    {links.map((link) => (
      <button
        key={link.path}
        className={`drawer-link ${isActive(link.path) ? "active" : ""}`}
        onClick={() => onNavigate(link.path, link.requiresAuth, link.hash)}
      >
        <link.icon size={16} />
        <span>{link.label}</span>
      </button>
    ))}
  </div>
);

export default Navbar;
