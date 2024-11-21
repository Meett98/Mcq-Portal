import CandidateModel from "../Candidate/Candidate.Model.mjs";
import QuestionModel from "../Questions/Question.Model.mjs";
import UserModel from "../User/User.Model.mjs";

const User = UserModel.User;
const Question = QuestionModel.Question;
const Candidate = CandidateModel.Candidate; //create karvano baki chhe

const AdminModel = {
  createCandidate,
  generatePassword,
  generateRandomArray,
  createUser,
  deleteCandidate,
  findCandidate,
  updateCandidate,
  updateUser,
  getAllCandidatesList,
  filterCandidateDetail,
  filterAllCandidates,
  deleteUser,
  resetCandidateScore,
};

export default AdminModel;

async function generateRandomArray(length) {
  const questions = await Question.findMany({}, "_id"); // Fetch only the ObjectIds
  const objectIds = questions.map((q) => q._id.toString()); // Convert ObjectIds to strings
  const randomArray = [];

  while (randomArray.length < length) {
    const randomIndex = Math.floor(Math.random() * objectIds.length);
    const randomId = objectIds[randomIndex];
    if (!randomArray.includes(randomId)) {
      randomArray.push(randomId);
    }
  }
  return randomArray;
}

function generatePassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQR@%STUVWXYZabcdefghijklmnopqrstuvwxyz&0123456789";
  let result = "";
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

async function createCandidate(newCandidate, randomArray) {
  await Candidate.createOne({
    firstName: newCandidate.firstName,
    lastName: newCandidate.lastName,
    mobile: newCandidate.mobile,
    userEmail: newCandidate.userEmail,
    numberOfQuestion: newCandidate.numberOfQuestion,
    experience: newCandidate.experience,
    position: newCandidate.position,
    date: newCandidate.date,
    questionsArray: randomArray,
  });
}
async function createUser(newCandidate, candidatePassword) {
  await User.createOne({
    userEmail: newCandidate.userEmail,
    password: candidatePassword,
    role: newCandidate.role,
  });
}
async function deleteCandidate(userEmail) {
  return await Candidate.remove({
    userEmail: userEmail,
  });
}
async function deleteUser(userEmail) {
  return await User.remove({
    userEmail: userEmail,
  });
}
async function findCandidate(userEmail) {
  return await Candidate.findOne({
    userEmail: userEmail,
  });
}
async function getAllCandidatesList() {
  return await Candidate.findMany({});
}
function filterAllCandidates(candidateList) {
  const result = candidateList.map((candidate) => {
    console.log(candidate);
    return filterCandidateDetail(candidate);
  });
  return result;
}
function filterCandidateDetail(candidate) {
  return {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    mobile: candidate.mobile,
    userEmail: candidate.userEmail,
    experience: candidate.experience,
    position: candidate.position,
    date: candidate.date,
    candidateScore: candidate.candidateScore,
    numberOfQuestion: candidate.numberOfQuestion,
    testAttempted: candidate.testAttempted,
  };
}
async function updateUser(updatedCandidate, candidatePassword) {
  await User.updateOne(
    { userEmail: updatedCandidate.userEmail },
    {
      $set: {
        password: candidatePassword,
      },
    },
  );
}

async function updateCandidate(updatedCandidate, randomArray) {
  await Candidate.updateOne(
    { userEmail: updatedCandidate.userEmail },
    {
      $set: {
        firstName: updatedCandidate.firstName,
        lastName: updatedCandidate.lastName,
        mobile: updatedCandidate.mobile,
        userEmail: updatedCandidate.userEmail,
        numberOfQuestion: updatedCandidate.numberOfQuestion,
        experience: updatedCandidate.experience,
        position: updatedCandidate.position,
        date: updatedCandidate.date,
        questionsArray: randomArray,
        answerArray: [],
        testAttempted: false,
      },
    },
  );
}

async function resetCandidateScore(userEmail) {
  await Candidate.updateOne(
    { userEmail: userEmail },
    {
      $set: {
        candidateScore: -1,
      },
    },
  );
}
