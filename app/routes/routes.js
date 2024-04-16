module.exports = app => {
  const tutorials = require("../controllers/controller.js");

  var router = require("express").Router();

  router.post("/", recipes.create);

  router.get("/", recipes.findAll);

  router.get("/published", recipes.findAllPublished);

  router.get("/:id", recipes.findOne);

  router.put("/:id", recipes.update);

  router.delete("/:id", recipes.delete);

  router.delete("/", recipes.deleteAll);

  app.use("/api/recipes", router);
};
