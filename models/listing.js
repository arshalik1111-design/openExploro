const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // The setter should check for an empty string OR an undefined value
      set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
