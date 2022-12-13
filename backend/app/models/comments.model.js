module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
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

  return Comments;
};
