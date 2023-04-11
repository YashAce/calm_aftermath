const axios = require('axios');
require('dotenv').config();

const getMovies = async (req, res) => {
  let url;
  if (req.query.id) {
    url = `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.API_KEY}`;
    const response = await axios.get(url);
    return res.json(response.data);
  } else {
    let movieList = [];
    try {
      const cursor = parseInt(req.query.cursor, 10) || 0;
      const count = parseInt(req.query.count, 10) || 10;
      const language = req.query.language;
      const page = parseInt(req.query.page, 10);
      const releaseYear = parseInt(req.query.releaseyear)
      const sortBy = 'vote_average.desc';

      if (page) {
          url = `https://api.themoviedb.org/4/list/1?api_key=${process.env.API_KEY}&page=${page}&sort_by=${sortBy}&language=${language}`;
        const response = await axios.get(url);
        movieList = response.data.results;
        if (releaseYear) {
          movieList = movieList.filter(movie => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate.getFullYear() === releaseYear;
          });
        }
        const results = movieList.slice(cursor, cursor + count);

        const Movies = {
          movies: results,
          next_cursor: cursor + count < movieList.length ? cursor + count : null,
        };
        console.log('Movies:', Movies);

        return res.json(Movies);
      } else {
        const results = movieList.slice(cursor, cursor + count);
        const Movies = {
          movies: results,
          next_cursor: cursor + count < movieList.length ? cursor + count : null,
        };
        console.log('Movies:', Movies);
        return res.json(Movies);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = getMovies;