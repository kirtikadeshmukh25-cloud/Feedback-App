import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import List from "./pages/List";

export default function App() {
  return (
    <div className="app">
      <div className="orbs" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <Navbar />

      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </main>
      
      <footer className="site-footer">
        <p>Built with React + Node.js · Share your experience 💬</p>
      </footer>
    </div>
  );
}