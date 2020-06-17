const router = require("express").Router();
const { authenticateToken } = require("../utiles/authenticate");

router.get("/", authenticateToken, (req, res) => {
    res.json({"userID":req.user});
});

module.exports = router;
