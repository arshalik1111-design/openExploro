const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/openExploro";
main().then(() => {
    console.log("connection succesful to DB");

}).catch((err) => {
    console.log(err);

})
async function main() {
    await mongoose.connect(MONGO_URL);

}





app.get("/", (req, res) => {
    res.send("Hi I'm root")
});
app.get("/testListing", async(req, res) => {
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
