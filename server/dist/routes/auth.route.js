"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const route = (0, express_1.Router)();
route.post("/login", auth_controller_1.userLogin);
route.post("/register", auth_controller_1.userRegister);
route.post('/ref', auth_controller_1.userRef);
exports.default = route;
