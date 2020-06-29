module.exports = class repositoryMongo {
	constructor(model) {
		this.model = model;
	}

	async showAllUsers() {
		console.log("showing all users from MONGO_DB is proccessing...");
		const allUsers = await this.model.find();
		return allUsers;
	}
};
