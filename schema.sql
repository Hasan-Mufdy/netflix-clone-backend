DROP TABLE IF EXISTS favMovies;

CREATE TABLE IF NOT EXISTS favMovies (
    id SERIAL PRIMARY KEY,
    favMovieName VARCHAR(255),
    favMoviePosterPath VARCHAR(255),
    comment VARCHAR(255),
    releaseDate VARCHAR(255)
);