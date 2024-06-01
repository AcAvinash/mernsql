"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTable = void 0;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const createUserTable = () => {
    const dbName = process.env.NAME;
    dbConnection_1.default.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }
        // Once the database is selected, proceed with the table creation
        const checkTableQuery = "SHOW TABLES LIKE 'User'";
        dbConnection_1.default.query(checkTableQuery, (err, result) => {
            if (err)
                throw err;
            if (result.length === 0) {
                const createUserTableQuery = `
                    CREATE TABLE User (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        userId VARCHAR(255),
                        username VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        phone VARCHAR(15),
                        password VARCHAR(255) NOT NULL
                    )
                `;
                dbConnection_1.default.query(createUserTableQuery, (err) => {
                    if (err)
                        throw err;
                    console.log('User table created');
                });
            }
            else {
                console.log('User table already exists');
            }
        });
    });
};
exports.createUserTable = createUserTable;
