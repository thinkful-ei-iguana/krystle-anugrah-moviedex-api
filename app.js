/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data.js');

//console.log(process.env.API_TOKEN);
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');


    console.log(apiToken);
    console.log(authToken);

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized Request' })
    }
    next();
})


app.get('/movie', function getMovie(req, res) {
    let movieResults = movieData;

    if (req.query.genre) {
        movieResults.filter(movie => {
            movie.genre.toLowerCase().includes(`${req.query.genre}`);
        });
    }

    if (req.query.country) {
        movieResults.filter(movie => {
            movie.country.toLowerCase().includes(`${req.query.country}`);
        })
    }

    if (req.query.avg_vote) {
        movieResults.filter(movie => {
            let vote = Number(req.query.avg_vote);
            let avgVote = Number(movie.avg_vote);
            avgVote >= vote;
        })
    }

})


app.listen(8000, () => {
    console.log('Server is listening on port 8000!!');
});