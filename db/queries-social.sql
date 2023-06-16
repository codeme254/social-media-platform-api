CREATE DATABASE SocialPlatform;

CREATE TABLE users (
  user_id INT IDENTITY(1, 1) PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);

--dummy data for now
INSERT INTO users (username, email, password)
VALUES
  ('Humphrey', 'humphrey@gmail.com', 'password1'),
  ('ivythegreat', 'ivy@yahoo.com', 'password2'),
  ('dennis', 'dennis@gmail.com', 'password3'),
  ('kevin', 'kevin@jitu.com', 'password4'),
  ('Emaculate', 'ema@gmail.com', 'password5');

  SELECT * FROM users;

-- Just a table to test empty returns
CREATE TABLE empty_test(
	col1 INT PRIMARY KEY,
	);
CREATE TABLE posts (
  post_id INT PRIMARY KEY,
  title VARCHAR(100),
  content VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO posts (post_id, title, content, user_id)
VALUES
  (1, 'First Post', 'Lorem ipsum dolor sit amet.', 1),
  (2, 'Second Post', 'Vestibulum ante ipsum primis in faucibus.', 3),
  (3, 'Third Post', 'Sed feugiat, ex sit amet accumsan.', 4);

  INSERT INTO posts (post_id, title, content, user_id)
VALUES
  (4, 'Fourth Post', 'Aliquam erat volutpat.', 1),
  (5, 'Fifth Post', 'Pellentesque habitant morbi tristique senectus.', 3),
  (6, 'Sixth Post', 'Fusce condimentum massa eget nunc placerat.', 4),
  (7, 'Seventh Post', 'Maecenas non odio finibus, gravida mauris.', 1),
  (8, 'Eighth Post', 'Nulla facilisi. Sed eu felis a augue.', 4),
  (9, 'Ninth Post', 'Ut sagittis enim a fringilla fringilla.', 3),
  (10, 'Tenth Post', 'Vivamus vitae sem eget ipsum convallis.', 1),
  (11, 'Eleventh Post', 'Praesent convallis arcu a nulla tincidunt.', 4),
  (12, 'Twelfth Post', 'Vestibulum elementum libero eget fringilla consequat.', 3),
  (13, 'Thirteenth Post', 'Donec varius enim a viverra consectetur.', 1);


  SELECT * FROM posts;