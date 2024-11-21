import AdminRouter from "./admin.mjs";
import CandidateRouter from "./candidate.mjs";
import UserRouter from "./user.mjs";

const Routes = [
  { path: "/admin", router: AdminRouter },
  { path: "/user", router: UserRouter },
  { path: "/candidate", router: CandidateRouter },
];

export default Routes;