const mongoose = require("mongoose");

const PondImageSchema = new mongoose.Schema({
    capturedPondImage: {
      type: String,
      trim: true,
      required: true,
    },
    capturedTimestamp: {
      type: String,
      required: true
    }
});

const PondImage = mongoose.model("PondImage", PondImageSchema, "pondImage");

module.exports = PondImage;