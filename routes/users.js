const router = require("express").Router();
const { getUsers, getProfile } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getProfile);

module.exports = router;
