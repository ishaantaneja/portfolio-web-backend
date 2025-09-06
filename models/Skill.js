import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: String,
  level: String
})

export default mongoose.model('Skill', skillSchema)
