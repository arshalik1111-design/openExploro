const express = require("express");
const app = express();

process.setMaxListeners(20); // Increase from 10 to 20


const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const ejsMate = require("ejs-mate");
const path = require("path");
app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");


const { listingSchema } = require("./schema.js");
const review = require("./models/review.js");
const { log } = require("console");
const MONGO_URL = "mongodb://127.0.0.1:27017/openExploro";
main()
  .then(() => {
    console.log("connection succesful to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, error);
  } else {
    next();
  }
}


//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
}));
//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {

  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");


}));
//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));
//Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));


// Reviews Route 

app.post("/listings/:id/reviews", async (req, res) => {
  // First we get the id of the listing in whcih we have to add review
  let listing = await Listing.findById(req.params.id);
  // We create a newReview, and pass review in it that came from show.ejs
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  res.redirect("/listings");

  // console.log("New review saved");
  // res.send("new review saved")

})
app.get("/", (req, res) => {
  res.send("Hi I'm root");
});
// app.get("/testListing", wrapAsync(async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     descripttion: "Simple and sleek with a garden",
//     price: 1200,
//     location: "Near Bengalore Palace",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("Successful testing");
// }));


app.all("*splat", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
})
app.use((err, req, res, next) => {
  // Set default values in case err.statusCode or err.message are missing
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.render("error.ejs", { message });
  // res.status(statusCode).send(message);
});
app.listen("8080", () => {
  console.log("server is listning to port 8080");
});
