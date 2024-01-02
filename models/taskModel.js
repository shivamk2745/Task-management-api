const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "required",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description required"],
    },
    dueDate: {
      type: String,
      required: [true, "due date Required"],
    },
    priority: {
      type: Number,
      required: [true, "Priority required"],
    },
    status: {
      type: String,
      required: [true, "Status required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("taskCollection", taskSchema);
