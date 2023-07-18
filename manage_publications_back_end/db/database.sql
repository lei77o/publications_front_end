CREATE DATABASE IF NOT EXISTS publications_db;

USE publications_db;

CREATE TABLE user(
    id INT(11) NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) DEFAULT NULL,
    lastName VARCHAR(45) DEFAULT NULL,
    email VARCHAR(100),
    PRIMARY KEY (id)
)

DESCRIBE user;

INSERT INTO user VALUES ( 1, 'Leonardo', 'Albrecht', 'albrecht.leo@gmail.com')