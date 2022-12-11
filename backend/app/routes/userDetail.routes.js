module.exports = (app) => {
  const userDetail = require("../controllers/userDetail.controller.js");
  var router = require("express").Router();

  router.post("/", userDetail.create);

  router.get("/:id", userDetail.findOne);

  router.put("/:id", userDetail.update);

  router.put("/user/:id", userDetail.updateUser);

  router.put("/password/:id", userDetail.updatePassword);

  app.use("/api/userDetail", router);
};
