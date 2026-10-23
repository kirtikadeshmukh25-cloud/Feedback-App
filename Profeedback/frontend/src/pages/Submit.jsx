import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Submit() {
  const navigate = useNavigate();
  
  // 👇 Yahan Environment Variable use kiya gaya hai
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({ name: "", rating: "", comment: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      // 👇 Yahan API_URL use hua hai
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating)
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", rating: "", comment: "" });
        setTimeout(() => navigate("/list"), 1500);
      } else {
        setStatus({ loading: false, success: false, error: result.message });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Server connection failed. Is the backend running?" });
    }
  };

  return (
    <div className="page submit-page">
      <div className="panel fade-up" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="panel-title">📝 Submit Feedback</h1>
        <p className="panel-sub">Your honest review helps us build a better platform.</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <label className="field">
            <span className="field-label">Name</span>
            <input 
              id="name" type="text" className="text-input" 
              placeholder="Enter your full name" 
              value={formData.name} onChange={handleChange} required 
            />
          </label>

          <label className="field">
            <span className="field-label">Rating</span>
            <select id="rating" className="text-input" value={formData.rating} onChange={handleChange} required>
              <option value="" disabled>Select a rating</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Very Bad</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Comment</span>
            <textarea 
              id="comment" rows="4" className="text-input" 
              placeholder="What did you like? What can be improved?" 
              value={formData.comment} onChange={handleChange} required 
            ></textarea>
          </label>

          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? "Submitting..." : "Submit Feedback 🚀"}
          </button>

          {status.success && (
            <div className="alert success">✅ Thank you! Redirecting to reviews...</div>
          )}
          {status.error && (
            <div className="alert error">❌ {status.error}</div>
          )}
        </form>
      </div>
    </div>
  );
}