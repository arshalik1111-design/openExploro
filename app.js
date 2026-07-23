const express = require("express");
const app = express();
process.setMaxListeners(20); // Increase from 10 to 20
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/Review.js");

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
const { listingSchema, reviewSchema } = require("./schema.js");
const review = require("./models/review.js");
const { log } = require("console");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.get("/", (req, res) => {
  res.send("Hi I'm root");
});


app.all("*splat", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
})
app.use((err, req, res, next) => {
  // Set default values in case err.statusCode or err.message are missing
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});
app.listen("8080", () => {
  console.log("server is listning to port 8080");
});
