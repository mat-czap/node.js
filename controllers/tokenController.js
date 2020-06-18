const jwt = require("jsonwebtoken");
const {
	generateAccessToken: generateToken,
} = require("../utiles/generateAccessToken");
const Redis = require("ioredis");
const redis = new Redis({ db: 0 });

const sendToDb = async data => {
	if (data == null) throw new Error("token has not been passed");
	try {
		await redis.set(data, "");
	} catch (err) {
		return err;
	}
	return "ok";
};

const removeFromDb = async data => {
	try {
		await redis.del(data);
		return "ok";
	} catch (err) {
		return err;
	}
};

const checkIfKeyExists = async (data) => {
    const key = await redis.exists(data)
	console.log("KEY: ",key)
	return key==1  
}

const getAccessToken = async (req, res) => {
	const refreshToken = req.body.token;
	//check if refreshJWT were passed
	if (refreshToken == null) return res.sendStatus(401);

    //check if refreshJWT is in db
    // TO INTRODUCE NEW FUNC!!! FOR REDIS! 
    const tokenInDB = await checkIfKeyExists(refreshToken)
	if (!tokenInDB) return res.sendStatus(403);

	// check token
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, { userID }) => {
		if (err) return res.sendStatus(403).send(err);
		const accessToken = generateToken(userID);
		res.json({ newAccessToken: accessToken });
	});
};

module.exports.getAccessToken = getAccessToken;
module.exports.sendToDb = sendToDb;
module.exports.removeFromDb = removeFromDb;
