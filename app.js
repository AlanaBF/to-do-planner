//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workItems = [];
let shoppingItems = [];
let holidayItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ------------------------------------------------------------------ \\
// Code for Home Page

app.get("/", function (req, res) {
  res.render("home");
});

// ------------------------------------------------------------------ \\
// Code for General To Do List Page

app.get("/general", function (req, res) {
  //from date module. Could use date.getDay() as well
  const day = date.getDay() + "<br/>" + " General To Do List";
  //list links to the list.ejs template
  res.render("list", { listTitle: day, newListItems: items, list: "general" });
});

app.post("/general", function (req, res) {
  const item = req.body.newItem;

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
    items.push(item);
    res.redirect("/general");
  //}
});

app.delete("/general/:item", function(req, res) {
  const {item} = req.params
  items = items.filter(i => {
    i !== item
  })
  res.status(200).json({message:"deleted"})
})

// ------------------------------------------------------------------ \\
// Code for Work To Do List Page

app.get("/work", function (req, res) {
  const day = date.getDay() + "<br/>" + "Work To Do List";
  res.render("list", { listTitle: day, newListItems: workItems, list: "work" });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.delete("/work/:item", function(req, res) {
  const {item} = req.params
  items = items.filter(i => {
    i !== item
  })
  res.status(200).json({message:"deleted"})
})

// ------------------------------------------------------------------ \\
// Code for Shopping To Do List Page

app.get("/shopping", function (req, res) {
  const day = date.getDay() + "<br/>" + "Shopping To Do List";
  res.render("list", { listTitle: day, newListItems: shoppingItems, list: "shopping" });
});

app.post("/shopping", function (req, res) {
  const item = req.body.newItem;
  shoppingItems.push(item);
  res.redirect("/shopping");
});

app.delete("/shopping/:item", function(req, res) {
  const {item} = req.params
  items = items.filter(i => {
    i !== item
  })
  res.status(200).json({message:"deleted"})
})

// ------------------------------------------------------------------ \\
// Code for Holiday To Do List Page

app.get("/holiday", function (req, res) {
  const day = date.getDay() + "<br/>" + "Holiday To Do List";
  res.render("list", { listTitle: day, newListItems: holidayItems, list: "holiday"});
});

app.post("/holiday", function (req, res) {
  const item = req.body.newItem;
  holidayItems.push(item);
  res.redirect("/holiday");
});

app.delete("/holiday/:item", function(req, res) {
  const {item} = req.params
  items = items.filter(i => {
    i !== item
  })
  res.status(200).json({message:"deleted"})
})

// ------------------------------------------------------------------ \\

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});
