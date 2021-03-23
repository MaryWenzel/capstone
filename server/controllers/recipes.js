const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllRecipes = (req, res) => {
  // SELECT ALL RECIPES
  pool.query(
    `SELECT  a.recipe_id, a.recipe_name, a.description, a.steps, a.source,
    GROUP_CONCAT(JSON_OBJECT('id', c.ingredient_id, 'name', c.ingredient_name, 'quantity', b.ingredient_quantity, 'unit', d.measure_name
    )) AS ingredients
    FROM recipes AS a 
    JOIN quantity AS b
    ON a.recipe_id = b.recipe_id
    JOIN ingredients AS c 
    ON b.ingredient_id = c.ingredient_id
    JOIN measurements AS d
    ON b.measure_id = d.measure_id
    GROUP BY a.recipe_id;
    `,
    (err, rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    }
  );
};

const getRecipeById = (req, res) => {
  // SELECT RECIPES BY ID
  let sql = `SELECT  a.recipe_id, a.recipe_name, a.description, a.steps, a.source,
  GROUP_CONCAT(JSON_OBJECT('id', c.ingredient_id, 'name', c.ingredient_name, 'quantity', b.ingredient_quantity, 'unit', d.measure_name
  )) AS ingredients
  FROM recipes AS a 
  JOIN quantity AS b
  ON a.recipe_id = b.recipe_id
  JOIN ingredients AS c 
  ON b.ingredient_id = c.ingredient_id
  JOIN measurements AS d
  ON b.measure_id = d.measure_id
   WHERE a.recipe_id = ${req.params.id} `;
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

//POST RECIPE
const createRecipe = (req, res) => {
  const { recipe_name, description, steps, source } = req.body;

  let sql =
    "INSERT INTO recipes (recipe_name, description, steps, source) values (?, ?, ?, ?)";
  sql = mysql.format(sql, [recipe_name, description, steps, source]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json(results);
  });
};

// UPDATE BY ID
const updateRecipe = (req, res) => {
  const { recipe_name, description, steps, source } = req.body;
  let sql =
    "UPDATE recipes SET recipe_name = ?, description = ?, steps = ?, source = ? WHERE recipe_id = ?";
  sql = mysql.format(sql, [
    recipe_name,
    description,
    steps,
    source,
    req.params.id,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

// DELETE RECIPE BY ID
const deleteRecipe = (req, res) => {
  let sql = `DELETE FROM recipes WHERE recipe_id = ${req.params.id}`;

  sql = mysql.format(sql, [req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
