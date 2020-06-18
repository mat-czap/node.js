
// part not used at the moment 
const jwtDecode = require("jwt-decode");

function timeToExpire(token) {
	const { user_id, iat, exp } = jwtDecode(token);
	const timeToExpire = exp - iat;
	return timeToExpire;
}

function expireTime(token) {
	const { user_id, iat, exp } = jwtDecode(token);
	console.log(new Date(iat),new Date(exp))
}

module.exports.timeToExpire = timeToExpire;
module.exports.expireTime = expireTime;
