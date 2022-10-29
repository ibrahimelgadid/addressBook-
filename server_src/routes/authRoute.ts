//---------------------------------------------|
//           All required modules
//---------------------------------------------|
import { Router } from "express";
const router: Router = Router();

//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
import { register, login } from "../contollers/authController";

//---------------------------------------------|
//              Registration routes
//---------------------------------------------|

// @route /auth/register
// @access public
//@type post
router.route("/register").post(register);

// @route /auth/login
// @access public
//@type post
router.route("/login").post(login);

export default router;
