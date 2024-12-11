const getMovies = require("../controllers/getMovies");
const express = require("express");
const router = express.Router();

router.get("/search", getMovies);

module.exports = router;
