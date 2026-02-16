import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import CollegeCard from "../components/CollegeCard";
import "../styles/colleges.css";
import { Bookmark } from "lucide-react"; // ✅ ADDED (FIX)

const SavedColleges = () => {
  const [savedColleges, setSavedColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        // Call protected endpoint without passing userId in URL.
        // `apiClient` attaches the Bearer token from localStorage automatically.
        const res = await apiClient.get(`/api/colleges/bookmark`);
        setSavedColleges(res.data.savedColleges || []);
      } catch (err) {
        // Handle auth errors explicitly so UI can respond (e.g., redirect to sign-in)
        console.error("Failed to fetch saved colleges", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) {
    return <p className="loading">Loading saved colleges...</p>;
  }

  return (
    <div className="colleges-container">
      <h1 className="page-title">Saved Colleges</h1>

      {savedColleges.length === 0 ? (
        <div className="empty-state">
          <Bookmark size={40} />
          <h3>No saved colleges yet</h3>
          <p>Start exploring colleges and bookmark your favorites.</p>
        </div>
      ) : (
        <div className="colleges-grid">
          {savedColleges.map((item) => (
            <CollegeCard
              key={item._id}
              college={{
                id: item.collegeId,
                name: item.collegeName
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedColleges;
