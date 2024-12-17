const expres = require("express");
const router = expres.Router();
const saveToWishList = require("../controllers/wishListController");

router.post("/wishlist", saveToWishList);

module.exports = router;
