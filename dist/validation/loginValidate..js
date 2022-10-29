"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = __importDefault(require("../helpers/isEmpty"));
const validateLoginInputs = (data) => {
    const errors = {};
    data.email = (0, isEmpty_1.default)(data.email) ? "" : data.email;
    data.password = (0, isEmpty_1.default)(data.password) ? "" : data.password;
    //---------------------------------------------|
    //           validate email
    //---------------------------------------------|
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    //---------------------------------------------|
    //           validate password
    //---------------------------------------------|
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    return {
        isValid: (0, isEmpty_1.default)(errors),
        errors,
    };
};
exports.default = validateLoginInputs;
