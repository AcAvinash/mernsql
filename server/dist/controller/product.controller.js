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
exports.getProductID = exports.getProduct = exports.addProduct = void 0;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const fs_1 = __importDefault(require("fs"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, ratings, image, price, description, tag, gst, shipCost } = req.body;
    // console.log("image beg", image.path)
    console.log(req.body);
    // const images = req.file?.buffer.toString('base64'); // Assuming you're using multer to handle file uploads
    try {
        if (!image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }
        const images = fs_1.default.readFileSync('src/uploads/' + image.path);
        // Convert image to a buffer
        const imageData = Buffer.from(images);
        console.log("image in buff", imageData);
        const query = `INSERT INTO product (title, image, ratings, price, description, tag, path, gst, shipCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const product = yield dbConnection_1.default.query(query, [title, imageData, ratings, price, description, tag, image.path, gst, shipCost]);
        console.log(product);
        if (product) {
            const responseData = {
                message: "success",
                status: 200,
                product: {
                    title,
                    image,
                    ratings,
                    price,
                    tag,
                    description,
                },
            };
            console.log(responseData);
            res.status(200).json({
                success: true,
                data: responseData,
                message: "Item added to cart successfully",
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Failed to add item to cart",
            });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.addProduct = addProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Perform the database query
        const query = `SELECT * FROM product`;
        dbConnection_1.default.query(query, (error, result) => {
            if (error) {
                res.status(500).send("Unable to fetch product");
                console.log(error);
                return;
            }
            res.status(200).json({
                success: true,
                data: result,
            });
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.getProduct = getProduct;
const getProductID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const query = `SELECT * FROM product WHERE id ='${id}'`;
        dbConnection_1.default.query(query, (error, result) => {
            if (error) {
                res.status(500).send("Unable to fetch product");
                console.log(error);
                return;
            }
            res.status(200).json({
                success: true,
                data: result,
            });
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.getProductID = getProductID;
