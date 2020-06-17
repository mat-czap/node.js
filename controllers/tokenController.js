const jwt = require("jsonwebtoken");
const { generateToken } = require("../utiles/generateToken");

// db for refresh tokens 
let refreshTokens = [];

const sendToDb = data => {
    refreshTokens.push(data);
};

const removeFromDb = data => {
    refreshTokens = refreshTokens.filter(el => el !== data)
    return "ok"
};


const getAccessToken = (req, res) => {
	const refreshToken = req.body.token;
    //check if refreshJWT were passed
	if (refreshToken == null) return res.sendStatus(401);
    
    //check if refreshJWT is in db
    console.log("check in db ",refreshTokens.includes(refreshToken))
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    
    // check token
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, {userID}) => {
        console.log("jwt ver:",userID)
        if (err) return res.sendStatus(403).send(err);
        const accessToken = generateToken(userID);
        res.json({"newAccessToken":accessToken})
	});
};

module.exports.getAccessToken = getAccessToken;
module.exports.sendToDb = sendToDb;
module.exports.removeFromDb = removeFromDb;
