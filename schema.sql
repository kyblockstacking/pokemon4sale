CREATE DATABASE pokemon4sale;
USE pokemon4sale;

CREATE TABLE pokemons (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
pokemon_name VARCHAR(100) NOT NULL,
pokemon_type VARCHAR (50) NOT NULL,
price DECIMAL (4,2) NOT NULL,
stock_quanity INTEGER NOT NULL
);

DESCRIBE pokemons;

INSERT INTO pokemons SET
pokemon_name = "bulbasaur",
pokemon_type = "grass",
price = 5.00,
stock_quanity = 4;

INSERT INTO pokemons SET
pokemon_name = "ivysaur",
pokemon_type = "grass",
price = 10.00,
stock_quanity = 2;

INSERT INTO pokemons SET
pokemon_name = "venusaur",
pokemon_type = "grass",
price = 15.00,
stock_quanity = 1;

SELECT * FROM pokemons;

INSERT INTO pokemons SET
pokemon_name = "charmander",
pokemon_type = "fire",
price = 10.00,
stock_quanity = 5;

INSERT INTO pokemons SET
pokemon_name = "charmeleon",
pokemon_type = "fire",
price = 20.00,
stock_quanity = 10;

INSERT INTO pokemons SET
pokemon_name = "charizard",
pokemon_type = "fire",
price = 50.00,
stock_quanity = 2;

SELECT * FROM pokemons;

INSERT INTO pokemons SET
pokemon_name = "squirtle",
pokemon_type = "water",
price = 7.50,
stock_quanity = 5;

INSERT INTO pokemons SET
pokemon_name = "wartortle",
pokemon_type = "water",
price = 12.00,
stock_quanity = 5;

INSERT INTO pokemons SET
pokemon_name = "blastoise",
pokemon_type = "water",
price = 30.75,
stock_quanity = 1;

SELECT * FROM pokemons;

INSERT INTO pokemons SET
pokemon_name = "pikachu",
pokemon_type = "electric",
price = 99.99,
stock_quanity = 1;