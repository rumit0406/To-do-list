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

app.post("/delete", (req, res) => {
    toDoList.splice(req.body.idx, 1);
    res.redirect("/");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.post("/", (req, res) => {
    toDoList.push(req.body.task);
    // console.log(req.body);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server is running");
})