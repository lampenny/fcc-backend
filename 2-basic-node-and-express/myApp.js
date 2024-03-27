let express = require("express");
let app = express();

// To test, make sure you comment out any interfering exercises

// #6 Use the .env file
require("dotenv").config();

// ＃11 Use body-parser to parse POST requests
const bodyParser = require("body-parser");

// #1 Meet the Node Console
console.log("hello world");

// #2 Start a Working Express Server
function helloExpress(req, res) {
  res.send("Hello Express");
}

app.get("/", helloExpress);

// #7 Implement a Root-Level Request Logger Middleware
function middleWareTest(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.use("/", middleWareTest);

//#4 Serve static assets
function sendFile(req, res) {
  res.sendFile(__dirname + "/views/index.html");
}

// #3 Serve a HTML file
app.use("/public", express.static(__dirname + "/public"));

app.get("/", sendFile);

// #5 / #6 Serve JSON on a Specific Route / Use the .env File
app.get("/json", (req, res) => {
  let message = "Hello JSON";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    message: message,
  });
});

// #8 Get route query parameter input from the client
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

// #9 Get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

// #10 Get query parameter input from the client
app.get("/name", (req, res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`,
  });
});

// ＃11 Use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// #12 Get data from POST requests
app.post("/name", (req, res) => {
  const fullName = `${req.body.first} ${req.body.last}`;

  res.json({ name: fullName });
});

module.exports = app;
