CREATE TABLE beers (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    untappd_beer_id INTEGER NOT NULL,
    beer_name TEXT NOT NULL,
    untappd_rating REAL,
    beer_description TEXT,
    brewery_id INTEGER NOT NULL,
    brewery_name TEXT NOT NULL,
    beer_image TEXT
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    username varchar(20) NOT NULL,
    user_password varchar(20) NOT NULL,
    untappd_user_id varchar(20)
);

CREATE TYPE friend_options AS ENUM (
    'Pending',
    'Friends',
    'Rejected'
);

CREATE TABLE friends (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_1 INTEGER REFERENCES users(id) NOT NULL,
    user_2 INTEGER REFERENCES users(id) NOT NULL,
    friend_status friend_options NOT NULL
);

CREATE TABLE inventory (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    beer_id INTEGER REFERENCES beers(id) NOT NULL,
    quantity INTEGER NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    beer_id INTEGER REFERENCES beers(id) NOT NULL,
    user_rating REAL,
    user_review varchar(200)
);

CREATE TABLE trades (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_send INTEGER REFERENCES users(id) NOT NULL,
    user_received INTEGER REFERENCES users(id) NOT NULL,
    beer_id INTEGER REFERENCES beers(id) NOT NULL,
    date_of_trade TIMESTAMP DEFAULT now()
);

INSERT INTO users (username, user_password)
VALUES 
    ('zzboncak', 'password'),
    ('rileym', 'Password123');