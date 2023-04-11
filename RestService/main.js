const express = require('express');

const service = express();
const getMovies = require('./getMovies');
const WatchlistEdit = require('./watchlistEdit');
const cors = require('cors');
require('dotenv').config();

service.use(cors());

const watchlistEditor = new WatchlistEdit();

service.get('/movies', async (req, res) => {
  try {
    const movies = await getMovies(req, res);
    return movies;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

service.post('/addmovie', async (req, res) => {
  try {
    const addMovie = await watchlistEditor.addMovie(req, res);
    return addMovie;
  } catch (error) {
    console.error(error);
  }
});

service.get('/getwatchlistmovies', async (req, res) => {
  try {
    const getAllMovies = await watchlistEditor.getWatchlistMovies(req, res);
    return getAllMovies;
  } catch (error) {
    console.error(error);
  }
});

service.patch('/updatewatchlistmovie', async (req, res) => {
  try {
    const updateWatchlistMovie = await watchlistEditor.updateWatchlistMovie(req, res);
    return updateWatchlistMovie;
  } catch (error) {
    console.error(error);
  }
});

service.delete('/deletewatchlistmovie', async (req, res) => {
  try {
    const deleteWatchlistMovie = await watchlistEditor.deleteWatchlistMovie(req, res);
    return deleteWatchlistMovie;
  } catch (error) {
    console.error(error);
  }
});

service.listen(process.env.PORT);
console.log('Now Server is running on the port:', process.env.PORT);
