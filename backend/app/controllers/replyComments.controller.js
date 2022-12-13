const db = require("../models");
const ReplyComments = db.replyComments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const replyComments = {
    commentId: req.body.commentId,
    blogId: req.body.blogId,
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  };

  ReplyComments.create(replyComments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Reply Comments",
      });
    });
};

exports.findReplyCommentByCommentId = async (req, res) => {
  const commentId = req.params.id;

  getReplyCommentsByCommentId = await db.sequelize
    .query("select * from reply_comments where commentId = :id", {
      replacements: { id: commentId },
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Reply Comments with commentId=${commentId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Reply Comments with commentId=" + commentId,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ReplyComments.destroy({
    where: { id: id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: `Reply Comments deleted successfully`,
      });
    } else {
      res.send({
        message: `Error deleting Reply Comments with id=${id}. Maybe Comments was not found or req.body is empty!`,
      });
    }
  });
};

exports.deleteReplyCommentsByCommentId = (req, res) => {
  const id = req.params.id;

  ReplyComments.destroy({
    where: { commentId: id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: `Reply Comments with commentId: ${id} successfully deleted`,
      });
    } else {
      res.send({
        message: `Error deleting Reply Comments with commentId=${id}. Maybe Comments was not found or req.body is empty!`,
      });
    }
  });
};

exports.deleteReplyCommentsByBlogId = (req, res) => {
  const blogId = req.params.id;

  ReplyComments.destroy({
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
