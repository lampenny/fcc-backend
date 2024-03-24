let express = require("express");
let app = express();
require("dotenv").config();

// #1
// console.log('hello world')

// #2
// function helloExpress(req, res) {
//     res.send('Hello Express')
//   }

// app.get('/', helloExpress)

//#4
function sendFile(req, res) {
  res.sendFile(__dirname + "/views/index.html");
}

// #3
app.use("/public", express.static(__dirname + "/public"));

app.get("/", sendFile);

// #5 #6
app.get("/json", (req, res) => {
    let message = "Hello JSON"
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase()
    }

    res.json({
        "message": message
    })
});

module.exports = app;
