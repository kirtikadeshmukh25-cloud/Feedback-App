import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import Feedback from "./models/Feedback.js";

const app = express();


app.use(cors());
app.use(express.json());


app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


app.get("/api/feedback", async (req, res) => {
  try {

    const feedback = await Feedback.find().sort({ date: -1 });
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.delete("/api/feedback/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.log("❌ MongoDB Error:", error.message));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});