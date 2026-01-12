import "../styles/footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react"; // ✅ ADDED

const Footer = () => {
  const { t } = useTranslation();

  const footerRef = useRef(null); // ✅ ADDED
  const [showScrollBtn, setShowScrollBtn] = useState(false); // ✅ ADDED

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ✅ ADDED: footer visible hone par hi button show
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollBtn(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Main Footer */}
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <h3>✨ CareerGuide</h3>
          <p>
            {t(
              "footer.description",
              "Your comprehensive platform for career guidance and college recommendations powered by AI."
            )}
          </p>

          <div className="footer-contact">
            <p>{t("footer.email", "📧 solutions@gmail.com")}</p>
            <p>{t("footer.phone", "📞 +91 7000000000")}</p>
            <p>{t("footer.address", "📍 123 Innovation Drive, Tech City")}</p>
          </div>

          <div className="footer-social">
            <a href="https://www.facebook.com/your-facebook-username" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com/your-twitter-username" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/nishant_jadhav45" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/shubham-prajapati-492122291" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>{t("footer.featuresTitle", "FEATURES")}</h4>
          <a href="career-quiz">{t("footer.careerQuiz", "Career Quiz")}</a>
          <a href="#">{t("footer.careerTree", "3D Career Tree")}</a>
          <Link to="/colleges">{t("footer.collegeFinder", "College Finder")}</Link>
          <a href="#">{t("footer.timeline", "Timeline Tracker")}</a>
        </div>

        <div className="footer-links">
          <h4>{t("footer.companyTitle", "COMPANY")}</h4>
          <a href="#">{t("footer.about", "About")}</a>
          <a href="#">{t("footer.team", "Team")}</a>
          <a href="#">{t("footer.careers", "Careers")}</a>
          <a href="#">{t("footer.contact", "Contact")}</a>
        </div>

        <div className="footer-links">
          <h4>{t("footer.supportTitle", "SUPPORT")}</h4>
          <a href="#">{t("footer.help", "Help")}</a>
          <a href="#">{t("footer.studyMaterials", "Study Materials")}</a>
          <a href="#">{t("footer.careerGuides", "Career Guides")}</a>
          <a href="#">{t("footer.apiDocs", "API Docs")}</a>
        </div>

        <div className="footer-links">
          <h4>{t("footer.legalTitle", "LEGAL")}</h4>
          <a href="#">{t("footer.privacyPolicy", "Privacy Policy")}</a>
          <a href="#">{t("footer.terms", "Terms of Service")}</a>
          <a href="#">{t("footer.cookie", "Cookie Policy")}</a>
          <a href="#">{t("footer.gdpr", "GDPR")}</a>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        {t(
          "footer.bottomText",
          "© 2025 CareerGuide. Built with ❤️ for students everywhere."
        )}
      </div>

      {/* ✅ ADDED: footer visible hone par hi */}
      {showScrollBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
