// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

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
import LearningResources from "./pages/LearningResources";

/* 🔐 FORGOT PASSWORD PAGES (ADDED ONLY) */
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* QUIZ */
import CareerQuizHub from "./pages/CareerQuizHub";
import CareerQuizPage from "./pages/CareerQuizPage";

/* HOOKS */
import useScrollToTop from "./hooks/useScrollToTop";
import { getStoredUser } from "./services/apiClient";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();

  const [user, setUser] = useState(getStoredUser());
  useEffect(() => {
    const handleUserUpdated = (event) => {
      setUser(event.detail);
    };

    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth:user-updated", handleUserUpdated);
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:user-updated", handleUserUpdated);
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);


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
      <Navbar user={user} setUser={setUser} />

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
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 FORGOT PASSWORD ROUTES (ONLY ADDITION) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/job-hunting" element={<JobHunting />} />
        <Route path="/career-quiz" element={<CareerQuizHub />} />
        <Route path="/quiz" element={<CareerQuizPage />} />
        <Route path="/resources" element={<LearningResources />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
