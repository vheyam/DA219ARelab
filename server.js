// import modules for the app, including Express for building the server 
// Mongoose for interacting with the MongoDB database 
// and the Album model from the ./model/album

const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const Album = require("./model/album");
const app = express();

// load config dotenv to load the environment variables from the .env file in the ./config directory
// which contains sensitive information such as the MongoDB URI.

dotenv.config({ path: './config/.env'})

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

// add middleware functions parsing of incoming requests with JSON payloads, serving of static files from ./public not used
app.use(express.json());
app.use(express.static('public'));

// get all albums
// retrieves all albums from the database using the Album.find() method
// and sends the response as a JSON object with the res.json() method. 
// If there's an error, it sends an HTTP 500 error status code with an error message using res.status().send().
app.get('/api/albums', function (req, res) {
  Album.find({})
    .then(albums => {
      res.json(albums);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal server error');
    });
});

// get album by title requests to /api/albums/:title
// retrieves an album from the database by the title field 
// using the Album.findOne() method and sends the response as a JSON object 
// if the album is found. If the album is not found, it sends an HTTP 404 error status code
// with an error message. If there's a server error, 
// send an HTTP 500 error status code with an error message.


app.get('/api/albums/:title', function (req, res) {
  const title = req.params.title;
  Album.findOne({ title })
    .then(album => {
      if (album) {
        res.json(album);
      } else {
        res.status(404).send('Album not found status code - 404');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal server error');
    });
});

// create new album
app.post('/api/albums', function (req, res) {
  const album = new Album(req.body);
  album.save()
    .then(album => {
      res.json(album);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal server error');
    });
});



// Update album
app.put('/api/albums/:id', (req, res) => {
  Album.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
      },
    },
    { new: true }
  )
    .then((album) => {
      res.json(album);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// DELETE an album
function deleteAlbum(req,res,id) {


  Album.findOneAndDelete({ id:id })
    .then(() => {
      res.send('Album deleted');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
};



app.delete('/api/albums/:id', function(req,res){
  const id = req.params.id;
  deleteAlbum(req,res,id);
});




const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
