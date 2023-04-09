const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const watchlistSchema  = new mongoose.Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: [Number],
    id: Number,
    media_type: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    watched: { type: Boolean, default: false }
});

module.exports = mongoose.model('watchlist ', watchlistSchema);
