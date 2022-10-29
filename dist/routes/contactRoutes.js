"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express_1 = require("express");
const contactController_1 = require("../contollers/contactController");
const router = (0, express_1.Router)();
//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
const authMiddleware_1 = require("../middleware/authMiddleware");
//---------------------------------------------|
//              Contact routes
//---------------------------------------------|
// @route /todo/contact
// @access private user
//@type post and get
router.route("/").post(authMiddleware_1.protect, contactController_1.createContact).get(authMiddleware_1.protect, contactController_1.getContacts);
// @route /todo/contact
// @access private user
//@type post and get
router.route("/bulkContacts").post(contactController_1.createBulkContacts);
// @route /todo/contact/:contactId
// @access private user
//@type get and put and delete
router
    .route("/id/:contactId")
    .get(authMiddleware_1.protect, contactController_1.getContactById)
    .put(authMiddleware_1.protect, contactController_1.updateContactById)
    .delete(authMiddleware_1.protect, contactController_1.deleteContactById);
exports.default = router;
