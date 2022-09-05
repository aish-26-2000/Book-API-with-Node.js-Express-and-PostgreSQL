//loading modules
const express = require('express');
const userController = require("../controller/userController");

//creating router
const router = express.Router();

//users
router.get("/",userController.findAll);

//export
module.exports = router;
