//---------------------------------------------|
//           All required modules
//---------------------------------------------|

import Contact from "../models/contactModel";
import validateContactInputs from "../validation/contactValidate";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { stringify } from "querystring";

//---------------------------------------------|
//           Create New Contact functionality
//---------------------------------------------|
export const createContact = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { name, phone } = req.body;
    const { isValid, errors } = validateContactInputs(req.body);
    if (!isValid) return res.status(400).json(errors);

    const nameExists = await Contact.findOne({
      name: name.toLowerCase().trim(),
    });

    if (nameExists) {
      errors.name = "This name already exists";
      return res.status(400).json(errors);
    } else {
      const newContact = new Contact({
        name: name.toLowerCase().trim(),
        phone,
      });

      let newContactAdded = await newContact.save();

      if (newContactAdded) {
        res
          .status(201)
          .json({ Succuss: "New contact created", Contact: newContactAdded });
      } else {
        res.status(400).json({ contactError: "Failed to create contact" });
      }
    }
  }
);
//---------------------------------------------|
//           Create New Bulk Contact functionality
//---------------------------------------------|
export const createBulkContacts = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const contacts = req.body;
    let valid = true;

    contacts.forEach(async (contact: { name: string; phone: string }) => {
      let { isValid, errors } = validateContactInputs(contact);
      if (!isValid) {
        valid = false;
        res.status(400).json(errors);
      }
    });

    if (valid) {
      let newContacts = await Contact.insertMany(contacts);

      if (newContacts) {
        res
          .status(201)
          .json({ Succuss: "New contact created", Contact: newContacts });
      } else {
        res.status(400).json({ contactError: "Failed to create contact" });
      }
    }
  }
);

//---------------------------------------------|
//           Get All Contacts functionality
//---------------------------------------------|
export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const page: number = req.query.page ? Number(req.query.page) : 1;
  const limit: number = 5;

  const contacts = await Contact.find({})

    .limit(limit)
    .skip((page - 1) * limit);

  if (contacts) {
    res.status(200).json({ page, contacts });
  } else {
    res.status(400).json({ getError: "There's no contacts" });
  }
});
//---------------------------------------------|
//           Get All Contacts functionality
//---------------------------------------------|
export const getContactsBySearch = asyncHandler(
  async (req: Request, res: Response) => {
    const page: number = req.query.page ? Number(req.query.page) : 1;
    const limit: number = 5;
    const search: string = String(req.query.search);

    const contacts = await Contact.find({
      name: { $regex: search, $options: "i" },
    })

      .limit(limit)
      .skip((page - 1) * limit);

    if (contacts) {
      res.status(200).json({ page, contacts });
    } else {
      res.status(400).json({ getError: "There's no contacts" });
    }
  }
);

//---------------------------------------------|
//           Get Contact By ID functionality
//---------------------------------------------|
export const getContactById = asyncHandler(
  async (req: Request, res: Response) => {
    let contact = await Contact.findById(req.params.contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(400).json({ getError: "There's no contact for this id" });
    }
  }
);

//---------------------------------------------|
//           Update Contact By ID functionality
//---------------------------------------------|
export const updateContactById = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { isValid, errors } = validateContactInputs(req.body);
    if (!isValid) return res.status(400).json(errors);

    const existContactName = await Contact.findOne({
      $and: [
        { name: req.body.name.toLowerCase().trim("") },
        { _id: { $ne: req.params.contactId } },
      ],
    });

    if (!existContactName) {
      const updatedContact = await Contact.findOneAndUpdate(
        { _id: req.params.contactId },
        {
          $set: req.body,
        }
      );

      if (updatedContact) {
        res.status(200).json(updatedContact);
      } else {
        res.status(400).json({ updateError: "There's no task for this id" });
      }
    } else {
      errors.name = "This name already exists";
      res.status(400).json(errors);
    }
  }
);

//---------------------------------------------|
//           Delete Contact By ID functionality
//---------------------------------------------|
export const deleteContactById = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedContact = await Contact.deleteOne({
      _id: req.params.contactId,
    });
    if (deletedContact) {
      res.status(200).json({ deleteSuccess: "Contact deleted successfully" });
    } else {
      res.status(400).json({ deleteError: "There's no task for this id" });
    }
  }
);
