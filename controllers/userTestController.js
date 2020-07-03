const db = require("../SequelizeInit");

const dropDB = async (req, res) => {
    try {
		await db.users.destroy({ truncate: true, cascade: true, restartIdentity: true  });
		res.status(200).send("data removed");
	} catch (err) {
		console.log(err);
	}
};

module.exports.dropDB = dropDB;
