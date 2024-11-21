import mongoose from 'mongoose'

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  experience: Number,
  numberOfQuestion: {
    type: Number,
    default: 25,
  },
  position: String,
  date: String,
  questionsArray: [String],
  answerArray: [String],
  testAttempted : {
    type: Boolean,
    default: false
  },
  candidateScore : {
    type : Number,
    default : -1
  }
});


export default candidateSchema