const TYPE_POSTGRES = "postgres";
const TYPE_MONGODB = "mongo";

const repositoryMongo = require("./repositoryMongo");
const repositoryPostgres = require("./repositoryPostgres");
const modelMongo = require("../db/models/user");
const modelPostgres = require("../SequelizeInit");

class repositoryUser {
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
            console.log("factory POSTGRES")
			return new repositoryPostgres(modelPostgres.users);
		}

		throw new Error("please check passing type of User Model.");
	}

	//Public methods
	async getUser(id) {
		return await this.repository.findUser(id);
	}
    async isEmailInDB(email){
        return await this.repository.EmailFound();
    }
	async addUser(obj) {
		return await this.repository.addUser(obj);
	}

	async showAllUsers() {
		return await this.repository.showAllUsers()
	}
}

const User = new repositoryUser("postgres");
module.exports = User;
