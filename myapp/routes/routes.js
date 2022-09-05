//loading modules
const express = require('express');
const controller = require("../controller/controller");

//creating router
const router = express.Router();

//routes
//get all books
router.get("/",controller.findAll);

//get one book
router.get("/:id",controller.findOne);

//create new book
router.post("/",controller.create);

//update a book
router.patch("/:id",controller.update);

//delete a book
//soft delete
router.delete("/:id",controller.delete);
//hard delete
router.delete("/hdelete/:id",controller.hdelete);

//export
module.exports = router;

