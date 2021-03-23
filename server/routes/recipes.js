const express = require("express");
const recipesController = require("../controllers/recipes");
const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.get("/:id", recipesController.getRecipeById);

router.post("/", recipesController.createRecipe);

router.put("/:id", recipesController.updateRecipe);

router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
