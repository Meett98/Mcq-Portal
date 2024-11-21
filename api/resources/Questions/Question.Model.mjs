import mongoose from 'mongoose'

import QuestionSchema from "../Questions/Question.Schema.mjs";

const Question = mongoose.model("Question", QuestionSchema);

const QuestionModel = {
  Question,
};

export default QuestionModel;
