//Imports
const express = require("express");
require("dotenv").config();

//Server Creation
const app = express();

//Enable body request and modul cors
app.use(express.json());

//Create Routes

const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

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
