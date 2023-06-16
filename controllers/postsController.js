import sql from "mssql";
import { config } from "../db/config.js";

const pool = new sql.ConnectionPool(config.sql);
await pool.connect();

export const getAllPosts = async (req, res) => {
  try {
    const posts = await pool.request().query("SELECT * FROM posts");
    if (posts.recordset.length > 0) {
      res.status(200).json(posts.recordset);
    } else {
      res.status(204).json({ message: "Posts not found" });
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// this util function checks if a user exists using the user id
const userExists = async (user_id) => {
  try {
    const user = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .query("SELECT * FROM users WHERE user_id = @user_id");
    console.log(user.recordset);
    if (user.recordset.length > 0) return true;
    return false;
  } catch (e) {
    console.log(e);
  }
};
// console.log(await userExists(1))

// this util function checks if a post exists
const postExists = async (postId) => {
  try {
    const post = await pool
      .request()
      .input("post_id", sql.Int, postId)
      .query("SELECT * FROM posts WHERE post_id = @post_id");
    if (post.recordset.length > 0) return true;
    return false;
  } catch (e) {
    console.log(e.message);
  }
};
// console.log(await postExists(1))

export const getPostByUser = async (req, res) => {
  const { userId, postId } = req.params;
  if (!(await userExists(parseInt(userId)))) {
    res.status(404).json({ message: "Forbiddend, there is no such user" });
    return;
  }
  if (!(await postExists(postId))) {
    res.status(400).json({ message: "post does not exist" });
    return;
  }

  try {
    const post = await pool
      .request()
      .input("post_id", sql.Int, postId)
      .input("user_id", sql.VarChar, userId)
      .query(
        "SELECT * FROM posts WHERE user_id = @user_id AND post_id = @post_id"
      );
    if (post.recordset.length === 0) {
      res.status(204).json({ message: "No post found" });
    } else {
      res.status(200).json(post.recordset);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const createPostByUser = async (req, res) => {
  const { userId } = req.params;
  if (await userExists(userId)) {
    try {
      const { title, content } = req.body;
      const createPost = await pool
        .request()
        .input("user_id", sql.Int, userId)
        .input("title", sql.VarChar, title)
        .input("content", sql.VarChar, content)
        .query(
          "INSERT INTO posts (title, content, user_id) VALUES (@title, @content, @user_id)"
        );
      res.status(200).json({ message: "post created successfully " });
    } catch (e) {
      res.status(400).json(e.message);
    }
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
};

export const getAllPostsBelongingToAUser = async (req, res) => {
  const { userId } = req.params;
  if (!(await userExists(parseInt(userId)))) {
    res.status(404).json({ message: "Forbiddend, there is no such user" });
    return;
  }

  try {
    const posts = await pool
      .request()
      .input("user_id", sql.Int, userId)
      .query("SELECT * FROM posts WHERE user_id = @user_id");
    if (posts.recordset.length === 0) {
      res.status(200).json({ message: "User does not have any posts" });
    } else {
      res.status(200).json(posts.recordset);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const deletePost = async (req, res) => {
  const { userId, postId } = req.params;
  if (!(await userExists(parseInt(userId)))) {
    res.status(404).json({ message: "Forbiddend, there is no such user" });
    return;
  }
  if (!(await postExists(postId))) {
    res.status(400).json({ message: "post does not exist" });
    return;
  }

  try {
    const deletePost = await pool
      .request()
      .input("user_id", sql.Int, parseInt(userId))
      .input("post_id", sql.Int, parseInt(postId))
      .query(
        "DELETE FROM posts WHERE user_id = @user_id AND post_id = @post_id"
      );
    res.status(200).json({ message: "Delete done" });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const updatePost = async (req, res) => {
  const { userId, postId } = req.params;
  if (!(await userExists(parseInt(userId)))) {
    res.status(404).json({ message: "Forbiddend, there is no such user" });
    return;
  }
  if (!(await postExists(postId))) {
    res.status(400).json({ message: "post does not exist" });
    return;
  }

  try {
    const { title, content } = req.body;
    const updatePost = await pool
      .request()
      .input("user_id", sql.Int, parseInt(userId))
      .input("post_id", sql.Int, parseInt(postId))
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .query(
        "UPDATE posts SET title = @title, content = @content WHERE user_id = @user_id AND post_id = @post_id"
      );
    res.status(200).json({ message: "Update OK" });
  } catch (e) {
    res.status(400).json(e.message);
  }
};
