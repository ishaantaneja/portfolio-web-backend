import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Fetch all blog posts" }));
router.get("/:id", (req, res) => res.json({ message: `Fetch blog ${req.params.id}` }));
router.post("/", (req, res) => res.json({ message: "Create new blog post" }));
router.put("/:id", (req, res) => res.json({ message: `Update blog ${req.params.id}` }));
router.delete("/:id", (req, res) => res.json({ message: `Delete blog ${req.params.id}` }));

export default router;
