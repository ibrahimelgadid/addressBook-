"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerValidate_1 = __importDefault(require("../validation/registerValidate"));
const authModel_1 = __importDefault(require("../models/authModel"));
const loginValidate_1 = __importDefault(require("../validation/loginValidate."));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//---------------------------------------------|
//           Register functionality
//---------------------------------------------|
exports.register = (0, express_async_handler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const { isValid, errors } = (0, registerValidate_1.default)(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    const userExists = await authModel_1.default.findOne({ email });
    if (userExists) {
        errors.email = "This email already exists";
        return res.status(400).json(errors);
    }
    else {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const newUser = new authModel_1.default({
            username,
            email,
            password: hashedPassword,
        });
        const newUserAdded = await newUser.save();
        if (newUserAdded) {
            res.status(201).json(newUserAdded);
        }
        else {
            res.status(400).json({ RegErr: "Failed to create user" });
        }
    }
});
//---------------------------------------------|
//           Login functionality
//---------------------------------------------|
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const { isValid, errors } = (0, loginValidate_1.default)(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    const user = await authModel_1.default.findOne({ email });
    if (!user) {
        errors.email = "This email is not exists";
        return res.status(404).json(errors);
    }
    else {
        const matchPass = await bcryptjs_1.default.compare(password, user.password);
        if (!matchPass) {
            errors.password = "Wrong password";
            return res.status(404).json(errors);
        }
        else {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id, user.username, user.email),
            });
        }
    }
});
//---------------------------------------------|
//           generate token functionality
//---------------------------------------------|
const generateToken = (id, username, email) => {
    return jsonwebtoken_1.default.sign({ id, username, email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
