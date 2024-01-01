const express = require("express");
const router = express.Router();
const {
  getAllTask,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const validateToken = require("../middleware/validToken");
router.use(validateToken);
console.log("for validation");
router.route("/").get(getAllTask);
router.route("/:id").get(getOneTask);
router.route("/").post(createTask);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);
module.exports = router;
