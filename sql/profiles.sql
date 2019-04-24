DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles(
    id SERIAL PRIMARY KEY,
    avatar VARCHAR(250),
    placeholder VARCHAR(250),
    user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE
);
