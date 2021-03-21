const express = require("express");
const recipesController = require("../controllers/recipes");
const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.get("/:id", recipesController.getRecipeById);

module.exports = router;
