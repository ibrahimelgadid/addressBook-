"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authModel_1 = __importDefault(require("../models/authModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = await authModel_1.default.findById(decoded.id);
            next();
        }
        catch (error) {
            res.status(401).json({ privilegesErr: "not authorized, wrong token" });
        }
    }
    if (!token) {
        res.status(401).json({ privilegesErr: "not authorized, no token" });
    }
});
