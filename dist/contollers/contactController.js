"use strict";
//---------------------------------------------|
//           All required modules
//---------------------------------------------|
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactById = exports.updateContactById = exports.getContactById = exports.getContactsBySearch = exports.getContacts = exports.createBulkContacts = exports.createContact = void 0;
const contactModel_1 = __importDefault(require("../models/contactModel"));
const contactValidate_1 = __importDefault(require("../validation/contactValidate"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//---------------------------------------------|
//           Create New Contact functionality
//---------------------------------------------|
exports.createContact = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, phone } = req.body;
    const { isValid, errors } = (0, contactValidate_1.default)(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    const nameExists = await contactModel_1.default.findOne({
        name: name.toLowerCase().trim(),
    });
    if (nameExists) {
        errors.name = "This name already exists";
        return res.status(400).json(errors);
    }
    else {
        const newContact = new contactModel_1.default({
            name: name.toLowerCase().trim(),
            phone,
        });
        let newContactAdded = await newContact.save();
        if (newContactAdded) {
            res
                .status(201)
                .json({ Succuss: "New contact created", Contact: newContactAdded });
        }
        else {
            res.status(400).json({ contactError: "Failed to create contact" });
        }
    }
});
//---------------------------------------------|
//           Create New Bulk Contact functionality
//---------------------------------------------|
exports.createBulkContacts = (0, express_async_handler_1.default)(async (req, res) => {
    const contacts = req.body;
    let valid = true;
    contacts
        ? contacts.forEach(async (contact) => {
            let { isValid, errors } = (0, contactValidate_1.default)(contact);
            if (!isValid) {
                valid = false;
                res.status(400).json(errors);
            }
        })
        : null;
    if (valid) {
        let newContacts = await contactModel_1.default.insertMany(contacts);
        if (newContacts) {
            res
                .status(201)
                .json({ Succuss: "New contact created", Contact: newContacts });
        }
        else {
            res.status(400).json({ contactError: "Failed to create contact" });
        }
    }
});
//---------------------------------------------|
//           Get All Contacts functionality
//---------------------------------------------|
exports.getContacts = (0, express_async_handler_1.default)(async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 5;
    const contacts = await contactModel_1.default.find({})
        .limit(limit)
        .skip((page - 1) * limit);
    if (contacts) {
        res.status(200).json({ page, contacts });
    }
    else {
        res.status(400).json({ getError: "There's no contacts" });
    }
});
//---------------------------------------------|
//           Get All Contacts functionality
//---------------------------------------------|
exports.getContactsBySearch = (0, express_async_handler_1.default)(async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 5;
    const search = String(req.query.search);
    const contacts = await contactModel_1.default.find({
        name: { $regex: search, $options: "i" },
    })
        .limit(limit)
        .skip((page - 1) * limit);
    if (contacts) {
        res.status(200).json({ page, contacts });
    }
    else {
        res.status(400).json({ getError: "There's no contacts" });
    }
});
//---------------------------------------------|
//           Get Contact By ID functionality
//---------------------------------------------|
exports.getContactById = (0, express_async_handler_1.default)(async (req, res) => {
    let contact = await contactModel_1.default.findById(req.params.contactId);
    if (contact) {
        res.status(200).json(contact);
    }
    else {
        res.status(400).json({ getError: "There's no contact for this id" });
    }
});
//---------------------------------------------|
//           Update Contact By ID functionality
//---------------------------------------------|
exports.updateContactById = (0, express_async_handler_1.default)(async (req, res) => {
    const { isValid, errors } = (0, contactValidate_1.default)(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    const existContactName = await contactModel_1.default.findOne({
        $and: [
            { name: req.body.name.toLowerCase().trim("") },
            { _id: { $ne: req.params.contactId } },
        ],
    });
    if (!existContactName) {
        const updatedContact = await contactModel_1.default.findOneAndUpdate({ _id: req.params.contactId }, {
            $set: req.body,
        }, { new: true });
        if (updatedContact) {
            res.status(200).json(updatedContact);
        }
        else {
            res.status(400).json({ updateError: "There's no task for this id" });
        }
    }
    else {
        errors.name = "This name already exists";
        res.status(400).json(errors);
    }
});
//---------------------------------------------|
//           Delete Contact By ID functionality
//---------------------------------------------|
exports.deleteContactById = (0, express_async_handler_1.default)(async (req, res) => {
    const deletedContact = await contactModel_1.default.findOneAndDelete({
        _id: req.params.contactId,
    });
    if (deletedContact) {
        res.status(200).json({ deleteSuccess: "Contact deleted successfully" });
    }
    else {
        res.status(400).json({ deleteError: "There's no task for this id" });
    }
});
