module.exports = class repositoryPostgres {
	constructor(model) {
		this.model = model;
	}

	async getUserByEmail(email) {
		if (email === undefined) throw new Error("email not passing");
		const user = await this.model.findOne({
			where: {
				email: email,
			},
			raw: true,
		});
		return user 
	}

	async getUserById(id) {
		if (id === undefined) throw new Error("id not passing");
		const user = await this.model.findOne({
			where: {
				id:id,
			},
			raw: true,
		});
		return user 
	}

	async EmailFound(emailToCheck) {
		if (emailToCheck === undefined) throw new Error("email not passing");
		const user = await this.model.findOne({
			where: {
				email: emailToCheck,
			},
			raw: true,
		});
		if (user === null) {
			return false;
		} else {
			return true;
		}
	}
	async showAllUsers() {
		console.log("showing all users from POSTGRES_DB is proccessing...");
		const allUsers = await this.model.findAll();
		return allUsers;
	}
	async addUser(obj) {
		return await this.model.create(obj);
	}
};
