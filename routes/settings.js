import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Fetch CMS settings" }));
router.put("/", (req, res) => res.json({ message: "Update CMS settings", data: req.body }));

export default router;
