const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  console.log(mongoose.connection.name);
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  
  await Listing.deleteMany({});

initData.data = initData.data.map((obj) => ({
  ...obj,
  owner: new mongoose.Types.ObjectId("6a521e1809ed6251d46fbd9b"),
}));

console.log("Total Listings:", initData.data.length);

await Listing.insertMany(initData.data);

console.log("Inserted:", await Listing.countDocuments());

console.log("Database Initialized");
};

initDB();