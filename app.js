//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const lists = {
  general: [],
  work: [],
  shopping: [],
  holiday: []
};

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ------------------------------------------------------------------ \\
// Code for Home Page

app.get("/", function (req, res) {
  res.render("home");
});

// ------------------------------------------------------------------ \\
// Code for List Pages

const renderList = function (listName, title, items, res) {
  const day = `${date.getDay()}<br/>${title}`;
  res.render("list", { listTitle: day, newListItems: items, list: listName });
};

const addItem = function (listName, item, res) {
  lists[listName].push(item);
  res.redirect("/" + listName);
  //clear input field
  document.querySelector('input[name="newItem"]').value = "";
};

const deleteItem = function (listName, item, res) {
  lists[listName] = lists[listName].filter(i => i !== item);
  res.status(200).json({ message: "deleted" });
};

app.get("/:listName", function (req, res) {
  const { listName } = req.params;
  const title = listName.charAt(0).toUpperCase() + listName.slice(1) + " To Do List";
  renderList(listName, title, lists[listName], res);
});

app.post("/:listName", function (req, res) {
  const { listName } = req.params;
  const item = req.body.newItem;
  addItem(listName, item, res);
});

app.delete("/:listName/:item", function (req, res) {
  const { listName, item } = req.params;
  try {
    deleteItem(listName, item, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------------------------------------------ \\

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});
