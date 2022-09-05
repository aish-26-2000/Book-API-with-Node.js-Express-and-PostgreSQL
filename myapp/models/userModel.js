//Defining the sequelize model
//Users table in MySQL dB
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey : true
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return Book;
  };