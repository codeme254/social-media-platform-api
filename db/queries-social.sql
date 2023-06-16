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
  post_id INT IDENTITY(1, 1) PRIMARY KEY,
  title VARCHAR(100),
  content VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO posts (title, content, user_id)
VALUES
  ('First Post', 'Lorem ipsum dolor sit amet.', 1),
  ('Second Post', 'Vestibulum ante ipsum primis in faucibus.', 3),
  ('Third Post', 'Sed feugiat, ex sit amet accumsan.', 4);

  INSERT INTO posts (title, content, user_id)
VALUES
  ('Fourth Post', 'Aliquam erat volutpat.', 1),
  ('Fifth Post', 'Pellentesque habitant morbi tristique senectus.', 3),
  ('Sixth Post', 'Fusce condimentum massa eget nunc placerat.', 4),
  ('Seventh Post', 'Maecenas non odio finibus, gravida mauris.', 1),
  ('Eighth Post', 'Nulla facilisi. Sed eu felis a augue.', 4),
  ('Ninth Post', 'Ut sagittis enim a fringilla fringilla.', 3),
  ('Tenth Post', 'Vivamus vitae sem eget ipsum convallis.', 1),
  ('Eleventh Post', 'Praesent convallis arcu a nulla tincidunt.', 4),
  ('Twelfth Post', 'Vestibulum elementum libero eget fringilla consequat.', 3),
  ('Thirteenth Post', 'Donec varius enim a viverra consectetur.', 1);


  SELECT * FROM posts;

  CREATE TABLE comments (
  comment_id INT IDENTITY(1, 1) PRIMARY KEY,
  content VARCHAR(255),
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

INSERT INTO comments (content, user_id, post_id)
VALUES
  ('Great post!', 1, 1),
  ('Nice article!', 6, 1),
  ('I found this very helpful.', 3, 2),
  ('Thanks for sharing!', 1, 2),
  ('Good job!', 4, 3),
  ('Interesting read.', 8, 3),
  ('Well written!', 1, 4),
  ('I have a question.', 3, 4),
  ('Keep up the good work!', 7, 5),
  ('This deserves more attention.', 4, 5);

  SELECT * FROM comments;
