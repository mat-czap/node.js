const express = require("express");
const router = express.Router();

newUser = require("../controllers/userController");

// router.get("/user", findUsers);

router.post('/', newUser)

module.exports = router;

