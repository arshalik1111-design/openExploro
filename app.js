const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017/openExploro";
main().then(() => {
    console.log("connection succesful to DB");

}).catch((err) => {
    console.log(err);

})
async function main() {
    await mongoose.connect(MONGO_URL);

}

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
})
//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

//Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
 let newListing = new Listing(req.body.listing);
 await newListing.save();
res.redirect("/listings");
    
})
app.get("/", (req, res) => {
    res.send("Hi I'm root")
});
app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        descripttion: "Simple and sleek with a garden",
        price: 1200,
        location: "Near Bengalore Palace",
        country: "India",

    });
    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successful testing")

})
app.listen("8080", () => {
    console.log("server is listning to port 8080");
})
