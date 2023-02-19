const express = require("express");
const { UserModel } = require("../model/User.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) res.send({ status: "Something went wrong", err: "err.message" });
      else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ "status": "New user has been register" });
      }
    });
  } catch (err) {
    res.send({ status: "Something went wrong", err: "err.message" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, process.env.secretKey);
          res.send({ status: "Logged in", token: token });
        } else {
          res.send({ msg: "Wrong Crendentials" });
        }
      });
    } else {
      res.send({ status: "Wrong Crendentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  userRouter
};
