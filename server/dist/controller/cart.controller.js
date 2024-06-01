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
exports.deleteCart = exports.fetchCart = exports.addCart = void 0;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const fs_1 = __importDefault(require("fs"));
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId, count, title, path, price, ref, gst, shipCost } = req.body;
    const queryCheck = `SELECT * FROM cart WHERE id = '${id}' AND userId = '${userId}'`;
    dbConnection_1.default.query(queryCheck, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching cart item",
            });
        }
        if (result.length > 0) {
            // If the item exists, update its count
            const updatedCount = result[0].count + count;
            const queryUpdate = `UPDATE cart SET count = '${updatedCount}' WHERE id = '${id}' AND userId = '${userId}'`;
            dbConnection_1.default.query(queryUpdate, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Error updating cart item count",
                        count: count,
                    });
                }
                return res.status(200).json({
                    success: true,
                    count: updatedCount,
                    message: "Cart item count updated successfully",
                });
            });
        }
        else {
            // Check if the item already exists in the cart
            const images = fs_1.default.readFileSync('src/uploads/' + path);
            // Convert image to a buffer
            const imageData = Buffer.from(images);
            // If the item does not exist, insert a new item into the cart
            const queryInsert = `INSERT INTO cart (id, userId, count, title, image, price, referralId, gst, shipCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            dbConnection_1.default.query(queryInsert, [id, userId, count, title, imageData, price, ref, gst, shipCost], (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Error adding item to cart",
                        count: count,
                        error: error
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Item added to cart successfully",
                    count: count
                });
            });
        }
    });
});
exports.addCart = addCart;
const fetchCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body;
        if (!uid) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const query = `SELECT * FROM cart WHERE userId = '${uid}'`;
        dbConnection_1.default.query(query, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error fetching cart item",
                });
            }
            return res.status(200).json({
                success: true,
                data: result
            });
        });
    }
    catch (error) {
        console.error("Error fetching carts:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.fetchCart = fetchCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }
        const query = `DELETE FROM cart WHERE id = '${id}' AND userId = '${uid}'`;
        dbConnection_1.default.query(query, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error deleting cart item",
                });
            }
            // Fetch updated cart data after deletion
            const updatedCartQuery = `SELECT * FROM cart WHERE userId = '${uid}'`;
            dbConnection_1.default.query(updatedCartQuery, (error, cartItems) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Error fetching updated cart data",
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Cart item deleted successfully",
                    cartItems: cartItems,
                });
            });
        });
    }
    catch (error) {
        console.error("Error deleting carts:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.deleteCart = deleteCart;
