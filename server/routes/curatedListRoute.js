const {
  createCuratedList,
  updateCuratedList,
} = require("../controllers/curatedListController");
const express = require("express");
const router = express.Router();

router.post("/", createCuratedList);
router.put("/:curatedListId", updateCuratedList);

module.exports = router;
