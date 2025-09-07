import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'


import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import postRoutes from './routes/posts.js'
import skillRoutes from './routes/skills.js'
import contactRoutes from './routes/contact.js'
import blogRoutes from './routes/blog.js'
import settingRoutes from './routes/settings.js'




const app = express()



// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blog', blogRoutes) 
app.use('/api/settings', settingRoutes)

import settingsRoutes from "./routes/settings.js";

app.use("/api/settings", settingsRoutes);

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
  })
  .catch(err => console.error(err))
