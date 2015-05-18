CREATE DATABASE live_users;

USE live_users;

CREATE TABLE users(
   users_id INT NOT NULL AUTO_INCREMENT,
   user_username VARCHAR(100) NOT NULL,
   user_password VARCHAR(40) NOT NULL,
   PRIMARY KEY ( users_id )
);