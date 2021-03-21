const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllRecipes = (req, res) => {
  // SELECT ALL RECIPES
  pool.query(
    "SELECT id, name, cooktime, ingredients FROM recipes",
    (err, rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    }
  );
};

const getRecipeById = (req, res) => {
    // SELECT RECIPES BY ID
  let sql = `SELECT id, name, cooktime, ingredients FROM recipes WHERE id = ${req.params.id} `;
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};
