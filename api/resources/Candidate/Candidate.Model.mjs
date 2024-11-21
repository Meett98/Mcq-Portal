import mongoose from 'mongoose'

import CandidateSchema from "../Candidate/Candidate.Schema.mjs";
import QuestionModel from "../Questions/Question.Model.mjs";

const Question = QuestionModel.Question;
const Candidate = mongoose.model("Candidate", CandidateSchema);

const getCandidate = async (email) => {
  const candidate = await Candidate.findOne({ userEmail: email });
  return candidate;
};

const getQuestionAndResult = async (email, candidate, queOption) => {
  const candidateAnswerArray = candidate.answerArray;
  const candidateQuestionArray = candidate.questionsArray;
  console.log(candidateQuestionArray);
  if (candidate.candidateScore !== -1) {
    candidateAnswerArray.push(queOption);
    await Candidate.updateOne(
      { userEmail: email },
      {
        $set: {
          answerArray: candidateAnswerArray,
        },
      },
    );
  }
  if (candidateAnswerArray.length == candidate.numberOfQuestion) {
    //Check Result
    const candidate = await Candidate.findOne({ userEmail: email });
    const prevQuestion = await Question.findOne({
      _id: candidateQuestionArray[candidateAnswerArray.length - 1],
    });

    if (
      prevQuestion.answer ==
      candidateAnswerArray[candidateAnswerArray.length - 1]
    ) {
      await Candidate.updateOne(
        { userEmail: email },
        {
          $set: {
            candidateScore: candidate.candidateScore + 1,
          },
        },
      );
    }
    return {
      message: "Thank You!! Your Test has been submitted succesfully",
      data: {},
    };
  }

  const question = await Question.findOne({
    _id: candidateQuestionArray[candidateAnswerArray.length],
  });

  console.log(question);

  const filteredQuestions = {
    questionNumber: candidateAnswerArray.length + 1,
    question: question.question,
    options: question.options,
  };

  if (candidateAnswerArray.length == 0) {
    await Candidate.updateOne(
      { userEmail: email },
      {
        $set: {
          candidateScore: 0,
        },
      },
    );

    return {
      message: "Question Fetched Successfully",
      data: filteredQuestions,
    };
  } else {
    //check Result
    const candidate = await Candidate.findOne({ userEmail: email });
    const prevQuestion = await Question.findOne({
      _id: candidateQuestionArray[candidateAnswerArray.length - 1],
    });
    if (
      prevQuestion.answer ==
      candidateAnswerArray[candidateAnswerArray.length - 1]
    ) {
      await Candidate.updateOne(
        { userEmail: email },
        {
          $set: {
            candidateScore: candidate.candidateScore + 1,
          },
        },
      );
    }

    return {
      message: "Question Fetched Successfully",
      data: filteredQuestions,
    };
  }
};

const CandidateModel = {
  getCandidate,
  getQuestionAndResult,
  Candidate,
};

export default CandidateModel;
