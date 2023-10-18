"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../../../middlewares"));
const route = (0, express_1.Router)();
route.get("/", middlewares_1.default.wrap(require("./list-products").default));
exports.default = route;
