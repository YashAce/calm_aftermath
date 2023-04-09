const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const WatchlistSchema = require('./movieSchema');


class watchlistEdit {
    constructor() {
        const uri = process.env.MONGODB_URI
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect();
        const db = client.db("test");
        this.col = db.collection("watchlist");
    }
    
    addMovie = async (req, res) => {
        try {
            let rawData = '';
           await req.on('data', (chunk) => {
              rawData += chunk;
            });
            const movieData = JSON.parse(rawData);
            const movie = new WatchlistSchema(movieData);

            const insertMovie = await movie.save();
            console.log(insertMovie)
            console.log('Movie added to watchlist');
            res.status(200).send('Movie added to watchlist!');

        } catch (err) {
            console.error(err);
            res.status(500).send('Error adding movie to watchlist.');
        }
    }

    getWatchlistMovies = async (req, res) => {
        try {
            const watchlistmovies = await WatchlistSchema.find({});
            console.log("Found the following records");
            console.log(watchlistmovies.length);
            res.status(200).send(watchlistmovies);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getting watchlist movies.');
        }
    }

    updateWatchlistMovie = async (req, res) => {
        const id = req.query.id
        try {
            const movie = await WatchlistSchema.findById(id);
            const updatedWatchedValue = !movie.watched;
            const updatewatchlistmovie = await WatchlistSchema.findByIdAndUpdate(id, { watched : updatedWatchedValue });
            res.status(200).send(updatewatchlistmovie);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error updating watchlist movie.');
        }
    }   


    deleteWatchlistMovie = async (req, res) => {
        const id = req.query.id
        try {
            const movie = await WatchlistSchema.findById(id);
            if(movie){
                const deletemovie = await WatchlistSchema.findByIdAndDelete(id);
                console.log(deletemovie)
                res.status(200).send("Deleted successfully");
            }else{
                res.status(404).send("Movie not found");
            }
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error deleting watchlist movie.');
        }
    }   
    
}   

module.exports = watchlistEdit;


