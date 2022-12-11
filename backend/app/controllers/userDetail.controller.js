const db = require("../models");
const UserDetail = db.userDetail;
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

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

exports.findOne = async (req, res) => {
  const userId = req.params.id;

  getUserDetails = await db.sequelize
    .query(
      "select users.id, users.username, users.email, userdetails.company,userdetails.bio ,userdetails.birthDate ,userdetails.country ,userdetails.website ,userdetails.phone, userdetails.twitter ,userdetails.facebook ,userdetails.linkedin , userdetails.instagram from users inner join userdetails on users.id  = userdetails.userId WHERE users.id = :userId",
      {
        replacements: { userId: userId },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )
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

  // console.log(getUserDetails);
  // UserDetail.findOne({ where: { userId: userId } })
  //   .then((data) => {
  //     if (data) {
  //       res.send(data);
  //     } else {
  //       res.status(404).send({
  //         message: `Cannot find User with UserId : ${userId}`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: `Error retrieving User with id : ${userId}`,
  //     });
  //   });
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

exports.updateUser = (req, res) => {
  const userId = req.params.id;

  User.update(req.body, {
    where: { id: userId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `User updated successfully`,
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

exports.updatePassword = (req, res) => {
  const userId = req.params.id;

  let oldPassword;

  User.findOne({ where: { id: userId } })
    .then((data) => {
      if (data) {
        const isOldPasswordCorrect = bcrypt.compareSync(
          req.body.old_password,
          data.password
        );
        console.log("apakah password old password sama ?");
        console.log(isOldPasswordCorrect);

        if (isOldPasswordCorrect) {
          User.update(
            {
              password: bcrypt.hashSync(req.body.new_password, 8),
            },
            {
              where: { id: userId },
            }
          )
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: `Password updated successfully`,
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
        } else {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }
      } else {
        res.status(404).send({
          message: `Cannot find User with UserId : ${userId}`,
        });
      }
    })
    .catch((err) => {});
};
