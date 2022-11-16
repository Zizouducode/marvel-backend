//Imports
const express = require("express");
const router = express.Router();
const axios = require("axios");

//Get comics
router.get("/comics", async (req, res) => {
  try {
    const { limit, skip, title } = req.query;
    // console.log(limit, skip, title);
    //Check if the params in the query exist and build URL
    let url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`;
    if (limit) {
      url = url + `&limit=${limit}`;
    }
    if (skip) {
      url = url + `&skip=${skip}`;
    }
    if (title) {
      url = url + `&title=${title}`;
    }
    const response = await axios.get(url);
    // console.log(response);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//Get comics by character

router.get("/comics/:id", async (req, res) => {
  try {
    const { characterId } = req.query;
    if (characterId) {
      const url = `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`;
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
