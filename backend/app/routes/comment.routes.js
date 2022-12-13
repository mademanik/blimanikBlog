module.exports = (app) => {
  const comments = require("../controllers/comments.controller.js");
  var router = require("express").Router();

  router.post("/", comments.create);
  router.get("/:id", comments.findCommentsByBlogId);
  router.delete("/:id", comments.delete);
  router.delete("/blog/:id", comments.deleteCommentsByBlogId);

  app.use("/api/comments", router);
};