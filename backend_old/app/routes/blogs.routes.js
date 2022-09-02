module.exports = (app) => {
  const blogs = require("../controllers/blogs.controller.js");

  var router = require("express").Router();

  // Create a new blogs
  router.post("/", blogs.create);

  // Retrieve all blogs
  router.get("/", blogs.findAll);

  // Retrieve a single Blogs by id
  router.get("/:id", blogs.findOne);

  // Update a Blogs by id
  router.put("/:id", blogs.update);

  // Delete a blogs by id
  router.delete("/:id", blogs.delete);

  app.use("/blogs", router);
};
