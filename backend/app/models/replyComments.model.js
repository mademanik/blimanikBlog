module.exports = (sequelize, Sequelize) => {
  const ReplyComments = sequelize.define("reply_comments", {
    commentId: {
      type: Sequelize.INTEGER,
    },
    blogId: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.TEXT,
    },
  });

  return ReplyComments;
};
