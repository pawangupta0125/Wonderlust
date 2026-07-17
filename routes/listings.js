const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");

const Listing = require("../models/listing");
const { isLoggedIn,isOwner,validateListing } = require("../middleware");
const listingController = require("../controllers/listings");


const multer  = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage });


//index and creat route
router.route("/")
.get( wrapAsync(listingController.index))
.post(
     isLoggedIn,
  
    upload.single('listing[image]'),
      validateListing,
    wrapAsync(listingController.createListing),
);



// ================= NEW ROUTE =================
router.get("/new", isLoggedIn,listingController.renderNewForm);

//show put and delet
router.route("/:id")
.get(
     isLoggedIn,
     wrapAsync(listingController.showListing))
.put(
     isLoggedIn,
     isOwner,
      upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListings)
)
.delete(
     isLoggedIn,isOwner,
     wrapAsync(listingController.destroyListing));




// ================= EDIT ROUTE =================

router.get("/:id/edit", 
     isLoggedIn,isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;