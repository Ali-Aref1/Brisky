const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

//This is a link to my nodejs file. I have to import it here to use it. ~ Ali
const accountmgmt = require("./accountmgmt");

//---------------------------//
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static("assets"));
app.use(express.static("public"));
app.use(express.json());

app.listen("3000", () => {
  console.log("server is succesfuly runing on port 3000");
});

//create coinnection

const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11673787",
  password: "KIxY3Uv7ft",
  database: "sql11673787",
});
// connect to data base
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connection done");
});

// inserting the pages 
app.get("/", (err, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/joe.css", function (req, res) {
  res.type("text/css"); // Set the MIME type to CSS
  res.sendFile(__dirname + "/joe.css");
});
app.get("/stylesheet.css", function (req, res) {
  res.type("text/css"); // Set the MIME type to CSS
  res.sendFile(__dirname + "/stylesheet.css");
});
app.get("/SignUp", (err, res) => {
  res.sendFile(__dirname + "/SignUp.html");
});
app.get("/SignUp.js", (err, res) => {
  res.type("application/javascript");
  res.sendFile(__dirname + "/SignUp.js");
});
app.get("/Login", (err, res) => {
  res.sendFile(__dirname + "/Login.html");
});
// the nest get and use 
app.use("/assets", express.static("assets"));

// POST the sign up form !!
app.post("/SignUpUser", (req, res) => {

    console.log(req.body);

   // Redirect to login page after successful signup
    res.send( req.body );
  });
