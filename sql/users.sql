DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    avatar VARCHAR(250),
    bio VARCHAR(150),
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
);

DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    uniqcode VARCHAR(250) NOT NULL UNIQUE,
    requester INTEGER,
    receiver INTEGER,
    accepted BOOLEAN NOT NULL,
    statushistory VARCHAR(250)
);
