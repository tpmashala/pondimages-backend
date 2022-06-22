const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1:27017/pondImagesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Database Connected"))
  .catch(error => console.log(error))
  .finally(() => console.log("...inside finally..."));

module.exports = mongoose;