const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),

        //  NEW: Joi now knows image is an object containing a url string
        image: Joi.object({
            url: Joi.string().allow("", null)
        }).allow("", null)
    }).required()
});