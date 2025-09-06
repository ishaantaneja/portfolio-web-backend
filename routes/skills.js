import express from "express";
import Skill from "../models/Skill.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET all skills (public)
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new skill (protected, CMS)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, level } = req.body;
    const newSkill = new Skill({ name, level });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE skill (protected, CMS)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
