const dbConfig = require("./pgConfig");
const modelUser = require("./db/models/userPG");
const modelTest = require("./db/models/modelTest");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	port: dbConfig.PORT,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const User = modelUser(sequelize, Sequelize);
const Test = modelTest(sequelize, Sequelize);

User.belongsTo(Test,)

module.exports.User = User;
module.exports.Test = Test;
