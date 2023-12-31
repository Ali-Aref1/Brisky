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

// display home page
app.get("/", (err, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/stylesheet.css", function (req, res) {
  res.type("text/css"); // Set the MIME type to CSS
  res.sendFile(__dirname + "/stylesheet.css");
});
app.get("/account", (err, res) => {
  res.sendFile(__dirname + "/account.html");
});
app.get("/account.js", (err, res) => {
  res.type("application/javascript");
  res.sendFile(__dirname + "/account.js");
});

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
app.get("/testroute",(req,res)=>{
  res.send("hello world");
})

// quary to select all prodeucts (items from data base)

// app.get("/products", (req, res) => {
//   const sql = "SELECT * FROM Item";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     const jsonStringta = JSON.stringify(result);
//     res.send("<p>" + jsonStringta + "</p>");
//     //res.json(result);
//   });
// });

// the nest get and use

app.use("/assets", express.static("assets"));

app.get("/Products", function (err, res) {
  res.sendFile(__dirname + "/Products.html");
});
app.get("/item.html", function (err, res) {
  res.sendFile(__dirname + "/item.html");
});
app.get(["/checkout", "/checkout.html"], function (req, res) {
  res.sendFile(__dirname + "/checkout.html");
});

app.get("/chckout.js", function (req, res) {
  res.type("application/javascript"); // Set the MIME type to JavaScript
  res.sendFile(__dirname + "/chckout.js");
});
app.get("/styleee.css", function (req, res) {
  res.type("text/css"); // Set the MIME type to CSS
  res.sendFile(__dirname + "/styleee.css");
});

app.get("/products.js", function (req, res) {
  res.type("application/javascript"); // Set the MIME type to JavaScript
  res.sendFile(__dirname + "/products.js");
});
app.get("/hazem.css", function (req, res) {
  res.type("text/css"); // Set the MIME type to CSS
  res.sendFile(__dirname + "/hazem.css");
});

app.get("/getPMethod", (req, res) => {
  let sql = "SELECT * FROM PaymentMethod";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    const jsonStringt = JSON.stringify(result);
    res.send(jsonStringt);
  });
});

//---------------------------------------------------------------------------------------------------------------//

// app.get("/", function (err, res) {
//   res.sendFile(__dirname + "/index.html");
// });

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
