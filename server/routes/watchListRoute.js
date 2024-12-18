const expres = require("express");
const router = expres.Router();
const saveToWatchList = require("../controllers/watchListController");

router.post("/watchlist", saveToWatchList);

module.exports = router;
