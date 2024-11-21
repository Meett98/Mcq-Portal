
import bcrypt from "bcrypt";

import AdminModel from "./Admin.Model.mjs";
import { ResponseBody } from "../../../utils/responseHandler.mjs";

const handleRegisterCandidate = async (request, response, next) => {
  const newCandidate = request.body;
  try {
    const randomArray = await AdminModel.generateRandomArray(
      newCandidate.numberOfQuestion,
    );
    await AdminModel.createCandidate(newCandidate, randomArray);
    try {
      const candidatePassword = AdminModel.generatePassword();
      console.log(candidatePassword);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(candidatePassword, saltRounds);
      await AdminModel.createUser(newCandidate, hashedPassword);
      const responseBody = ResponseBody(
        200,
        "Candidate created successfully.",
        response
      );
      response.body = responseBody;
    } catch (err) {
      const deletedCandidate = await AdminModel.deleteCandidate(
        newCandidate.userEmail,
      );
      const responseBody = ResponseBody(
        403,
        "Failed to register candidate.",
        response
      );
      response.body = responseBody;
    }
  } catch (err) {
    const responseBody = ResponseBody(500, err.message,response);
    response.body = responseBody;
  }
  next();
};

const editCandidate = async (request, response, next) => {
  const updatedCandidate = request.body;
  try {
    const candidate = await AdminModel.findCandidate(
      updatedCandidate.userEmail,
    );
    if (!candidate) {
      const responseBody = ResponseBody(400, "Candidate is not registered",response);
      response.body = responseBody;
    }
    await AdminModel.updateCandidate(
      updatedCandidate,
      candidate.questionsArray,
    );
    const responseBody = ResponseBody(
      200,
      "Candidate updated successfully.",
      response
    );
    response.body = responseBody;
  } catch (err) {
    const responseBody = ResponseBody(400, "Candidate is not registered.",response);
    response.body = responseBody;
  }
  next();
};

// const getCandidatesHistory = async (request, response, next) => {
//   try {
//     //body check and userEmail
//     const userEmail = request.body.userEmail;
//     const candidateResult = await AdminModel.findCandidateResult(userEmail)

//     if (!candidateResult) {
//       const responseBody = ResponseBody(404, "Candidate has not attempted test",response)
//       response.body = responseBody
//     }
//     else {
//       const responseBody = ResponseBody(200, "Success in retreving history",,response, candidateResult)
//       response.body = responseBody
//     }
//   } catch (err) {
//     const responseBody = ResponseBody(404, "Unable to get candidate history.",response)
//     response.body = responseBody
//   }
//   next()
// };

const getCandidateDetails = async (request, response, next) => {
  const body = request.body;
  try {
    const candidate = await AdminModel.findCandidate(body.userEmail);
    console.log("Candidate data is:", candidate);
    console.log(candidate.firstName);
    const resCandidate = AdminModel.filterCandidateDetail(candidate);
    const responseBody = ResponseBody(
      200,
      "Success in retreving Candidate",
      response,
      resCandidate,
    );
    response.body = responseBody;
  } catch (err) {
    const responseBody = ResponseBody(
      404,
      "Unable to get candidate details.",
      response
    );
    response.body = responseBody;
  }
  next();
};

const getAllCandidates = async (request, response, next) => {
  try {
    const candidateList = await AdminModel.getAllCandidatesList();

    const candidates = AdminModel.filterAllCandidates(candidateList);
    console.log(candidateList);
    const responseBody = ResponseBody(
      200,
      "Successfully Retrieve Candidate List",
      response,
      candidates,
    );
    response.body = responseBody;
  } catch (err) {
    const responseBody = ResponseBody(
      404,
      "Unable to fetch Candidates List.",
      response
    );
    response.body = responseBody;
  }
  next();
};

const deleteCandidate = async (request, response, next) => {
  try {
    const body = request.body;
    const deletedCandidate = await AdminModel.deleteCandidate(body.userEmail);

    if (!deletedCandidate) {
      const responseBody = ResponseBody(404, "Candidate not found",response);
      response.body = responseBody;
    } else {
      const deletedUser = await AdminModel.deleteUser(body.userEmail);
      const responseBody = ResponseBody(
        200,
        "Candidate deleted successfully",
        response
      );
      response.body = responseBody;
    }
  } catch (err) {
    const responseBody = ResponseBody(500, "Internal server error",response);
    response.body = responseBody;
  }
  next();
};

const rescheduleTestAndSendMail = async (request, response, next) => {
  try {
    const body = request.body; //email
    const candidate = await AdminModel.findCandidate(body.userEmail);
    if (!candidate) {
      const responseBody = ResponseBody(404, "Cannot find Candidate",response);
      response.body = responseBody;
    } else {
      const newPassword = AdminModel.generatePassword();
      console.log(newPassword);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const randomArray = await AdminModel.generateRandomArray(
        candidate.numberOfQuestion,
      );
      await AdminModel.updateCandidate(candidate, randomArray);
      await AdminModel.resetCandidateScore(candidate.userEmail);
      await AdminModel.updateUser(candidate, hashedPassword);
      const responseBody = ResponseBody(
        200,
        "Candidate Test Rescheduled Successfully",
        response
      );
      response.body = responseBody;
    }
  } catch (err) {
    const responseBody = ResponseBody(500, "Internal server error",response);
    response.body = responseBody;
  }
  next();
};
const AdminController = {
  handleRegisterCandidate,
  editCandidate,
  // getCandidatesHistory,
  getCandidateDetails,
  deleteCandidate,
  getAllCandidates,
  rescheduleTestAndSendMail,
};

export default AdminController;
