import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Register admin (only once manually or controlled)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'User exists' })

    const hash = await bcrypt.hash(password, 10)
    const user = new User({ email, passwordHash: hash, role: 'admin' })
    await user.save()
    res.json({ message: 'User registered' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
