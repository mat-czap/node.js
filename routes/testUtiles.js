const router = require("express").Router();
const {dropDB} = require("../controllers/userTestController");

router.delete("/dropDB", dropDB);

module.exports = router;
