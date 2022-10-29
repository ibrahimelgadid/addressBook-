"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = __importDefault(require("../helpers/isEmpty"));
const validateTaskInputs = (data) => {
    const errors = {};
    data.name = (0, isEmpty_1.default)(data.name) ? "" : data.name;
    data.phone = (0, isEmpty_1.default)(data.phone) ? "" : data.phone;
    //---------------------------------------------|
    //           validate name
    //---------------------------------------------|
    if (!validator_1.default.isLength(data.name, { min: 3, max: 20 })) {
        errors.name = "name value must be between 3 and 20 charchter";
    }
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "name is required";
    }
    //---------------------------------------------|
    //           validate phone
    //---------------------------------------------|
    if (!validator_1.default.isLength(data.phone, { min: 8, max: 50 })) {
        errors.phone = "phone value must be between 11 and 20 numbers";
    }
    if (!validator_1.default.isNumeric(data.phone)) {
        errors.phone = "phone value must be numbers only";
    }
    if (validator_1.default.isEmpty(data.phone)) {
        errors.phone = "phone is required";
    }
    return {
        isValid: (0, isEmpty_1.default)(errors),
        errors,
    };
};
exports.default = validateTaskInputs;
