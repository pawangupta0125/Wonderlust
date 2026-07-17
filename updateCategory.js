const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
}

main()
.then(updateCategories)
.catch(console.log);

async function updateCategories() {

    const listings = await Listing.find({});

    for (let listing of listings) {

        const title = listing.title.toLowerCase();

        if (title.includes("beach")) {
            listing.category = "Beaches";
        }

        else if (title.includes("mountain") || title.includes("ski")) {
            listing.category = "Mountains";
        }

        else if (title.includes("cabin")) {
            listing.category = "Rooms";
        }

        else if (title.includes("villa")) {
            listing.category = "Pools";
        }

        else if (title.includes("castle")) {
            listing.category = "Castles";
        }

        else if (
            title.includes("apartment") ||
            title.includes("loft") ||
            title.includes("city")
        ) {
            listing.category = "Cities";
        }

        else if (
            title.includes("cottage") ||
            title.includes("treehouse")
        ) {
            listing.category = "Camping";
        }

        else if (title.includes("farm")) {
            listing.category = "Farms";
        }

        else {
            listing.category = "Trending";
        }

        await listing.save();
    }

    console.log("✅ All Categories Updated Successfully");

    mongoose.connection.close();
}