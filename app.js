const express = require("express");
const multer = require("multer");
const app = express();

const mongoose = require("./database/mongoose");

//imported Models
const PondImage = require("./database/model/pondimage");

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true);
    } else{
        cb(new Error('the image type you are trying to save is invalid. try a .jpeg or .png.'), false);
    }
    
    
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, "./pondImages/")},
    filename: (request, file, cb) =>{
        ext = file.mimetype.split('/')[1];
        extendedFileName = new Date().toISOString()+"_"+file.originalname + "."+ext
        cb(null, extendedFileName);
    }
})

const imageUploads = multer({storage: storage, limits:{fileSize: 1024 * 1024 * 10}, fileFilter: fileFilter});
//multer({dest:'pondImages/'});


app.use('/pondImages', express.static('pondImages'));

app.use(express.json());
 
/**
 * enable CORS
 */
 app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  //retreive all the pondimage stored in the database
app.get("/api/v1/pondimage", (request, response) => {
    PondImage.find({})
      .then(pondimage => response.send(pondimage))
      .catch(error => console.log(error));
  });

//save a pondimage to the database
app.post("/api/v1/pondimage", imageUploads.single("capturedPondImage"), (request, response) => {
    
    new PondImage({
      _id: new mongoose.Types.ObjectId(),
      capturedPondImage: request.file.path,
      capturedTimestamp: request.body.capturedTimestamp
    })
      .save()
      .then(pondimage => response.send())
      .catch(err =>
        console.log("there was an error saving the image in the db", err)
      );
  });

  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {console.log(process.PORT);
    console.log(`Server Connected on port ${PORT}`)});