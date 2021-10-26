const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const date = require(__dirname + "/date.js")
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
let toDoList = [];

app.get("/", (req, res) => {
    res.render("list", {
        day : date.getDay(),
        toDoList : toDoList,
    });
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.post("/", (req, res) => {
    toDoList.push(req.body.task);
    // console.log(task);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server is running");
})