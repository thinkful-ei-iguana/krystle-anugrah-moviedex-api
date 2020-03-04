/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';

const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data.json');

//console.log(process.env.API_TOKEN);
const app = express();
app.use(morgan(morganSetting));
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


app.get('/movie', function handleGetMovie(req, res) {
  let response = MOVIES;

    if (req.query.genre) {
        console.log(req.query.genre);
        movieResults = movieResults.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase().replace('_', ' '))
        );
    }

    if (req.query.country) {
        movieResults = movieResults.filter(movie => 
            movie.country.toLowerCase().includes(req.query.country.toLowerCase().replace('_', ' '))
        );
    }

    if (req.query.avg_vote) {
        movieResults = movieResults.filter(movie => 
          movie.avg_vote >= req.query.avg_vote
        );
    }
    
    res.json(movieResults);
})

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
})

const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
  })