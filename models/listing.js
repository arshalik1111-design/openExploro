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
      default:
        "https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg",
    },
    url: {
      default:
        "https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg",
      type: String,
      set: (v) =>
        v === " "
          ? "https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
