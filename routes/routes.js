/** 

const express = require('express');
const router = express.Router();
const Album = require('./model/album');
const albums = require("/server.js");

// GET all albums
router.get('/albums', (req, res) => {
  Album.find({})
    .then((albums) => {
      res.json(albums);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// GET a single album by title
router.get('/albums/:title', (req, res) => {
  const title = req.params.title;
  Album.findOne({ title })
    .then((album) => {
      if (!album) {
        res.status(404).send('Album not found');
      } else {
        res.json(album);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// POST a new album
router.post('/albums', (req, res) => {
  const { id, title, artist, year } = req.body;
  const album = new Album({
    id,
    title,
    artist,
    year,
  });
  album
    .save()
    .then(() => {
      res.send('Album added');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// PUT (update) an existing album
router.put('/albums/:id', (req, res) => {
  const title = req.params.title;
  Album.findOneAndUpdate(
    { id },
    { $set: req.body },
    { new: true }
  )
    .then(() => {
      res.send('Album updated');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});



// DELETE an album
router.delete('/albums/:title', (req, res) => {
  const title = req.params.title;
  Album.findOneAndDelete({ title })
    .then(() => {
      res.send('Album deleted');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

module.exports = router;

***/