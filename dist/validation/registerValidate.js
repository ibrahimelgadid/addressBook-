"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = __importDefault(require("../helpers/isEmpty"));
const validateRegistrationInputs = (data) => {
    const errors = {};
    data.username = (0, isEmpty_1.default)(data.username) ? "" : data.username;
    data.email = (0, isEmpty_1.default)(data.email) ? "" : data.email;
    data.password = (0, isEmpty_1.default)(data.password) ? "" : data.password;
    data.confirmPassword = (0, isEmpty_1.default)(data.confirmPassword)
        ? ""
        : data.confirmPassword;
    //---------------------------------------------|
    //           validate username
    //---------------------------------------------|
    if (!validator_1.default.isLength(data.username, { min: 3, max: 20 })) {
        errors.username = "Username value must be between 3 and 20 charchter";
    }
    if (validator_1.default.isEmpty(data.username)) {
        errors.username = "Username is required";
    }
    //---------------------------------------------|
    //           validate email
    //---------------------------------------------|
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Insert valid email";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    //---------------------------------------------|
    //           validate password
    //---------------------------------------------|
    if (!validator_1.default.isLength(data.password, { min: 4, max: 20 })) {
        errors.password = "Password value must be between 4 and 20 charchter";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    //---------------------------------------------|
    //           validate confirmPassword
    //---------------------------------------------|
    if (validator_1.default.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "ConfirmPassword is required";
    }
    if (!validator_1.default.equals(data.confirmPassword, data.password)) {
        errors.confirmPassword = "Confirm password doesn't match";
    }
    return {
        isValid: (0, isEmpty_1.default)(errors),
        errors,
    };
};
exports.default = validateRegistrationInputs;
