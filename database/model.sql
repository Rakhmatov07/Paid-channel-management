CREATE DATABASE sampledb;

CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    username VARCHAR(32) NOT NULL UNIQUE,
    phone_number VARCHAR(13) NOT NULL UNIQUE,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CHECK (length(phone_number) = 13)
);

CREATE TABLE channels(
    channel_id SERIAL NOT NULL PRIMARY KEY,
    channel_name VARCHAR(64) NOT NULL,
    balance INT DEFAULT 0,
    pay_amount INT NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY(owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE channel_user (
    channel_user_id SERIAL NOT NULL PRIMARY KEY,
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    active BOOLEAN DEFAULT false,
    status VARCHAR(16) DEFAULT 'user',
    start_date_of_subscribtion DATE DEFAULT CURRENT_DATE,
    end_date_of_subscribtion DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
    FOREIGN KEY(channel_id) REFERENCES channels(channel_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE cards(
    card_id SERIAL NOT NULL PRIMARY KEY,
    card_number VARCHAR(16) NOT NULL,
    balance INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);










