const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: String,
    isFinished: Boolean
})

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;