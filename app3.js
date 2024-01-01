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
