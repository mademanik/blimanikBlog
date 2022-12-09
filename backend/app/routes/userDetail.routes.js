module.exports = (app) => {
  const userDetail = require("../controllers/userDetail.controller.js");
  var router = require("express").Router();

  router.post("/", userDetail.create);

  router.get("/:id", userDetail.findOne);

  router.put("/:id", userDetail.update);

  app.use("/api/userDetail", router);
};
