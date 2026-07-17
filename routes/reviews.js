const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const Review = require("../models/review");
const Listing = require("../models/listing");

const{validateReview, isLoggedIn,isReviewAuthor}=require("../middleware");

const reviewControllers=require("../controllers/reviews");
// Reviews
// POST Route
router.post("/", 
    isLoggedIn,
    validateReview,wrapAsync(reviewControllers.createReview));

//delet rout for review comment
router.delete(
    "/:reviewId", isLoggedIn,isReviewAuthor,
    wrapAsync (reviewControllers.destroyReview)
);

module.exports=router;