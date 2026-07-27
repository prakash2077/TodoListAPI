const express = require("express");
const taskModel = require("./models/task.model");

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hello world")
})

app.get("/tasks", async (req, res)=>{
    const tasks = await taskModel.find();
    res.status(200).json({
        message: "Tasks Fetched Successfully",
        tasks
    })
})

app.post("/create-task", async (req, res) => {

    await taskModel.create({
        task: req.body.task,
        isFinished: false
    })

    res.status(201).json({
        message: "Task Added Successfully"
    })
})

app.patch("/finish-task/:id", async (req, res) => {
    await taskModel.findOneAndUpdate({
        _id: req.params.id
    },
    {
        isFinished: true   
    })

    res.status(200).json({
        message: "Task marked as Finished"
    })
})


module.exports = app;