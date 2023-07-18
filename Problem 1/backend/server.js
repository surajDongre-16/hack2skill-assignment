const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const { connection } = require("./config/db");
const UserModel = require("./models/User.module");
const TeamModel = require("./models/Team.module");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/userDetails", async (req, res) => {
  const result = fs.readFileSync("./mock/MOCK-DATA-1.json", {
    encoding: "utf-8",
  });
  const parsed_result = JSON.parse(result);
  parsed_result.forEach(async (item) => {
    try {
      const newUserDetail = new UserModel(item);
      await newUserDetail.save();
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });
  res.send(parsed_result);
});

app.post("/teamDetails", async (req, res) => {
  const result = fs.readFileSync("./mock/MOCK-DATA-2.json", {
    encoding: "utf-8",
  });
  const parsed_result = JSON.parse(result);
  parsed_result.forEach(async (item) => {
    try {
      const newTeamDetail = new TeamModel(item);
      await newTeamDetail.save();
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });
  res.send(parsed_result);
});

app.get("/getuser", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserModel.find({ email });
    const team = await TeamModel.find({ email });

    const data = [...user, ...team];
    const obj = {};
    data.forEach((item) => {
      const {
        full_name = "",
        email = "",
        number = "",
        city = "",
        url = "",
        team_name = "",
      } = item;

      if (!obj["full_name"]) {
        obj["full_name"] = full_name;
      }
      if (!obj[email]) {
        obj["email"] = email;
      }
      if (!obj["number"]) obj["number"] = number;
      if (!obj["city"]) obj["city"] = city;
      if (!obj["url"]) obj["url"] = url;
      if (!obj["team_name"]) obj["team_name"] = team_name;
    });
    res.status(200).send(obj);
  } catch (error) {
    res.status(400).send("Error in fetching the data");
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connected");
    console.log("server started on port 8080");
  } catch (error) {
    console.log("db connection failed", error);
  }
});
