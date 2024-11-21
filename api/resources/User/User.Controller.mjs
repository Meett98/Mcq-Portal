import { ResponseBody } from "../../../utils/responseHandler.mjs"

import UserModel from "./User.Model.mjs";

const handleAdminLogin = async (request, response, next) => {
  const { body } = request;
  const user = await UserModel.handleLogin(body);
  console.log("User Data is: ", user);

  if (!user) {
    const responseBody = new ResponseBody(400, "Invalid email or password",response);
    response.body = responseBody;
  } else if (user.role !== "admin") {
    const responseBody = new ResponseBody(
      403,
      "User is forbidden to access this page.",
      response
    );
    response.body = responseBody;
  } else {
    const token = await UserModel.generateToken(user);
    response.cookie("auth-token", token, { httpOnly: true, maxAge: 3600000 });
    const data = {
      role: user.role,
      token: token,
    };
    const responseBody = new ResponseBody(
      200,
      "Welcome! User Logged In Succesfully",
      response,
      data,
    );
    response.body = responseBody;
  }
  next();
};

const handleCandidateLogin = async (request, response, next) => {
  const { body } = request;
  const user = await UserModel.handleLogin(body);

  if (!user) {
    const responseBody = new ResponseBody(400, "Invalid email or password",response);
    response.body = responseBody;
  } else if (user.role !== "candidate") {
    const responseBody = new ResponseBody(
      403,
      "User is forbidden to access this page.",
      response
    );
    response.body = responseBody;
  } else {
    const candidate = await UserModel.getCandidate(user.userEmail);
    if (candidate.testAttempted) {
      const responseBody = new ResponseBody(
        404,
        "User has Already Attempted Test",
        response
      );
      response.body = responseBody;
    } else {
      await UserModel.updateCandidateTestStatus(user.userEmail);
      const token = await UserModel.generateToken(user);
      response.cookie("auth-token", token, { httpOnly: true, maxAge: 3600000 });
      const data = await UserModel.getCandidateData(candidate, user, token);
      const responseBody = new ResponseBody(
        200,
        "Welcome! User Logged In Succesfully",
        response,
        data,
      );
      response.body = responseBody;
    }
  }
  next();
};

const UserController = {
  handleAdminLogin,
  handleCandidateLogin,
};

export default UserController;
