const router = require("express").Router();
const { authenticateToken, } = require("../utiles/authenticate");
const {getUserRole,authRole,showAllUsers,showSingleUser} = require('../controllers/userController')


router.get("/", authenticateToken,getUserRole, authRole(["user"]), showSingleUser);
router.get("/", authenticateToken,getUserRole, authRole(["admin"]),showAllUsers);


module.exports = router;
