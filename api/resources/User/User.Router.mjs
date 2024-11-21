// import { decryptPayload } from "../../middlewares/decryptPayload.mjs";
// import { encryptPayload } from "../../middlewares/encryptPayload.mjs";
import Controller from "./User.Controller.mjs";

const { handleAdminLogin, handleCandidateLogin } = Controller;

const UserRouter = (router) => {
  // Pre-Middleware
  // router.use(decryptPayload);

  // Define Routes
  router.post("/candidate-login", handleCandidateLogin);
  router.post("/admin-login", handleAdminLogin);

  // Post-Middleware
  // router.use(encryptPayload);

  return router;
};

export default UserRouter;
