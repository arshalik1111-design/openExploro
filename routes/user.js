
const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});


router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.flash("success", "Chalo kaha rukna hai ab");
        res.redirect("/listings");
    } catch (e) {

        req.flash("error", e.message);
        res.redirect("/signup");
    }

});

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});


router.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), async (req, res) => {

    req.flash("success", "Login hogya, chalo ab decide karlo kaha rukna hai");

    res.redirect("/listings");


});
router.get("/logout", (req, res, next) => {

    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })

});
module.exports = router;