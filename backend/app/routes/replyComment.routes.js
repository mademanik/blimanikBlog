module.exports = (app) => {
  const replyComments = require("../controllers/replyComments.controller.js");
  var router = require("express").Router();

  router.post("/", replyComments.create);
  router.get("/:id", replyComments.findReplyCommentByCommentId);
  router.delete("/:id", replyComments.delete);
  router.delete("/comment/:id", replyComments.deleteReplyCommentsByCommentId);
  router.delete("/blog/:id", replyComments.deleteReplyCommentsByBlogId);

  app.use("/api/replyComments", router);
};
