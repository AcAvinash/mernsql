"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = void 0;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const CartModel_model_1 = require("./CartModel.model"); // Adjust the path as needed
const UserModel_model_1 = require("./UserModel.model"); // Adjust the path as needed
const OrderModel_model_1 = require("./OrderModel.model"); // Adjust the path as needed
const ProductModal_model_1 = require("./ProductModal.model"); // Adjust the path as needed
dotenv_1.default.config();
const dbName = process.env.NAME;
const createDataBase = () => {
    dbConnection_1.default.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');
        // Check if the database already exists
        dbConnection_1.default.query(`SHOW DATABASES LIKE '${dbName}'`, (err, result) => {
            if (err) {
                console.error('Error checking database existence:', err);
                return;
            }
            if (result.length === 0) {
                // Database doesn't exist, create it
                dbConnection_1.default.query(`CREATE DATABASE ${dbName}`, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                        return;
                    }
                    console.log('Database created');
                    // Use the newly created database and initialize tables
                    useDatabaseAndInitialize();
                });
            }
            else {
                console.log('Database already exists');
                // Use the existing database and initialize tables
                useDatabaseAndInitialize();
            }
        });
    });
};
exports.createDataBase = createDataBase;
const useDatabaseAndInitialize = () => {
    dbConnection_1.default.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }
        console.log(`Using database: ${dbName}`);
        // Call the functions to create tables
        (0, CartModel_model_1.createCartTable)();
        (0, UserModel_model_1.createUserTable)();
        (0, OrderModel_model_1.createOrderTable)();
        (0, ProductModal_model_1.createProductTable)();
    });
};
