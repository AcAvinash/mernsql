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
exports.authUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    if (!token) {
        res.status(401).send("User not authorized");
        return;
    }
    const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRETE_KEY);
    // query to retrive the user with Sid = id
    const query = `
    SELECT *
    FROM user
    WHERE userId = '${decoded}'
  `;
    // retriving the user with Sid = id from db
    dbConnection_1.default.query(query, (error, result) => {
        if (error) {
            res.status(500).send("internal server error");
            console.log(error);
            return;
        }
        const user = result[0];
        if (!user) {
            res.status(401).send("unauthorized user");
            return;
        }
        req.user = user;
        next();
    });
});
exports.authUser = authUser;
