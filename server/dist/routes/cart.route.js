"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart.controller");
const route = (0, express_1.Router)();
route.post("/add", cart_controller_1.addCart);
route.post("/fetch", cart_controller_1.fetchCart);
route.post("/delete", cart_controller_1.deleteCart);
exports.default = route;
