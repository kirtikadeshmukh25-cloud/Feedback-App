import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "⭐", title: "Star Ratings", text: "Give a quick rating from 1 to 5 stars based on your experience." },
  { icon: "📝", title: "Detailed Comments", text: "Write down exactly what you liked or what can be improved." },
  { icon: "⚡", title: "Real-time Database", text: "Powered by MongoDB. Your feedback is saved instantly." },
  { icon: "🗑️", title: "Manage Feedbacks", text: "Admins can easily remove spam or unwanted reviews." },
];

export default function Home() {
  return (
    <div className="page home">
      <section className="hero fade-up">
        <span className="pill">✨ Student Feedback Portal</span>
        <h1 className="hero-title">
          Your voice matters.
          <br />
          <span className="gradient-text">Help us improve.</span>
        </h1>
        <p className="hero-sub">
          A modern, fast, and transparent feedback system. Share your thoughts, rate your experience, and see what others are saying.
        </p>
        <div className="hero-actions">
          <Link to="/submit" className="btn btn-primary">📝 Write a Review</Link>
          <Link to="/list" className="btn btn-ghost">Read Reviews</Link>
        </div>
      </section>

      <section className="section fade-up">
        <div className="section-head">
          <h2 className="section-title">How it works</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <article className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="card-title">{f.title}</h3>
              <p className="card-text">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split fade-up">
        <div className="split-text">
          <h2 className="section-title">Built for performance</h2>
          <p className="card-text">
            We use React for a snappy frontend and Express + MongoDB for a secure backend. Here's a quick look at how we save a review:
          </p>
          <Link to="/submit" className="btn btn-primary">Try it now →</Link>
        </div>
        <div className="code-card">
          <div className="code-head">
            <span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" />
            <span className="code-title">server.js</span>
          </div>
          <pre className="code-body">
            <code>
              <span className="tok-key">app</span>.<span className="tok-fn">post</span>(<span className="tok-str">"/api/feedback"</span>, <span className="tok-key">async</span> (req, res) {"=>"} {"{"}
              {"\n  "}<span className="tok-key">const</span> feedback = <span className="tok-key">await</span> Feedback.<span className="tok-fn">create</span>(req.body);
              {"\n  "}res.<span className="tok-fn">json</span>({"{"} success: <span className="tok-bool">true</span>, data: feedback {"}"});
              {"\n"}{"}"});
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}