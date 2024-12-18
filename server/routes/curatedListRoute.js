const {
  createCuratedList,
  updateCuratedList,
} = require("../controllers/curatedListController");
const saveToCuratedList = require("../controllers/curatedListItemController");
const express = require("express");
const router = express.Router();

router.post("/curated-lists", createCuratedList);
router.put("/curated-lists/:curatedListId", updateCuratedList);
router.post("/movies/curated-list",saveToCuratedList);

module.exports = router;
