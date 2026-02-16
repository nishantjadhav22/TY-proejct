import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Loader2, MapPin, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "../services/apiClient";
import { useUser } from "../context/UserContext";
import "../styles/savedColleges.css";

const SavedColleges = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [savedColleges, setSavedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSaved = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get("/api/saved-colleges");
      setSavedColleges(res.data?.savedColleges || []);
    } catch (err) {
      console.error("Failed to fetch saved colleges", err);
      if (err.response?.status === 401) {
        navigate("/signin");
        return;
      }
      setError("Unable to load your saved colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    fetchSaved();
  }, [user, fetchSaved, navigate]);

  const handleRemove = async (id) => {
    try {
      await apiClient.delete(`/api/saved-colleges/${id}`);
      setSavedColleges((prev) => prev.filter((college) => college.id !== id));
      window.dispatchEvent(new Event("saved-colleges-updated"));
      toast.success("Removed from saved list");
    } catch (err) {
      console.error("Failed to remove college", err);
      toast.error("Could not remove college. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="saved-colleges-page">
      <header className="saved-header">
        <div>
          <p className="eyebrow">Saved Colleges</p>
          <h1>Your curated shortlist</h1>
          <p>Review, compare, and refine the colleges you care about most.</p>
        </div>
        <button onClick={() => navigate("/colleges")}>
          Browse Colleges
        </button>
      </header>

      {loading && (
        <div className="saved-state">
          <Loader2 className="spin" size={28} />
          <p>Loading saved colleges...</p>
        </div>
      )}

      {!loading && error && (
        <div className="saved-state error">
          <p>{error}</p>
          <button onClick={fetchSaved}>Retry</button>
        </div>
      )}

      {!loading && !error && savedColleges.length === 0 && (
        <div className="saved-state empty">
          <Bookmark size={36} />
          <h3>No saved colleges yet</h3>
          <p>Tap the bookmark icon on any college to add it here.</p>
          <button onClick={() => navigate("/colleges")}>Find colleges</button>
        </div>
      )}

      {!loading && !error && savedColleges.length > 0 && (
        <div className="saved-grid">
          {savedColleges.map((item) => (
            <SavedCollegeCard key={item.id} college={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

const SavedCollegeCard = ({ college, onRemove }) => {
  const details = college.college || {};
  const fees = details.fees ? `₹ ${details.fees.toLocaleString()}` : "N/A";
  const logo =
    details.logo ||
    `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
      details.name || "College"
    )}`;

  return (
    <article className="saved-card">
      <div className="saved-card-header">
        <img src={logo} alt={`${details.name} logo`} />
        <div>
          <h3>{details.name}</h3>
          <p>
            <MapPin size={14} /> {details.location}
          </p>
        </div>
      </div>

      <div className="saved-card-meta">
        <span>
          <Star size={14} /> {details.rating || "-"}
        </span>
        <span>Est. {details.est}</span>
        <span>{details.type}</span>
      </div>

      <div className="saved-card-footer">
        <div>
          <p className="label">Annual Fees</p>
          <p className="value">{fees}</p>
        </div>
        <button onClick={() => onRemove(college.id)}>
          <Trash2 size={16} /> Remove
        </button>
      </div>
    </article>
  );
};

export default SavedColleges;
