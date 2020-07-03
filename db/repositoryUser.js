require("dotenv/config");
const repositoryMongo = require("./repositoryMongo");
const repositoryPostgres = require("./repositoryPostgres");
const modelMongo = require("../db/models/user");
const { users: modelPostgres } = require("../SequelizeInit");

const DB_MODEL = process.env.USER_DB_NAME;

class userRepository {
	constructor(userDB) {
		this.userDB = userDB;
		this.repository = this._factoryRepository(this.userDB);
	}

	//Factory repository
	_factoryRepository(userDB) {
		const TYPES = {
			POSTGRES: "postgres",
			MONGODB: "mongo",
		};

		if (userDB === TYPES.MONGODB) {
			return new repositoryMongo(modelMongo);
		}
		if (userDB === TYPES.POSTGRES) {
			return new repositoryPostgres(modelPostgres);
		}
		throw new Error(
			`Wrong argument in _factoryRepository, passed: ${userDB}, should be one of: ${Object.values(TYPES)}.`
		);
	}

	//Public methods

	//->Object (User data)
	async getUserByEmail(email) {
		return await this.repository.getUserByEmail(email);
	}
	//->Object (User data)
	async getUserById(id) {
		return await this.repository.getUserById(id);
	}
	//->Boolean
	async isEmailTaken(email) {
		return await this.repository.EmailFound(email);
	}
	//->void
	async addUser(obj) {
		return await this.repository.addUser(obj);
	}
	//->List[obj] (User data)
	async showAllUsers() {
		return await this.repository.showAllUsers();
	}
}

module.exports = new userRepository(DB_MODEL);
