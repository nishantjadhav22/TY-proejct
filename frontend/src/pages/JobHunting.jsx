import "../styles/jobHunting.css";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const JobHunting = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleBoxClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError(t("jobHunting.errorInvalidFile"));
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError(t("jobHunting.errorNoFile"));
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );

      if (res.data?.error) {
        setError(res.data.error);
        return;
      }

      setResult(res.data);
    } catch (err) {
      console.error("Frontend ERROR:", err);
      setError("Resume analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jh-page">
      {/* HEADER */}
      <div className="jh-header">
        <div className="jh-title">
          <div className="jh-icon">💼</div>
          <div>
            <h2>{t("jobHunting.headerTitle")}</h2>
            <p>{t("jobHunting.headerSubtitle")}</p>
          </div>
        </div>
      </div>

      {/* CARD */}
      <div className="jh-card">
        <h3>
          <Upload size={20} /> {t("jobHunting.uploadTitle")}
        </h3>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <div className="jh-upload-box" onClick={handleBoxClick}>
          {fileName ? (
            <div className="jh-file-name">📄 {fileName}</div>
          ) : (
            <>
              <div className="jh-file-icon">📄</div>
              <p className="jh-main-text">{t("jobHunting.uploadChooseFile")}</p>
              <span>{t("jobHunting.uploadFormatOnly")}</span>
            </>
          )}
        </div>

        <button
          className="jh-analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? t("jobHunting.loadingText") : t("jobHunting.analyzeBtn")}
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="jh-result">
            <h4>{t("jobHunting.resultTitle")}</h4>

            <p>
              <strong>{t("jobHunting.resultATS")}:</strong>{" "}
              {result.atsScore ?? "N/A"}
            </p>

            <p>
              <strong>{t("jobHunting.resultMissingSkills")}:</strong>{" "}
              {Array.isArray(result.missingSkills)
                ? result.missingSkills.join(", ")
                : "N/A"}
            </p>

            <p>
              <strong>{t("jobHunting.resultRecommendedRoles")}:</strong>{" "}
              {Array.isArray(result.recommendedRoles)
                ? result.recommendedRoles.join(", ")
                : "N/A"}
            </p>

            <p>
              <strong>{t("jobHunting.resultTips")}:</strong>{" "}
              {Array.isArray(result.improvementTips)
                ? result.improvementTips.join(", ")
                : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHunting;
