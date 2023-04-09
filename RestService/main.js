const express = require('express')
const service = express()
const getMovies = require('./getMovies');
require('dotenv').config()

service.get('/movies', async (req, res) => {
  try {
    const movies = await getMovies(req, res);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
  service.listen(process.env.PORT)
console.log('Now Server is running on the port:',process.env.PORT);