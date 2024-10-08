require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(dns())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 1. You should provide your own project, not the example URL.
// 2. You can POST a URL to / api / shorturl and get a JSON response with original_url and short_url properties.
//   Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
// 3. When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
// 4. If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

dns.lookup(host, cb)

// Your first API endpoint
app.post('/api/shorturl', (req, res) => {
  res.json({ original_url: 'hello API', short_url: 1 });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
