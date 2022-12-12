const express = require("express");
const router = express.Router();
const contoller = require("../controllers/file.controller");

let routes = (app) => {
  router.post("/upload", contoller.upload);
  router.get("/files", contoller.getListFiles);
  router.get("/files/:name", contoller.download);
  router.delete("/files/:name", contoller.remove);

  router.post("/uploadAvatar", contoller.uploadAvatar);
  router.get("/files/avatar/default/:name", contoller.avatarDefault);
  router.get("/files/avatar/:name", contoller.avatar);
  router.delete("/files/avatar/:name", contoller.removeAvatar);

  app.use(router);
};

module.exports = routes;
