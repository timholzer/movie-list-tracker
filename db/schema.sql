DROP DATABASE IF EXISTS movie_list;
CREATE DATABASE movie_list;
USE movie_list;

CREATE TABLE movies (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user VARCHAR(255),  
  release_date DATE,
  title VARCHAR(1023),
  media_type VARCHAR(1023),
  episodes INTEGER,
  current_episode INTEGER,
  series_is_ongoing BOOLEAN,
  gaming_system VARCHAR(1023),
  author VARCHAR(1023),
  duration_in_minutes INTEGER,
  watch_soon BOOLEAN,
  completed BOOLEAN,
  completion_date DATETIME,
  user_rating INTEGER,
  imdb_rating DECIMAL(3,2)
  notes VARCHAR(1023),
  imdb_link VARCHAR(1023),
  watch_link VARCHAR(1023),
  PRIMARY KEY (id)
);