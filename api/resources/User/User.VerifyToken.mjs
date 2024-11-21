import jwt from "jsonwebtoken";
const secretToken = "asdfghjklxdcfghjk";

function verifyAdmin(req, res, next) {
  const token = req.headers["authorization"];
  console.log("req is: ", req);
  console.log("headers is: ", req.headers);
  console.log("cookies is: ", req.cookies);
  if (!token) return res.status(401).send("Access Denied");
  try {
    const user = jwt.verify(token, secretToken);

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access Forbidden" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

function verifyCandidate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const user = jwt.verify(token, secretToken);

    if (user.role !== "candidate") {
      return res.status(403).json({ error: "Access Forbidden" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

export default {
  verifyAdmin,
  verifyCandidate,
};
