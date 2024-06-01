"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("mysql");
// import dotevn from "dotenv"
// dotevn.config()
// createing connnection to the mysql database
var dbConnection = mysql_1.default.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: "labhkari"
});
exports.default = dbConnection;
