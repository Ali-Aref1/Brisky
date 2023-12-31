const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

// /--------------------------------/

// now lets insert on our table try
app.get("/addpost1", (req, res) => {
  let post = { name: "Rad", password: "12345radm" };
  let sql = "INSERT INTO try SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("result");
    res.send("post 1 added");
  });
});

app.get("/addpost2", (req, res) => {
  let post = { name: "7azoo", password: "7azooelragel" };
  let sql = "INSERT INTO try SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("result");
    res.send("post 2 added");
  });
});

// now lets select

app.get("/addpost3", (req, res) => {
  let sql = "SELECT * FROM try";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    const jsonStringt = JSON.stringify(result);
    res.send("<p>" + jsonStringt + "</p>");
  });
});

// quary to select all prodeucts (items from data base)

//---------------------------------------------------------------------------------------------------------------//

// const { creatPool } = require("mysql");
// const pool = creatPool({
//   host: "sql11.freesqldatabase.com",
//   user: "sql11673787",
//   password: "KIxY3Uv7ft",
//   connectionLimit: 10,
// });
// pool.query(`select * from try`, (err, res) => {
//   return console.log(res);
// });
