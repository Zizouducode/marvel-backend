//Imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

//Server Creation
const app = express();

//Enable body request and modul cors
app.use(express.json());
app.use(cors());

//Connect DB
mongoose.connect(process.env.MONGODB_URI);

//Create Routes

const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "This website is going to be live soon !" });
});

app.all("*", (req, res) => {
  res.status(400).json({ error: "This route does not exist" });
});

//Start Server
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
