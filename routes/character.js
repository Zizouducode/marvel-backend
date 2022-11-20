//Imports
const express = require("express");
const router = express.Router();
const axios = require("axios");

//Get characters
router.get("/characters", async (req, res) => {
  try {
    const { limit, skip, name } = req.query;
    // console.log("limit=>", limit);
    //Check if the params in the query exist and build URL
    let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`;
    if (limit) {
      url = url + `&limit=${limit}`;
    }
    if (skip) {
      url = url + `&skip=${skip}`;
    }
    if (name) {
      url = url + `&name=${name}`;
    }
    // console.log("name=>", name);
    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//Get one character
router.get("/character/:id", async (req, res) => {
  try {
    const { characterId } = req.query;
    // console.log("characterId=>", characterId);
    if (characterId) {
      const url = `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`;
      const response = await axios.get(url);
      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({ message: "characterID is missing" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//Export
module.exports = router;
