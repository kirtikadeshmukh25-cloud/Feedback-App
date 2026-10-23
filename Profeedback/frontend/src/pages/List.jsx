import { useState, useEffect } from "react";

export default function List() {
  // 👇 Yahan Environment Variable use kiya gaya hai
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all feedback
  const fetchFeedbacks = async () => {
    try {
      // 👇 Yahan API_URL use hua hai
      const res = await fetch(`${API_URL}/api/feedback`);
      const result = await res.json();
      if (result.success) setFeedbacks(result.data);
    } catch (err) {
      console.error("Failed to fetch feedback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      // 👇 Yahan API_URL use hua hai
      await fetch(`${API_URL}/api/feedback/${id}`, { method: "DELETE" });
      setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
    } catch (err) {
      alert("Failed to delete feedback.");
    }
  };

  if (loading) return <div className="page"><p className="sample-text loading" style={{textAlign:"center"}}>⏳ Loading reviews...</p></div>;

  return (
    <div className="page list-page fade-up">
      <div className="panel-head" style={{ marginBottom: "2rem" }}>
        <div>
          <h1 className="panel-title">📋 All Feedback</h1>
          <p className="panel-sub">See what students are saying about us.</p>
        </div>
        <span className="pill">{feedbacks.length} Reviews</span>
      </div>

      {feedbacks.length === 0 ? (
        <div className="panel empty-panel">
          <h2 className="panel-title">😴 No feedback yet</h2>
          <p className="card-text">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((fb) => (
            <div className="review-card" key={fb._id}>
              <div className="review-header">
                <div className="review-avatar">{fb.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className="review-name">{fb.name}</h3>
                  <p className="review-date">{new Date(fb.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="review-stars">{"⭐".repeat(fb.rating)}</div>
              <p className="review-comment">"{fb.comment}"</p>
              
              <button className="btn btn-danger btn-sm delete-btn" onClick={() => deleteFeedback(fb._id)}>
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}