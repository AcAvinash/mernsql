"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// createing connnection to the mysql database
const dbConnection = mysql_1.default.createConnection({
    connectionLimit: 12, // Adjust this value based on your requirements
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    // port: process.env.DATABASE_PORT
});
exports.default = dbConnection;
