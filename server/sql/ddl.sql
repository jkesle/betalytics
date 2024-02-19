DROP DATABASE IF EXISTS betalytics;
CREATE DATABASE IF NOT EXISTS betalytics;
USE betalytics;

CREATE TABLE team (
team_id CHAR(3) PRIMARY KEY,
team_city VARCHAR(25) NOT NULL,
team_suffix VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS player (
player_id INT PRIMARY KEY,
team_id CHAR(3) NOT NULL,
player_firstname VARCHAR(35) NOT NULL,
player_lastname VARCHAR(35) NOT NULL,
player_position ENUM('GUARD', 'FORWARD', 'CENTER', 'GUARD-FORWARD', 'FORWARD-CENTER') NULL,
FOREIGN KEY (team_id) REFERENCES team(team_id)
);

CREATE TABLE IF NOT EXISTS game (
game_id INT PRIMARY KEY,
team_a_id CHAR(3) NOT NULL,
team_b_id CHAR(3) NOT NULL,
game_date timestamp NOT NULL,
FOREIGN KEY (team_a_id) REFERENCES team(team_id),
FOREIGN KEY (team_b_id) REFERENCES team(team_id)
);

CREATE TABLE IF NOT EXISTS prop (
prop_id INT NOT NULL,
player_id INT NOT NULL,
game_id INT NOT NULL,
prop_category ENUM('POINTS', 'REBOUNDS', 'ASSISTS') NOT NULL,
prop_line DOUBLE NOT NULL,
prop_line_original DOUBLE NOT NULL,
prop_last_modified TIMESTAMP NULL,
FOREIGN KEY (player_id) REFERENCES player(player_id),
FOREIGN KEY (game_id) REFERENCES game(game_id)
);


