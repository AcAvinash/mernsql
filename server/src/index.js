"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dbConnection_1 = require("./config/dbConnection");
var auth_route_1 = require("./routes/auth.route");
var cart_route_1 = require("./routes/cart.route");
var app = (0, express_1.default)();
// checking whether database is connected or not
dbConnection_1.default.connect(function (error) {
    if (error)
        console.error("Fail to connect the Database\n", error);
    else
        console.log("database connected successfully");
});
app.use(express_1.default.json());
// app.use(cookieParser())
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));
app.use("/auth", auth_route_1.default);
app.use("/cart", cart_route_1.default);
var PORT = 4000;
// listening the server in the metioned PORT
app.listen(PORT, function () {
    return console.log("Server started running at the PORT:", PORT);
});
