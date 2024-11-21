import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserSchema from "./User.Schema.mjs";
import CandidateModel from "../Candidate/Candidate.Model.mjs";
const secretToken = "asdfghjklxdcfghjk";

const User = mongoose.model("User", UserSchema);
const Candidate = CandidateModel.Candidate;

const handleLogin = async (body) => {
  const { userEmail, password } = body;
  const user = await User.findOne({ userEmail: userEmail });
  if (user) {
    const hashedPassword = user.password;
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      return user;
    }
  }
  return false;
};

const generateToken = async (user) => {
  const token = jwt.sign(
    { userEmail: user.userEmail, role: user.role },
    secretToken,
  );
  return token;
};
const getCandidate = async (userEmail) => {
  return await Candidate.findOne({ userEmail: userEmail });
};
const updateCandidateTestStatus = async (userEmail) => {
  await Candidate.updateOne(
    { userEmail: userEmail },
    {
      $set: {
        testAttempted: true,
      },
    },
  );
};
const getCandidateData = async (candidate, user, token) => {
  return {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    numberOfQuestion: candidate.numberOfQuestion,
    role: user.role,
    position: candidate.position,
    token: token,
  };
};

const UserModel = {
  handleLogin,
  generateToken,
  getCandidate,
  updateCandidateTestStatus,
  getCandidateData,
  User,
};

export default UserModel;
