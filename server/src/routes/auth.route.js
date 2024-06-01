"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controller/auth.controller");
var route = (0, express_1.Router)();
route.post("/login", auth_controller_1.userLogin);
route.post("/register", auth_controller_1.userRegister);
exports.default = route;
