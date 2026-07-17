const mongoose = require("mongoose");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// ================= INDEX =================

module.exports.index = async (req, res) => {

    let filter = {};

    // Category Filter
    if (req.query.category) {
        filter.category = req.query.category;
    }

   // Search Filter

if (req.query.search) {

    const keyword = req.query.search.trim();

    filter.$or = [

        {
            title: {
                $regex: keyword,
                $options: "i",
            },
        },

        {
            location: {
                $regex: keyword,
                $options: "i",
            },
        },

        {
            country: {
                $regex: keyword,
                $options: "i",
            },
        },

    ];

}
    const allListings = await Listing.find(filter);

  res.render("listings/index", {
    allListings,
    selectedCategory: req.query.category || null,
    search: req.query.search || "",
});

};

// ================= NEW =================

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

// ================= SHOW =================

module.exports.showListing = async (req, res) => {

    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(404, "Listing you requested does not exist!");
    }

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        throw new ExpressError(404, "Listing you requested does not exist!");
    }

    res.render("listings/show", { listing });

};

// ================= CREATE =================

module.exports.createListing = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.image = {
        url,
        filename,
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");

};

// ================= EDIT =================

module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    res.render("listings/edit", { listing });

};

// ================= UPDATE =================

module.exports.updateListings = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            new: true,
            runValidators: true,
        }
    );

    if (req.file) {

        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };

        await listing.save();

    }

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);

};

// ================= DELETE =================

module.exports.destroyListing = async (req, res) => {

    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");

    res.redirect("/listings");

};