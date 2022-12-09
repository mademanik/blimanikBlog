module.exports = (sequelize, Sequelize) => {
  const UserDetail = sequelize.define("UserDetail", {
    userId: {
      type: Sequelize.INTEGER,
    },
    company: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    birthDate: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    website: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    linkedin: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
  });
  return UserDetail;
};
