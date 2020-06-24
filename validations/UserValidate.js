const Joi = require("@hapi/joi");

// register validation
const registerValidation = (passingValues) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
		role: Joi.string().valid('admin','user')
	});

    const { error } = schema.validate(passingValues)
    if (error) throw error.details[0].message;
};

// login validation
const loginValidation = passingValues => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

    const { error } = schema.validate(passingValues);
    if (error) throw error.details[0].message;    
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
