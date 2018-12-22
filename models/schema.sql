DROP DATABASE IF EXISTS bomber;
CREATE DATABASE bomber;

USE Bomber;

CREATE TABLE players(
    id INT NOT NULL AUTO_INCREMENT,
    playerHashkey VARCHAR (200) NOT NULL,
    playerName VARCHAR(200) NOT NULL,
    currentScore INT NOT NULL,
    highScore INT NOT NULL,
    PRIMARY KEY(id)
)
