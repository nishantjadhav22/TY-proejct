// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

/* 🔥 TOAST */
import { Toaster } from "react-hot-toast";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Particles from "./components/Particles";
import Features from "./components/Features";
import Footer from "./components/Footer";

/* PAGES */
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Colleges from "./pages/Colleges";
import JobHunting from "./pages/JobHunting";
import Dashboard from "./pages/Dashboard";
import ProfileSettings from "./pages/ProfileSettings";
import SavedColleges from "./pages/SavedColleges";
import LearningResources from "./pages/LearningResources";
import Team from "./pages/Team";
import QuizHistory from "./pages/QuizHistory";
import SimplePricingPage from "./pages/SimplePricingPage";
import CareerTreePage from "./pages/CareerTreePage";
import FeaturesPage from "./pages/FeaturesPage";
import AIRoadmap from "./pages/AIRoadmap";


/* 🔐 FORGOT PASSWORD PAGES (ADDED ONLY) */
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* QUIZ */
import CareerQuizHub from "./pages/CareerQuizHub";
import CareerQuizPage from "./pages/CareerQuizPage";

/* HOOKS */
import useScrollToTop from "./hooks/useScrollToTop";
import { UserProvider, useUser } from "./context/UserContext";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();
  const { user } = useUser();


  // refresh / direct load → Home
  useEffect(() => {
    if (location.pathname === "") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {/* 🔥 TOAST POPUP (ADDED) */}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0b0f1a",
            color: "#fff",
            border: "1px solid rgba(0,246,255,0.3)",
          },
        }}
      />

      {location.pathname === "/" && <Particles />}
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 FORGOT PASSWORD ROUTES (ONLY ADDITION) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/job-hunting" element={<JobHunting />} />
        <Route path="/jobs" element={<JobHunting />} />
        <Route path="/career-quiz" element={<CareerQuizHub />} />
        <Route path="/quiz" element={<CareerQuizPage />} />
        <Route path="/resources" element={<LearningResources />} />
        <Route path="/saved-colleges" element={<SavedColleges />} />
        <Route path="/team" element={<Team />} />
        <Route path="/quiz-history" element={<QuizHistory />} />
        <Route path="/subscription" element={<SimplePricingPage />} />
        <Route path="/pricing" element={<SimplePricingPage />} />
        <Route path="/career-tree" element={<CareerTreePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/roadmap" element={<AIRoadmap />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;
