//Imports
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const uid2 = require("uid2");
const User = require("../models/User");
const encBase64 = require("crypto-js/enc-base64");

//Signup route

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log("username=>", username);

    //Check if username, password and email are filled and !== from empty string

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password need to be filled" });
    }

    //Check if user is existing in DB
    const userToCheck = await User.findOne({
      email: email,
    });

    if (userToCheck) {
      return res.status(409).json({ message: "User already exists" });
    }

    //Create secured password and token
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(64);

    //Create new user
    const newUser = new User({
      email: email,
      username: username,
      token: token,
      salt: salt,
      hash: hash,
    });

    //Save new user
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      token: newUser.token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

///LogIn route
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //Get user
    const userToLogIn = await User.findOne({ email: email });
    console.log("userToLogIn=>", userToLogIn);
    //Check if user exists
    if (!userToLogIn) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //Check if hash is the same
    salt = userToLogIn.salt;
    const hashToCheck = SHA256(password + salt).toString(encBase64);
    if (userToLogIn.hash !== hashToCheck) {
      console.log("je suis ici");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      _id: userToLogIn._id,
      token: userToLogIn.token,
      username: userToLogIn.username,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Export
module.exports = router;
