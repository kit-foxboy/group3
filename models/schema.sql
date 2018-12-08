CREATE DATABASE bomber;

USE Bomber;

CREATE TABLE charactercreation(
    id INT NOT NULL AUTO_INCREMENT,
    playerhashkey VARCHAR (200) NOT NULL,
    charactername VARCHAR(200) NOT NULL,
    characterlevel VARCHAR(200) NOT NULL,
    -- username VARCHAR(200) NOT NUll,
    -- userpassword VARCHAR (10) NOT NULL,
    score VARCHAR (100) NOT NULL,
    PRIMARY KEY(id)
)
