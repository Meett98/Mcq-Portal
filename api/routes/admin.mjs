import { Router } from "express";

const AdminRouter = Router();

// Dummy routes for admin
AdminRouter.get("/", (req, res) => {
  res.send("Admin Home Route");
});

AdminRouter.get("/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

AdminRouter.post("/create", (req, res) => {
  res.send("Admin Create Endpoint");
});

export default AdminRouter;
