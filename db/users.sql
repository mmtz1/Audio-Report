CREATE TABLE users(
  users_id INT NOT NULL AUTO_INCREMENT,
  user_username VARCHAR(100) NOT NULL,
  user_password VARCHAR(40) NOT NULL,
  PRIMARY KEY ( users_id )
);

CREATE TABLE artist(
  artist_id INT NOT NULL AUTO_INCREMENT,
  artist_name VARCHAR(100) NOT NULL,
  artist_genre VARCHAR(100) NOT NULL,
  artist_imageurl VARCHAR(100) NOT NULL,
  artist_bio VARCHAR(1000) NOT NULL,
  PRIMARY KEY ( artist_id )
);

CREATE TABLE reviews (
  review_id INT NOT NULL AUTO_INCREMENT,
  user_name  VARCHAR(100) NOT NULL,
  venue VARCHAR(100) NOT NULL,
  number_of_stars INT NOT NULL,
  review_details VARCHAR(10000) NOT NULL,
  artist_id VARCHAR(100) NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  concert_date DATE NOT NULL,
  PRIMARY KEY ( review_id )
);