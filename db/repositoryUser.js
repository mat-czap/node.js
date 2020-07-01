const repositoryMongo = require("./repositoryMongo");
const repositoryPostgres = require("./repositoryPostgres");
const modelMongo = require("../db/models/user");
const modelPostgres = require("../SequelizeInit").users;

const TYPE_POSTGRES = "postgres";
const TYPE_MONGODB = "mongo";

class userRepository {

	constructor(type) {
		this.type = type;
		this.repository = this._factoryRepository(this.type);
	}

	//Factory repository
	_factoryRepository(type) {
		if (type === TYPE_MONGODB) {
			return new repositoryMongo(modelMongo);
		}
		if (type === TYPE_POSTGRES) {
			return new repositoryPostgres(modelPostgres);
		}
		throw new Error("please check passing type of database repository.");
	}

	//Public methods

	//->Object (User data)
	async getUser(email) {
		return await this.repository.getUserByEmail(email);
	}
	//->Object (User data)
	async getUser(id) {
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
	//->List[obj]
	async showAllUsers() {
		return await this.repository.showAllUsers();
	}
}

const User = new userRepository("postgres");
module.exports = User;
