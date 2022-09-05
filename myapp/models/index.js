//initialize sequelize
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    logging : false,
    benchmark : true,
    operatorsAliases : false,
    pool : {
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = require("./model")(sequelize, Sequelize);
//db.users = require("./model")(sequelize,Sequelize);

//export
module.exports = db;