//Defining the sequelize model
//Books table in MySQL dB
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.NUMBER
      }
    });
    return Book;
  };