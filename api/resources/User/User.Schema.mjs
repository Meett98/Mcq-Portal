import mongoose from 'mongoose'

const Role = Object.freeze({
  ADMIN: "admin",
  CANDIDATE: "candidate",
});

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: Role.CANDIDATE,
  },
});

export default userSchema