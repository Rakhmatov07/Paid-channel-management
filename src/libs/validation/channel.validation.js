const Joi = require('joi');

const validateChannel = (channel_name, balance, pay_amount) => {
    try {
        const channelSchema = Joi.object({
            channel_name: Joi.string().max(32).required(),
            balance: Joi.number(),
            pay_amount: Joi.number().required()
        });
    
        const {error} = channelSchema.validate({channel_name, balance, pay_amount});
        return error ? error.message : false;    
    } catch (error) {
        console.log(error);
    };
};


module.exports = validateChannel;