
const express = require('express')
const app = express();

const routes = require('./routes.ts')
const bodyParser = require('body-parser')

// Allow any method from any host and log requests
app.use((req, res , next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if('OPTIONS' === req.method) {
    res.sendStatus(401);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
})

// Handle POST requests that come in formatted as JSON
app.use(express.json())
app.use('/', routes);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// start our server on port 4201
app.listen(4201, '127.0.0.1', function() {
  console.log("Server now listening on 4201");
});
