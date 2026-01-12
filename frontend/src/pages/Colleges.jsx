import { useEffect, useState } from "react";
import "../styles/colleges.css";
import CollegeCard from "../components/CollegeCard";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

// ✅ Lucide React icons
import { Filter, ChevronDown, X, Search } from "lucide-react";

const Colleges = () => {
  const { t } = useTranslation();

  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // ✅ FILTER STATES
  const [sortBy, setSortBy] = useState("rating");
  const [type, setType] = useState("All");

  // Fetch colleges
  useEffect(() => {
    fetch("http://localhost:5000/api/colleges")
      .then(res => res.json())
      .then(data => setColleges(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ APPLY FILTERS
  const filteredColleges = colleges.filter(c => {
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase());

    const matchRating = c.rating ? c.rating >= minRating : true;

    const matchType =
      type === "All" ||
      c.type?.toLowerCase() === type.toLowerCase();

    return matchSearch && matchRating && matchType;
  });

  // ✅ APPLY SORTING
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setMinRating(0);
    setSortBy("rating");
    setType("All");
  };

  return (
    <div className="colleges-page">

      {/* ===== HEADER ===== */}
      <div className="college-header">
        <h1>
          {t("colleges.headerTitle", "Find Your Perfect")}{" "}
          <span>{t("colleges.headerSpan", "College")}</span>
        </h1>
        <p>
          {t(
            "colleges.headerDesc",
            "Discover top engineering colleges across India with detailed information and insights"
          )}
        </p>
      </div>

      {/* ===== SEARCH + FILTER CARD ===== */}
      <div className="search-filter-wrapper">

        {/* SEARCH ROW */}
        <div className="search-row">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search colleges or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="search-actions">
            <button
              className="filter-btn"
              onClick={() => setShowFilters(prev => !prev)}
            >
              <Filter size={18} style={{ marginRight: "6px" }} />
              Filters
            </button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="filters-panel">

            <div className="filter-grid">
              <div>
                <label>State</label>
                <div className="select-wrapper">
                  <select>
                    <option>All States</option>
                  </select>
                  <ChevronDown size={18} className="select-icon" />
                </div>
              </div>

              <div>
                <label>Type</label>
                <div className="select-wrapper">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                  </select>
                  <ChevronDown size={18} className="select-icon" />
                </div>
              </div>

              <div>
                <label>Course</label>
                <div className="select-wrapper">
                  <select>
                    <option>All Courses</option>
                  </select>
                  <ChevronDown size={18} className="select-icon" />
                </div>
              </div>

              {/* ⭐ RATING */}
              <div className="rating-filter">
                <label>
                  Min Rating:
                  <span className="rating-value">
                    {Number(minRating).toFixed(1)}
                  </span>
                </label>

                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="rating-slider"
                />
              </div>

              {/* 🔽 SORT BY */}
              <div>
                <label>Sort by</label>
                <div className="select-wrapper">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">All</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                  <ChevronDown size={18} className="select-icon" />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="filter-footer">
              <span className="results-count">
                {sortedColleges.length} colleges found
              </span>

              <button className="clear-btn" onClick={clearFilters}>
                <X size={16} style={{ marginRight: "6px" }} />
                Clear Filters
              </button>
            </div>

          </div>
        )}
      </div>

      {/* ===== COLLEGE GRID ===== */}
      <div className="college-grid">
        {sortedColleges
          .slice(0, showAll ? sortedColleges.length : 8)
          .map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
      </div>

      {!showAll && sortedColleges.length > 8 && (
        <div className="more-btn-wrapper">
          <button
            className="more-colleges-btn"
            onClick={() => setShowAll(true)}
          >
            More Colleges
          </button>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default Colleges;
