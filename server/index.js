import express from "express";
import cors from "cors";
import short from "short-uuid";
import { Room, User } from "./class.js";
import multer from "multer";
import { UserModel, sequelize } from "./model.js";
import bcrypt from "bcrypt";
import {
  authenticateToken,
  generateAccessToken,
  hashPass,
  verifyPass,
} from "./methods.js";

//variables
let app = express();
let rooms = [];
const upload = multer();

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.43.62:5173"],
    credentials: true,
  })
);
app.use(express.json());

//routes

app.post("/login", upload.none(), async (req, res) => {
  const { userID, password } = req.body;
  const user = await UserModel.findAll({ where: { userID: userID } });
  // console.log(user);

  if (user.length > 0) {
    const isEqual = await verifyPass(password, user[0].dataValues.password);
    const token = generateAccessToken({
      userID: userID,
      name: user[0].dataValues.username,
    });
    // console.log(`token:${token}`);
    if (isEqual) {
      res.statusCode = 200;
      res.cookie("ssecookie", token, {
        httpOnly: true,
      });
      res.redirect(
        `http://${req.hostname}:5173/join/${userID}/${user[0].dataValues.username}`
      );
    } else {
      res.statusCode = 404;
      res.redirect(`http://${req.hostname}:5173/404/invalid_user`);
    }
  } else {
    res.statusCode = 404;
    res.redirect(`http://${req.hostname}:5173/404/invalid_user`);
  }
});

app.post("/create", upload.none(), async (req, res) => {
  const { userID, username, password } = req.body;
  const hashedPass = await hashPass(password);
  const token = generateAccessToken({
    userID: userID,
  });
  // console.log(`token:${token}`);
  await UserModel.create({
    username: username,
    password: hashedPass,
    userID: userID,
  }).catch((err) => console.error(err));

  res.statusCode = 200;
  res.cookie("ssecookie", token, {
    httpOnly: true,
    secure: true,
  });
  res.redirect(`http://${req.hostname}:5173/join/${userID}/${username}`);
});

app.get("/room/create", authenticateToken, (req, res) => {
  const token_user = req.user;
  let roomID = short.generate();
  let userID = token_user.userID;
  let name = token_user.name;
  let room = new Room(roomID, []);
  let user = new User(userID, name, res);

  room.addUser(user);
  rooms.push(room);

  const data = JSON.stringify({ type: "ID", roomID: roomID });
  res.send(data);
});

app.get("/room/join/:roomID/:userID/:name", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  let roomID = req.params["roomID"];
  let userID = req.params["userID"];
  let name = req.params["name"];
  let room = rooms.filter((room) => room.roomID == roomID)[0];
  let user = new User(userID, name, res);

  if (room) {
    room.addUser(user);
    res.writeHead(200, headers);
    res.write(
      "data: " +
        JSON.stringify({ type: "ID", roomID: roomID, msgs: room.messages }) +
        "\n\n"
    );
  } else {
    let roomID = short.generate();
    let user = new User(userID, res);
    room = new Room(roomID, [user]);
    rooms.push(room);
    res.writeHead(200, headers);
    res.write(
      "data: " +
        JSON.stringify({ type: "ID", roomID: roomID, msgs: room.messages }) +
        "\n\n"
    );
    // res.statusCode = 404;
    // res.send({ msg: "Join failed" });
  }
});

app.post("/room/msg/:roomID/:userID/:name", (req, res) => {
  let roomID = req.params["roomID"];
  let userID = req.params["userID"];
  let name = req.params["name"];
  let msg = req.body.msg;
  // console.log(req.body);
  rooms.forEach((room) => {
    if (room.roomID == roomID) {
      let user = room.users.filter((user) => user.userID == userID)[0];
      if (user) {
        let time = new Date();
        room.addMessage({
          userID: userID,
          msg: msg,
          time: time,
          name: name,
        });
        room.users.forEach((user) =>
          user.res.write(
            "data: " +
              JSON.stringify({
                type: "MSG",
                msg: msg,
                userID: userID,
                time: time,
                name: name,
              }) +
              "\n\n"
          )
        );
      } else {
      }
    }
  });
  res.send({ msg: "success" });
});

app.get("/create/userID", (req, res) => {
  let userID = short.generate();
  res.statusCode = 200;
  res.send({ msg: userID });
});

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
