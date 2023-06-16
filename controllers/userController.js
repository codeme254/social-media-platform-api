import sql from "mssql";
import { config } from "../db/config.js";
import bcrypt from "bcrypt";

const pool = new sql.ConnectionPool(config.sql);
await pool.connect();
const bcryptSalt = bcrypt.genSaltSync(10);

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.request().query("SELECT * FROM users");
    if (allUsers.recordset.length > 0) {
      res.status(200).json(allUsers.recordset);
    } else {
      res
        .status(204)
        .json({ message: "We could't find any users at this time" });
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool
      .request()
      .input("user_id", sql.Int, id)
      .query("SELECT * FROM users WHERE user_id = @user_id");
    if (user.recordset.length > 0) {
      res.status(200).json(user.recordset);
    } else {
      res.status(204).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// utility function to check if the email address is already taken
const emailIsAlreadyTaken = async (email) => {
  try {
    const userWithEmail = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM users WHERE email = @email");

    if (userWithEmail.recordset.length > 0) return true;
    return false;
  } catch (e) {
    res.status(400).json(e.message);
  }
};
// console.log(await emailIsAlreadyTaken('ivy@yahoo.com'))
// console.log(await emailIsAlreadyTaken('noemail@nomail.com'))

export const createUser = async (req, res) => {
  let { username, email, password } = req.body;
  if (await emailIsAlreadyTaken(email)) {
    res.status(409).json({
      message: "Email address already taken, please try a different one",
    });
    return;
  }
  try {
    password = bcrypt.hashSync(password, bcryptSalt);
    const insertUser = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(
        "INSERT INTO users (username, email, password) VALUES(@username, @email, @password)"
      );

    res.status(200).json({ message: "Account successfuly created" });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const updateUserInformation = async (req, res) => {
  // confirm that the user exists by checkin email passed is ther
  let { username, email, password } = req.body;
  const { id } = req.params;
  if (await emailIsAlreadyTaken(email)) {
    // this means that the user exists, so we can update them
    try {
      password = bcrypt.hashSync(password, bcryptSalt);
      const updateUserInfo = await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, password)
        .query(
          "UPDATE users SET username = @username, email = @email, password = @password WHERE user_id = @id"
        );
      res
        .status(200)
        .json({ message: `Information for ${username} updated successfuly` });
    } catch (e) {
      res.status(400).json(e.message);
    }
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query("DELETE FROM users WHERE user_id = @id");
    console.log(deleteUser);
    res.status(200).json({ message: "Account deleted successfully " });
  } catch (e) {
    res.status(400).json(e.message);
  }
};
