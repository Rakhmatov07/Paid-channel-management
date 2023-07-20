const Joi = require('joi');

const validatePost = (title, text) => {
    try {
        postSchema = Joi.object({
            title: Joi.string().min(3).required(),
            text: Joi.string().min(1).required()
        })
    
        const {error} = postSchema.validate({title, text});
        return error ? error.message : false;
    } catch (error) {
        console.log(error);
    }
};

module.exports = validatePost;