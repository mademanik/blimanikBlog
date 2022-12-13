const db = require("../models");
const Comments = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const comments = {
    blogId: req.body.blogId,
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  };

  Comments.create(comments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Comments",
      });
    });
};

exports.findCommentsByBlogId = async (req, res) => {
  const blogId = req.params.id;

  getCommentsByBlogId = await db.sequelize
    .query("select * from comments where blogId = :id", {
      replacements: { id: blogId },
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comments with blogId=${blogId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comments with blogId=" + blogId,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Comments.destroy({
    where: { id: id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: `Comments deleted successfully`,
      });
    } else {
      res.send({
        message: `Error deleting Comments with id=${id}. Maybe Comments was not found or req.body is empty!`,
      });
    }
  });
};

exports.deleteCommentsByBlogId = (req, res) => {
  const blogId = req.params.id;

  Comments.destroy({
    where: { blogId: blogId },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: `Comments with blogId: ${blogId} successfully deleted`,
      });
    } else {
      res.send({
        message: `Error deleting Comments with blogId=${blogId}. Maybe Comments was not found or req.body is empty!`,
      });
    }
  });
};
