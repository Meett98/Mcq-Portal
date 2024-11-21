import Controller from './Candidate.Controllers.mjs'
import verifyToken from '../User/User.VerifyToken.mjs'
// import { decryptPayload } from "../../middlewares/decryptPayload.mjs";
// import { encryptPayload } from "../../middlewares/encryptPayload.mjs";
import Controller from "./User.Controller.mjs";

const { 
    questionAnswer
} = Controller

const CandidateRouter = (router) => {
  // Pre-Middleware
  // router.use(decryptPayload);
  router.use(verifyToken.verifyCandidate)

  // Define Routes
  router.post("/questionsAnswer", questionAnswer);

  // Post-Middleware
  // router.use(encryptPayload);

  return router;
};

export default CandidateRouter;