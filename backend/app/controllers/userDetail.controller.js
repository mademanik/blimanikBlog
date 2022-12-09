const db = require("../models");
const UserDetail = db.userDetail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log("incoming request");
  // console.log(req);

  const userDetail = {
    userId: req.body.userId,
    // company: req.body.company,
    // bio: req.body.bio,
    // birthDate: req.body.birthDate,
    // country: req.body.country,
    // website: req.body.website,
    // phone: req.body.phone,
    // twitter: req.body.twitter,
    // facebook: req.body.facebook,
    // linkedin: req.body.linkedin,
    // instagram: req.body.instagram,
  };

  UserDetail.create(userDetail)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the userDetail",
      });
    });
};

exports.findOne = (req, res) => {
  const userId = req.params.id;
  UserDetail.findOne({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with UserId : ${userId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving User with id : ${userId}`,
      });
    });
};

exports.update = (req, res) => {
  const userId = req.params.id;

  UserDetail.update(req.body, {
    where: { userId: userId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `User detail updated successfully`,
        });
      } else {
        res.send({
          message: `Error updating User with userId : ${userId}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating User with id = ${userId}`,
      });
    });
};
