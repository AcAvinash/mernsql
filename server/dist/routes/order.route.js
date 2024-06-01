"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controller/order.controller");
const route = (0, express_1.Router)();
route.post("/addOrder", order_controller_1.addOrder);
route.post('/fetchOrder', order_controller_1.fetchOrder);
route.post('/userID', order_controller_1.fetchID);
exports.default = route;
