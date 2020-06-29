const dbConfig = require("./pgConfig");

const modelUser = require("./db/models/userPG");
const modelPassport = require("./db/models/passportPG");


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

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.users = modelUser(sequelize, Sequelize);
db.passports = modelPassport(sequelize, Sequelize);

// /relations
db.passports.belongsTo(db.users)

module.exports = db;
