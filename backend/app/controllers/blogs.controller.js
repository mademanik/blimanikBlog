const db = require("../models");
const Blogs = db.blogs;
const Op = db.Sequelize.Op;

// Create and Save a new Blog
exports.create = (req, res) => {
  // Create a Blogs
  const blogs = {
    content: req.body.content,
    title: req.body.title,
    category: req.body.category,
    slug: req.body.slug,
    status: req.body.status,
    fileUpload: req.body.fileUpload,
    creatorId: req.body.creatorId,
  };

  // Save Blogs in the database
  Blogs.create(blogs)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Blogs",
      });
    });
};

// Retrieve all Blogs from database
exports.findAll = async (req, res) => {
  // Blogs.findAll()
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occured while retrieving the Blogs",
  //     });
  //   });
  getAllBlogs = await db.sequelize
    .query(
      "select blogs.*,users.username, users.email,userdetails.profile from blogs left join users on users.id = blogs.creatorId left join userdetails on userdetails.userId = blogs.creatorId",
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving the Blogs",
      });
    });
};

// Find a single Blogs with an id
exports.findOne = async (req, res) => {
  const blogId = req.params.id;

  // Blogs.findByPk(id)
  getBlogById = await db.sequelize
    .query(
      "select blogs.*,users.username, users.email,userdetails.profile from blogs left join users on users.id = blogs.creatorId left join userdetails on userdetails.userId = blogs.creatorId WHERE blogs.id = :id",
      {
        replacements: { id: blogId },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Blogs with id=${blogId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Blogs with id=" + blogId,
      });
    });
};

// Update a blogs by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Blogs.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Blogs updated successfully`,
        });
      } else {
        res.send({
          message: `Error updating Blogs with id=${id}. Maybe Blogs was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Blogs with id=" + id,
      });
    });
};

// Delete a blogs by the id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blogs.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Blogs deleted successfully`,
        });
      } else {
        res.send({
          message: `Error deleting Blogs with id=${id}. Maybe Blogs was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Blogs with id=" + id,
      });
    });
};
