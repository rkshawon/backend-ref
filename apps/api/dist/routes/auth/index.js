"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/auth", route);
    route.get("/", (req, res, next) => {
        res.send("hello");
    });
    return app;
};
