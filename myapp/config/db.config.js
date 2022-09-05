//configuring mySQL dB
const dotenv = require("dotenv");
module.exports = {
    //configuration for mysql
    HOST : "localhost",
    USER : "postgres",
    PASSWORD: "12345678",
    DB:"postgres",
    dialect : "postgres",
    //optional configuration for sequelize
    pool: {
        max:5, //max no.of connection
        min:0, //min no,of connection
        acquire:50000,//max time in ms to get connection
        idle:10000 //max time in ms for a connection to be idle
    }
};