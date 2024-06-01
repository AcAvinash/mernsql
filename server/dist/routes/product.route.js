"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const route = (0, express_1.Router)();
route.post("/add", product_controller_1.addProduct);
route.post("/get", product_controller_1.getProduct);
route.post("/getid", product_controller_1.getProductID);
exports.default = route;
