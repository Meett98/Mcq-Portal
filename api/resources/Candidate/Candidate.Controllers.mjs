
import CandidateModel from "./Candidate.Model.mjs";
import { ResponseBody } from "../../../utils/responseHandler.mjs";


const questionAnswer = async (request, response, next) => {
  try {
    const email = request.user.userEmail;
    const { body } = request;
    const queOption = body.selectedOption;
    console.log(queOption);
    try {
      const candidate = await CandidateModel.getCandidate(email);
      if (!candidate) {
        const responseBody = ResponseBody(404, "Candidate not found",response);
        response.body = responseBody;
      }
      else {
        const result = await CandidateModel.getQuestionAndResult(
          email,
          candidate,
          queOption,
        );
        const responseBody = ResponseBody(200, result.message,response, result.data);
        response.body = responseBody;
      }
    } catch (error) {
      const responseBody = ResponseBody(500, error.message,response);
      response.body = responseBody;
    }
  } catch (error) {
    const responseBody = ResponseBody(500, error.message,response);
    response.body = responseBody;
  }
  next()
};


const CandidateController = {
  questionAnswer
};

export default CandidateController;