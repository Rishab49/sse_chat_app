import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

function generateAccessToken(credentials) {
  return jwt.sign(credentials, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers;

  let token;
  authHeader.cookie &&
    authHeader.cookie.split(" ").forEach((cookie) => {
      cookie.includes("ssecookie") ? (token = cookie.split("=")[1]) : null;
    });


  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    // res.header("Access-Control-Allow-Origin", authHeader.origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
}

async function hashPass(password) {
  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
}

async function verifyPass(string, hash) {
  let isEqual = await bcrypt.compare(string, hash);
  return isEqual;
}

export { generateAccessToken, authenticateToken, hashPass, verifyPass };
