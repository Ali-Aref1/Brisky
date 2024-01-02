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
app.get("/History", (err, res) => {
  res.sendFile(__dirname + "/History.html");
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
app.get("/testroute", (req, res) => {
  res.send("hello world");
});

// quary to select all prodeucts (items from data base)

app.get("/getproducts", (req, res) => {
  const sql = "SELECT * FROM Item";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    const jsonStringta = JSON.stringify(result);
    res.send(jsonStringta);
    //res.json(result);
  });
});

app.post("/addOrder", (req, res) => {
  const order = req.body.order;
  let sql = `INSERT INTO Orders (Status, Cost, Count, UserId, PromoCode, AddressId) VALUES ("${order.Status}", ${order.Cost}, ${order.Count}, ${order.UserId}, "${order.PromoCode}", ${order.AddressId})`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
  console.log("Order added!");
});

app.post("/addAddressID", (req, res) => {
  const add = req.body.address;
  let sql = `SELECT FROM Address WHERE id = ${add}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Address deleted!");
});

app.post("/addPMethodDD", (req, res) => {
  try {
    const method = req.body.method;
    let sql = `INSERT INTO PaymentMethod VALUES ("${method.name}", ${method.num}, "${method.expiryDate}", ${method.cvv},${method.userID})`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send("Payment Method added successfully");
  } catch (error) {
    console.error("Error adding payment method:", error);
    res.status(500).send("Internal Server Error");
  }
  console.log("Payment Method added!");
});

app.post("/addAddressssD", (req, res) => {
  try {
    const add = req.body.address;

    // Use parameterized queries to prevent SQL injection
    let sql =
      "INSERT INTO Address (line1, line2, region, city, userID) VALUES (?, ?, ?, ?, 1)";
    let values = [add.line1, add.line2, add.region, add.city];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error adding address:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log("Address added!");
      res.status(200).json({ message: "Address added successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// the nest get and use

app.use("/assets", express.static("assets"));

app.get("/Products", function (err, res) {
  res.sendFile(__dirname + "/Products.html");
});
app.get("/item.html", function (err, res) {
  res.sendFile(__dirname + "/item.html");
});
app.get("/checkout.html", function (req, res) {
  res.sendFile(__dirname + "/checkout.html");
});
app.get("/payment.html", function (req, res) {
  res.sendFile(__dirname + "/payment.html");
});
app.get("/payment.js", function (req, res) {
  res.type("application/javascript"); // Set the MIME type to JavaScript
  res.sendFile(__dirname + "/payment.js");
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

app.get("/joe.css", function (req, res) {
  res.type("text/css"); // Set the MIME type to CSS
  res.sendFile(__dirname + "/joe.css");
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
app.get("/Login.js", (err, res) => {
  res.type("application/javascript");
  res.sendFile(__dirname + "/Login.js");
});

app.get("/Branch", function (err, res) {
  res.sendFile(__dirname + "/Branch.html");
});
//-------------------------------------------------------------//

//Payment method stuff!!!!!//
app.get("/getPMethod", (req, res) => {
  let sql = "SELECT * FROM PaymentMethod";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    const jsonStringt = JSON.stringify(result);
    res.send(jsonStringt);
  });
});
app.post("/delPMethod", (req, res) => {
  const method = req.body.method;
  let sql = `DELETE FROM PaymentMethod WHERE num = ${method}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Payment Method deleted!");
  res.sendFile(__dirname + "/account.html");
});
app.post("/addPMethod", (req, res) => {
  const method = req.body.method;
  let sql = `INSERT INTO PaymentMethod VALUES ("${method.name}", ${method.num}, "${method.expiryDate}", ${method.cvv}, 1)`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Payment Method added!");
  res.sendFile(__dirname + "/account.html");
});
app.post("/editPMethod", (req, res) => {
  const method = req.body.method;
  const oldNum = req.body.oldNum;
  let sql = `UPDATE PaymentMethod SET name="${method.name}", num=${method.num}, expiryDate="${method.expiryDate}", cvv=${method.cvv} WHERE num=${oldNum}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Payment Method edited!");
  res.sendFile(__dirname + "/account.html");
});

//---------------------------------------------------------------------------------------------------------------//
app.get("/getAddress", (req, res) => {
  let sql = "SELECT * FROM Address";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    const jsonStringt = JSON.stringify(result);
    res.send(jsonStringt);
  });
});

app.post("/addAddress", (req, res) => {
  const add = req.body.address;
  let sql = `INSERT INTO Address (line1,line2,region,city,userID) VALUES ("${add.line1}","${add.line2}","${add.region}","${add.city}", 1)`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Address added!");
  // res.sendFile(__dirname + "/account.html");
});

app.post("/delAddress", (req, res) => {
  const add = req.body.address;
  let sql = `DELETE FROM Address WHERE id = ${add}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Address deleted!");
  res.sendFile(__dirname + "/account.html");
});
app.post("/editAddress", (req, res) => {
  const add = req.body.address;
  let sql = `UPDATE Address SET line1="${add.line1}", line2="${add.line2}", region="${add.region}", city="${add.city}" WHERE id=${add.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
  });
  console.log("Address edited!");
  res.sendFile(__dirname + "/account.html");
});

// Sign Up & Login
app.post("/SignUpUser", (req, res) => {
  const user = req.body;

  let sql = `
    INSERT IGNORE INTO User (FirstName, LastName, Email, password, phone_no, DOB) VALUES("${user.first_name}", "${user.last_name}", "${user.email}", "${user.password}", "+20${user.phone_number}", "${user.date_of_birth}")`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.affectedRows > 0) {
      // Successfully signed up
      res.redirect("/Login");
    } else {
      // if Duplicate email
      res.status(400).json({ success: false, message: "Email already in use" });
    }
  });
});

app.post("/LoginUser", (req, res) => {
  const user = req.body;
});

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
app.get("/TrackOrder.html", function (req, res) {
  res.sendFile(__dirname + "/TrackOrder.html");
});
app.get('/user/:UserID/Order', (req, res) => {
  const UserID = req.params.UserID;

  // Retrieve orders for the specific user from the database
  const sql = 'SELECT OrderID, Status, Cost, Count FROM Orders WHERE UserID = ?';
  db.query(sql, [UserID], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ orders: results });
    } else {
      res.status(404).json({ error: 'No orders found for the user' });
    }
  });
});