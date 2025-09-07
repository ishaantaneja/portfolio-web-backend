import express from "express";
import Setting from "../models/Setting.js";

const router = express.Router();

// GET current theme
router.get("/", async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ darkMode: false });
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch theme" });
  }
});

// UPDATE theme
router.put("/", async (req, res) => {
  try {
    const { darkMode } = req.body;
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ darkMode });
    } else {
      setting.darkMode = darkMode;
      await setting.save();
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: "Failed to update theme" });
  }
});

export default router;
