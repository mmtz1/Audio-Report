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
  PRIMARY KEY ( artist_id )
);

CREATE TABLE artist_img(
  img_id INT NOT NULL AUTO_INCREMENT,
  img_url VARCHAR(100) NOT NULL,
  PRIMARY KEY (img_id)
);


