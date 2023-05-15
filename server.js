'use strict';

const express = require('express');
const cors = require('cors');
const server = express();
require('dotenv').config();
const pg = require('pg');

server.use(cors());
const PORT = process.env.PORT || 3004;
const apiKey = process.env.APIkey;
server.use(express.json());
let axios = require('axios');
const fs = require('fs');
const { send } = require('process');
const { error } = require('console');

const client = new pg.Client(process.env.DATABASE_URL);

server.get('/trending', trendingHandler);

///////////////////////////////////
function trendingHandler(req, res){
    axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US")
    
    .then(results =>{
        const trMovies = results.data.results.map(trMovies => {
            return {
                id: trMovies.id,
                title: trMovies.title,
                release_date: trMovies.release_date,
                poster_path: trMovies.poster_path,
                overview: trMovies.overview
            }
        });
        res.send(trMovies);
    })
    .catch(error => {
        console.log('sorry, something is wrong...',error)
        res.status(500).send(error);
    })
}



//////////////////////////////////////
// 404:
// server.use(function(req, res){
//     res.status(404).send('page not found...');
// });

function errorHandler(error,req,res){
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}
client.connect()
.then(() => {
    server.listen(PORT, () =>{
        console.log(`port: ${PORT} , ready`)
    })
});