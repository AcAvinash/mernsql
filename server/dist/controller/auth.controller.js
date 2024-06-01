"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRef = exports.userRegister = exports.userLogin = void 0;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, phone, password } = req.body;
        const userId = ((length, chars) => Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))(5, '0123456789');
        // Check if the email already exists in the database
        const queryCheck = `SELECT * FROM user WHERE email = '${email}'`;
        dbConnection_1.default.query(queryCheck, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Insert new user into the database
                const queryInsert = `INSERT INTO user (userId, username, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
                yield dbConnection_1.default.query(queryInsert, [userId, username, email, phone, hashedPassword]);
                // Create JWT token for session management
                const token = jsonwebtoken_1.default.sign({ userId }, 'secret123', { expiresIn: '1h' });
                res.cookie('token', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 3600000), // Expires in 1 hour
                });
                return res.status(200).json({
                    success: true,
                    message: "User created successfully",
                    users: { userId: userId },
                });
            }
        }));
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.userRegister = userRegister;
const userRef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref } = req.body;
        const queryCheck = `SELECT * FROM user WHERE userId = '${ref}'`;
        dbConnection_1.default.query(queryCheck, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "User related ref",
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "User unrelated ref",
                });
            }
        }));
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.userRef = userRef;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const query = `SELECT userId, password FROM user WHERE email = ?`;
        dbConnection_1.default.query(query, [email], (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                });
            }
            // Compare the hashed password from the database with the provided password
            const hashedPassword = result[0].password;
            const passwordMatch = yield bcrypt_1.default.compare(password, hashedPassword);
            if (!passwordMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect password"
                });
            }
            const uid = result[0].userId;
            const token = jsonwebtoken_1.default.sign({ uid }, 'secret123', { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 3600000), // Expires in 1 hour
            });
            return res.status(200).json({
                success: true,
                message: "Passwords Matched",
                userIds: result
            });
        }));
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.userLogin = userLogin;
