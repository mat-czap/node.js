module.exports = class repositoryPostgres {
	constructor(model) {
		this.model = model;
	}

	async showAllUsers() {
		console.log("showing all users from POSTGRES_DB is proccessing...");
		const allUsers = await this.model.findAll();
        return allUsers;
	}
};
