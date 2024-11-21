import { Router } from "express";
import CandidateRouter from "../resources/Candidate/Candidate.Router.mjs";

const router = Router();
CandidateRouter(router); // Pass the router instance

export default router;
