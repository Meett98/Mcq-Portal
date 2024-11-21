// import { decryptPayload } from "../../middlewares/decryptPayload.mjs";
// import { encryptPayload } from "../../middlewares/encryptPayload.mjs";
import verifyToken from "../User/User.VerifyToken.mjs";
import Controller from "./Admin.Controller.mjs";

const {
  handleRegisterCandidate,
  getCandidateDetails,
  editCandidate,
  deleteCandidate,
  getAllCandidates,
  rescheduleTestAndSendMail,
} = Controller;

const AdminRouter = (router) => {
  // Pre-Middlewares
  // router.use(decryptPayload);
  router.use(verifyToken.verifyAdmin); // Middleware to verify admin access

  // Define Routes
  router.post("/register-candidate", handleRegisterCandidate);
  router.post("/get-candidate-details", getCandidateDetails);
  router.post("/edit-candidate", editCandidate);
  router.post("/delete-candidate", deleteCandidate);
  router.get("/get-all-candidates", getAllCandidates);
  router.post("/reschedule-test", rescheduleTestAndSendMail);

  // Post-Middleware
  // router.use(encryptPayload);

  return router;
};

export default AdminRouter;
