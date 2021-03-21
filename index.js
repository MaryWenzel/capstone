const express = require("express");
const bodyParser = require("body-parser");
const recipesRouter = require("./server/routes/recipes");

const app = express();

var cors = require("cors");
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use("/recipes", recipesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my server for fooooooooooood!!");
});

app.listen(port, () => console.log(`Example app running on port ${port}`));
