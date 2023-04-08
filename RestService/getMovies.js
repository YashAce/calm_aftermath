const express = require('express')
const getMovies = express()
const axios = require('axios');
require('dotenv').config()

getMovies.get('/movies', async (req, res) => {
    let movieList = []
    try {
        const cursor = parseInt(req.query.cursor) || 0;
        const count = parseInt(req.query.count) || 10;
        const sortBy = req.query.sort_by || 'release_date';
        const sortDirection = req.query.sort_direction || 'asc';
        const page = parseInt(req.query.page) || 1;
        let url;
        if(page){
            url = `https://api.themoviedb.org/4/list/1?api_key=${process.env.API_KEY}&page=${page}`
        const response = await axios.get(url)
        movieList = response.data.results
        const results = movieList.slice(cursor, cursor + count);

        results.sort((a, b) => {
            if (sortDirection === 'asc') {
              return a[sortBy] - b[sortBy];
            } else {
              return b[sortBy] - a[sortBy];
            }
        });

        const Movies = {
            movies: results,
            next_cursor: cursor + count < movieList.length ? cursor + count : null,
        };
        console.log("Movies:", Movies)

        res.json(Movies);
        }else{
            const results = movieList.slice(cursor, cursor + count);
            const Movies = {
                movies: results,
                next_cursor: cursor + count < movieList.length ? cursor + count : null,
            };

            res.json(Movies);
            console.log("Movies:", Movies)
        }

    } catch (error) {
      console.error(error)
    }
  })
getMovies.listen(process.env.PORT)
console.log('Now Server is running on the port:',process.env.PORT);