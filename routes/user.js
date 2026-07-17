const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");
const wrapAsync = require("../utils/wrapAsync");


// Signup Form
router.route("/signup")
.get(userController.renderSignupForm )
.post(wrapAsync(userController.signup));




// Login Form
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);



router.get("/logout",userController.logout);

module.exports = router;