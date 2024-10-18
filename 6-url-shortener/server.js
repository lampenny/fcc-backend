require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const dns = require("dns");
const port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlStorage = new Map(); // In-memory storage for URLs
const currentId = 1; // To keep track of the next ID for the URL

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", function (req, res) {
  const url = req.body.url;
  let urlRegex = /^(https?:\/\/)?(www\.)?/; // Adjust regex to handle URL schemes

  const hostname = url.replace(urlRegex, "").split("/")[0]; // Extract hostname

  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      return res.json({ "error": "invalid URL" });
    } else {
      urlStorage.set(currentId, url);
      res.json({
        original_url: url,
        short_url: currentId
      });
      currentId++; // Increment the ID for the next URL
    }
  });
});


// API to redirect to the original URL
app.get("/api/shorturl/:number", function (req, res) {
  const shortUrlId = parseInt(req.params.number);
  const originalUrl = urlStorage.get(shortUrlId);

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ "error": "No short URL found for the given input" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
