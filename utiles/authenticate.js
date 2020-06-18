const jwt = require("jsonwebtoken");
require("dotenv/config");

function authenticateToken(req, res, next) {
	// getting token from header which equals "Bearer 029309213".It's needed 2nd part.
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null || token == undefined) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN, (err,user ) => {
		if (err) return res.sendStatus(403);
		const {userID} = user 
        req.user = userID;
		next();
	});
}

module.exports.authenticateToken = authenticateToken;
