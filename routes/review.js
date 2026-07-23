const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}


// Reviews Routes 
//  Post Reviews route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    // First we get the id of the listing in whcih we have to add review
    let listing = await Listing.findById(req.params.id);
    // We create a newReview, and pass review in it that came from show.ejs
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);

    // console.log("New review saved");
    // res.send("new review saved")
}));

// Delete Reviews Route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

}));

module.exports = router;