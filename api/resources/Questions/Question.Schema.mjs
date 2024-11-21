"use strict";
import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    OPTION_1: {
      type: String,
      required: true,
    },
    OPTION_2: {
      type: String,
      required: true,
    },
    OPTION_3: {
      type: String,
      required: true,
    },
    OPTION_4: {
      type: String,
      required: true,
    },
  },
  answer: {
    type: String,
    enum: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
    required: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ["0-3", "3-6", "6-8"], // assuming experience ranges, adjust as needed
  },
});

export default questionSchema;
