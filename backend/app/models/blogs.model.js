module.exports = (sequelize, Sequelize) => {
    const Blogs = sequelize.define("blogs", {
      content: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      fileUpload: {
        type: Sequelize.STRING,
      },
    });
  
    return Blogs;
  };
  