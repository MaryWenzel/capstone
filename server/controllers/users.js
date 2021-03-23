const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getUsers = (req, res) => {
  pool.query(
    `SELECT user_id, user_name, user_password, favorites FROM users ORDER BY user_id`,
    (err, rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    }
  );
};

const getUserById = (req, res) => {
  // SELECT USERS BY ID
  let sql = `SELECT * FROM users WHERE user_id = ${req.params.id} `;
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

// CREATE USER
const createUser = (req, res) => {
  const { user_name, user_password } = req.body;
  let sql = "INSERT INTO users (user_name, user_password) VALUES (?, ?)";
  sql = mysql.format(sql, [user_name, user_password]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json(results);
  });
};

// UPDATE USER
const updateUser = (req, res) => {
  const { user_name, user_password } = req.body;
  let sql =
    "UPDATE users SET user_name = ?, user_password = ? WHERE user_id = ?";
  sql = mysql.format(sql, [user_name, user_password, req.params.id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

// DELETE USER
const deleteUser = (req, res) => {
  let sql = `DELETE FROM users WHERE user_id = ${req.params.id}`;

  sql = mysql.format(sql, [req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
