"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controller/payment.controller");
const route = (0, express_1.Router)();
route.post("/checkout", payment_controller_1.checkOut);
route.post("/paymentverification", payment_controller_1.paymentVerification);
exports.default = route;
