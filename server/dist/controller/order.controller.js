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
exports.fetchID = exports.fetchOrder = exports.addOrder = void 0;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, email, name, phone, amount, amountPaid, userId, paymentMethod, itemCount, shippingAddress } = req.body;
    const query = `INSERT INTO orders (orderId, email, name, phone, amount, amountPaid, userId, paymentMethod, itemCount, shippingAddress) VALUES ('${orderId}', '${email}','${name}','${phone}', '${amount}', '${amountPaid}', '${userId}', '${paymentMethod}', '${itemCount}', '${shippingAddress}')`;
    dbConnection_1.default.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding Order to db",
                error: error
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order added successfully",
            data: result
        });
    });
});
exports.addOrder = addOrder;
const fetchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.body;
    const query = `SELECT * FROM orders WHERE orderId = '${order_id}'`;
    dbConnection_1.default.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching order",
                error: error
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result
        });
    });
});
exports.fetchOrder = fetchOrder;
const fetchID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const query = `SELECT * FROM orders WHERE userId = '${userId}'`;
    dbConnection_1.default.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching order",
                error: error
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result
        });
    });
});
exports.fetchID = fetchID;
