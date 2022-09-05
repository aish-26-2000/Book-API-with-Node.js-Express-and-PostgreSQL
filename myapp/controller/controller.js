//create the controller
//CRUD functions

const { sequelize } = require("../models");
const db = require("../models");
const { options } = require("../routes/routes");
const Book = db.books;
const Op = db.Sequelize.Op;

//get all books
const Pagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset};
};
const getPagingData = (data, page, limit) => {
  const { length: totalItems, rows:Book } = data;
  const currentPage = page ? +page : 0;
  const books_shown = data.length;
  return { Book,books_shown ,currentPage };
};
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = Pagination(page, size);
  const title = req.query.title;
  Book.findAll({ where: title, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send({
        message : 'success',
        paging_details : 'Paging starts with index 0',
        response,
        data
      });
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
    if (!data) {
      res.status(404).json({
        status :'fail',
        message : 'Book not found'
      });
    } else {
      res.send({
        message : 'success',
        data});
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Book with id=" + id
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
        res.send({
          message : 'success',
          data});
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
        where: { id: id },
        logging:true,
        benchmark:true
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was updated successfully."
        });
        } else {
          res.status(404).send({
            message:`Book with id:${id} not found.`
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
//soft deletion
exports.delete = async(req, res) => {
  const id = req.params.id;
  await Book.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was soft deleted successfully!"
        });
      } else {
        res.status(404).send({
          message:`Book with id:${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete book with id=" + id
      });
    });
};

//hard deletion
//soft deletion
exports.hdelete = (req, res) => {
  const id = req.params.id;
  Book.destroy({
      where: { id: id },
      force:true
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was soft deleted successfully!"
        });
      } else {
        res.status(404).send({
          message:`Book with id:${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete book with id=" + id
      });
    });
};

