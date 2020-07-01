const router = require("express").Router();
const {
	registerUser,
	loginUser,
	logoutUser
} = require("../controllers/userController");
const { getAccessToken } = require("../controllers/tokenController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/token", getAccessToken);
router.delete("/logout", logoutUser);

module.exports = router;
