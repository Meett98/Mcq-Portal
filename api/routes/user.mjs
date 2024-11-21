import { Router } from "express";
import UserRouter from "../resources/User/User.Router.mjs";

const router = Router();
UserRouter(router); // Pass the router instance

export default router;
