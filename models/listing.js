const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: String,
        url: String,
    },

    price: Number,

    location: String,

    country: String,

    // ================= CATEGORY =================

    category: {
        type: String,
        enum: [
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
            "Vihara",
        ],
        default: "Trending",
    },

    // ================= REVIEWS =================

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    // ================= OWNER =================

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});

// Delete all reviews when listing is deleted

listingSchema.post("findOneAndDelete", async (listing) => {

    if (listing) {

        await Review.deleteMany({
            _id: {
                $in: listing.reviews,
            },
        });

    }

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;