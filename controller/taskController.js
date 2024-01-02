//@Method GET/api/tasks
//@desc  to get all task
//@access public
const Task = require("../models/taskModel");
const getAllTask = async (req, resp) => {
  const getAll = await Task.find({ user_id: req.user.id });
  console.log(getAll);
  resp.status(200).json(getAll);
};

//@Method GET/api/tasks
//@desc  to get one task
//@access public
const getOneTask = async (req, resp) => {
  const getOne = await Task.findById(req.params.id);
  console.log(getOne);
  resp.status(200).json(getOne);
};

//@access POST//@Method GET/api/tasks
//@desc  create task
//@access public
const createTask = async (req, resp) => {
  const { title, description, dueDate, priority, status } = req.body;
  if (!title || !description || !dueDate || !priority || !status) {
    resp.status(400).json({ error: "All fields required" });
  }
  const create = await Task.create({
    title,
    description,
    dueDate,
    priority,
    status,
    user_id: req.user.id,
  });
  console.log(create);
  resp.status(201).json(create);
};

//@Method PUT/api/tasks
//@desc  update task
//@access public
const updateTask = async (req, resp) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    resp.status(400).json({ error: "User not found" });
  }
  if (task.user_id.toString() !== req.user.id) {
    resp
      .status(403)
      .json({ message: "You dont have Authority To Update this task" });
  }
  const update = await Task.findByIdAndUpdate(req.params.id, req.body);
  console.log(update);
  resp.status(201).json(update);
};

//@Method DELETE/api/tasks
//@desc  delete task
//@access public
const deleteTask = async (req, resp) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    resp.status(400).json({ error: "User not found" });
  }
  if (task.user_id.toString() !== req.user.id) {
    resp
      .status(403)
      .json({ message: "You dont have Authority To Delete this task" });
  }
  const deletetask = await Task.deleteOne(task);
  console.log(deletetask);
  resp.status(200).json(deletetask);
};

module.exports = { getAllTask, getOneTask, createTask, updateTask, deleteTask };
