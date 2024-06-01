"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cart_controller_1 = require("../controller/cart.controller");
var route = (0, express_1.Router)();
route.post("/add", cart_controller_1.addCart);
route.post("/fetch", cart_controller_1.fetchCart);
exports.default = route;
