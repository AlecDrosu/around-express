const router = require("express").Router();
const { getCards, getCard } = require("../controllers/cards");

router.get("/cards", getCards);
router.get("/cards/:id", getCard);

module.exports = router;
