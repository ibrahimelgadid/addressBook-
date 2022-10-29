"use strict";
//---------------------------------------------|
//           All required modules
//---------------------------------------------|
//
//
//
const Task = require("../models/taskModel");
const validateTaskInputs = require("../validation/taskValidate");
const asyncHandler = require("express-async-handler");
const isTaskOwner = require("../helpers/isOwner");
//---------------------------------------------|
//           Create New Task functionality
//---------------------------------------------|
const createTask = asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    const user = req.user.id;
    const { isValid, errors } = validateTaskInputs(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    const titleExists = await Task.findOne({
        title: title.toLowerCase().trim(""),
    });
    if (titleExists) {
        errors.title = "This title already exists";
        return res.status(400).json(errors);
    }
    else {
        const newTask = new Task({
            title,
            body,
            user,
        });
        let newTaskAdded = await newTask.save();
        if (newTaskAdded) {
            res.status(201).json({ taskSuccuss: "New task created" });
        }
        else {
            res.status(400).json({ taskError: "Failed to create Task" });
        }
    }
});
//---------------------------------------------|
//           Get All Tasks functionality
//---------------------------------------------|
const getTasks = asyncHandler(async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const limit = 5;
    const queries = {
        $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { body: { $regex: req.query.search, $options: "i" } },
        ],
    };
    const tasks = await Task.find(queries)
        .limit(limit)
        .skip((page - 1) * limit)
        .populate("user", "-password");
    if (tasks) {
        let tasksCount = await Task.count(queries);
        res.status(200).json({ tasksCount: Math.ceil(tasksCount / limit), tasks });
    }
    else {
        res.status(400).json({ getError: "There's no tasks" });
    }
});
//---------------------------------------------|
//           Get Task By ID functionality
//---------------------------------------------|
const getTaskById = asyncHandler(async (req, res) => {
    let task = await Task.findById(req.params.taskId).populate("user", "-password");
    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(400).json({ getError: "There's no task for this id" });
    }
});
//---------------------------------------------|
//           Update Task By ID functionality
//---------------------------------------------|
const updateTaskById = asyncHandler(async (req, res) => {
    if (!(await isTaskOwner(req, Task))) {
        return res
            .status(400)
            .json({ updateError: "You aren't owner of this task" });
    }
    const { isValid, errors } = validateTaskInputs(req.body);
    if (!isValid)
        return res.status(400).json(errors);
    const existTaskTitle = await Task.findOne({
        $and: [
            { title: req.body.title.toLowerCase().trim("") },
            { _id: { $ne: req.params.taskId } },
        ],
    });
    if (!existTaskTitle) {
        const updatedTask = await Task.updateOne({ _id: req.params.taskId }, {
            $set: req.body,
        }).populate("user", "-password");
        if (updatedTask) {
            res.status(200).json(updatedTask);
        }
        else {
            res.status(400).json({ updateError: "There's no task for this id" });
        }
    }
    else {
        errors.title = "This title already exists";
        res.status(400).json(errors);
    }
});
//---------------------------------------------|
//           Delete Task By ID functionality
//---------------------------------------------|
const deleteTaskById = asyncHandler(async (req, res) => {
    if (!(await isTaskOwner(req, Task))) {
        return res
            .status(400)
            .json({ deleteError: "You aren't owner of this task" });
    }
    const deletedTask = await Task.deleteOne({ _id: req.params.taskId });
    if (deletedTask) {
        res.status(200).json({ deleteSuccess: "Task deleted successfully" });
    }
    else {
        res.status(400).json({ deleteError: "There's no task for this id" });
    }
});
//
//
//
//---------------------------------------------|
//          EXPORTS
//---------------------------------------------|
module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
};
