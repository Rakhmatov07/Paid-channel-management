const Joi = require('joi');

const validateCard = (card_number, balance) => {
    try {
        const cardSchema = Joi.object({
            card_number: Joi.number().greater(1000000000000000).required(),
            balance: Joi.number()
        });
    
        const {error} = cardSchema.validate({card_number, balance});
        return error ? error.message : false;
    } catch (error) {
        console.log(error);
    }
};

module.exports = validateCard;