//---------------------------------------------|
//           All required modules
//---------------------------------------------|
import { Router } from "express";
import {
  createContact,
  getContacts,
  getContactById,
  updateContactById,
  deleteContactById,
  createBulkContacts,
} from "../contollers/contactController";
const router: Router = Router();

//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
import { protect } from "../middleware/authMiddleware";

//---------------------------------------------|
//              Contact routes
//---------------------------------------------|

// @route /todo/contact
// @access private user
//@type post and get
router.route("/").post(protect, createContact).get(protect, getContacts);

// @route /todo/contact
// @access private user
//@type post and get
router.route("/bulkContacts").post(createBulkContacts);

// @route /todo/contact/:contactId
// @access private user
//@type get and put and delete
router
  .route("/id/:contactId")
  .get(protect, getContactById)
  .put(protect, updateContactById)
  .delete(protect, deleteContactById);

export default router;
