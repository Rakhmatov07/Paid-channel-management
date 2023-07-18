const Joi = require('joi');

const validateRegistration = (firstname, lastname, username, phone_number) => {
    const registerSchema = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        username: Joi.string().alphanum().min(3).required(),
        phone_number: Joi.string().regex(/^\+\d{12}$/).required()
    });

    const {error} = registerSchema.validate({firstname, lastname, username, phone_number});
    return error ? error.message : false;
};

const validatelogin = (username, phone_number) => {
    const loginSchema = Joi.object({
        username: Joi.string().alphanum().min(3).required(),
        phone_number: Joi.string().regex(/^\+\d{12}$/).required()
    });

    const {error} = loginSchema.validate({username, phone_number});
    return error ? error.message : false;
}

module.exports = {
    validateRegistration,
    validatelogin
}