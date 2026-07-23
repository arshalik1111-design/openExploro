const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

// Import Routers
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// Database Connection
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

// View Engine & Static Files Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.get("/", (req, res) => {
  res.send("Hi I'm root");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*splat", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Set default values in case err.statusCode or err.message are missing
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Server Listener
app.listen("8080", () => {
  console.log("server is listning to port 8080");
});
