//create the user controller
//CRUD functions

const db = require("../models");
const Book = db.users;
const Op = db.Sequelize.Op;

//get all users
exports.findAll = (req, res) => {
    const name = req.query.name;
    Book.findAll({ where: name })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };