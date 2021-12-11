const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/ToDoListDB", {useNewUrlParser : true});

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const taskSchema = new mongoose.Schema ({
    task : String,
});

const Task = mongoose.model("Task", taskSchema);

let toDoList = [];

//read all tasks from database, keep objectId in the array as well
Task.find((err, taskObjects) => {
    if (err) {
        console.log(err);
    } else {
        taskObjects.forEach((ele) => {
            // console.log(ele);
            toDoList.push(ele);
        });
    }
});

app.get("/", (req, res) => {
    res.render("list", {
        day : date.getDay(),
        toDoList : toDoList,
    });
})

app.post("/delete", (req, res) => {
    //delete the task from db as well
    Task.deleteOne({_id : toDoList[req.body.idx]._id}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    toDoList.splice(req.body.idx, 1);
    res.redirect("/");
})

app.post("/", (req, res) => {
    //create a new task and insert in database as well
    const newTask = new Task ({
        task : req.body.task,
    });
    newTask.save();
    toDoList.push(newTask);
    // console.log(newTask);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server is running");
})