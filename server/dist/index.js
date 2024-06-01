"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const DBModel_model_1 = require("./model/DBModel.model");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
// Define storage for the uploaded images
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename uploaded files with a timestamp prefix
    }
});
// Create multer instance with the storage configuration
const upload = (0, multer_1.default)({ storage: storage });
// const upload = multer({ storage: multer.memoryStorage ()})
// Use middleware
app.use(express_1.default.json({ limit: '50mb' })); // Set maximum JSON request size
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));
// Define routes
app.use("/auth", auth_route_1.default);
app.use("/cart", upload.single('image'), cart_route_1.default);
app.use("/product", upload.single('image'), product_route_1.default);
app.use("/paytm", payment_route_1.default);
app.use("/order", order_route_1.default);
// Route for getting paytm key
app.get("/paytm/getkey", (req, res) => res.status(200).json({ key: process.env.RAZORPAY_KEY_ID }));
// Call database initialization functions
(0, DBModel_model_1.createDataBase)();
// createCartTable();
// createUserTable();
// createOrderTable();
// createProductTable();
// Start the server
const PORT = process.env.PORT || "4000";
app.listen(PORT, () => console.log("Server started running at the PORT:", PORT));
