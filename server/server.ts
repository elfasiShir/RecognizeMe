
const express = require('express')
const app = express();
const http = require('http')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const env = require('../database/env.json')

const routes = require('./routes.ts')

const server = http.createServer(app);

// Allow any method from any host and log requests
app.use((req, res , next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  // if( 'OPTIONS' === req.method ) {
  //   res.sendStatus(401);
  // } else {
    console.log( `${ req.ip } ${ req.method } ${ req.url }` );
    next();
  // }
})

let database = mongoose.connect( `mongodb+srv://${ env.MONGODB_USERNAME }:${ env.MONGODB_PASSWORD }@facerecognition.mb7rb0o.mongodb.net/?retryWrites=true&w=majority` ,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => { console.log('Database is connected') })
  .catch( err => { console.log('Can not connect to the database'+ err) });

app.use( express.json() )
app.use('/', routes);
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
server.listen( env.SERVER_PORT, function() {
  console.log( "Server now listening on "+ env.SERVER_PORT );
});
