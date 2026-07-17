const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({

        title: Joi.string().required().messages({
            "string.empty": "Title is required.",
            "any.required": "Title is required."
        }),

        description: Joi.string().required().messages({
            "string.empty": "Description is required.",
            "any.required": "Description is required."
        }),

        location: Joi.string().required().messages({
            "string.empty": "Location is required.",
            "any.required": "Location is required."
        }),

        country: Joi.string().required().messages({
            "string.empty": "Country is required.",
            "any.required": "Country is required."
        }),

        price: Joi.number().required().min(0).messages({
            "number.base": "Price must be a number.",
            "number.min": "Price cannot be less than 0.",
            "any.required": "Price is required."
        }),

        // ✅ Category Added
        category: Joi.string()
            .valid(
                "Trending",
                "Rooms",
                "Castles",
                "Pools",
                "Cities",
                "Mountains",
                "Cafe",
                "Camping",
                "Farms",
                "Arctic",
                "Beaches",
                "Waterfall",
                "Temples",
                "Vihara"
            )
            .required()
            .messages({
                "any.only": "Please select a valid category.",
                "any.required": "Category is required."
            }),

        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().allow("", null)
        }).optional()

    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});