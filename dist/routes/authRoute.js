"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express_1 = require("express");
const router = (0, express_1.Router)();
//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
const authController_1 = require("../contollers/authController");
//---------------------------------------------|
//              Registration routes
//---------------------------------------------|
// @route /auth/register
// @access public
//@type post
router.route("/register").post(authController_1.register);
// @route /auth/login
// @access public
//@type post
router.route("/login").post(authController_1.login);
exports.default = router;
