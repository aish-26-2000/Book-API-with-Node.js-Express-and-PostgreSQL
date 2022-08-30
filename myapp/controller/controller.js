//create the controller
//CRUD functions

const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

//get all books
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Book.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


//get one book
exports.findOne = (req, res) => {
    Book.findByPk(req.params.id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
 };

//create and save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a book
    const book = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price
    };
    // Save Tutorial in the database
    Book.create(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the book."
        });
      });
  };

//update a book 
exports.update = (req, res) => {
    const id = req.params.id;
    Book.update(req.body,{
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update book with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating book with id=" + id
        });
      });
  };

//delete a book
exports.delete = (req, res) => {
    const id = req.params.id;
    Book.destroy({
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete the book with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete book with id=" + id
        });
      });
  };

