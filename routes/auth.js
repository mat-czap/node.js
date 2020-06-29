const router = require("express").Router();
const { registerUser, loginUser, logoutUser,repoPatternTestShowAllUser } = require("../controllers/userController");
const { getAccessToken } = require("../controllers/tokenController");

router.get  ("/test", repoPatternTestShowAllUser);


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/token", getAccessToken);
router.delete("/logout", logoutUser);

module.exports = router;
