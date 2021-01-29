import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  os: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  }
})

//Create collection
const Vote = mongoose.model('Vote', VoteSchema)

export default Vote