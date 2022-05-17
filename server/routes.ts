import * as express from 'express';
export const routes = express.Router();

//face recognition imports
import '@tensorflow/tfjs-node';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';


//routes
routes.get('/', (req, res) =>
  res.send({hello: 'world'}));
routes.get('/users', (req, res) =>
  res.send([]));
routes.post('/users', (req, res) =>
  res.send({body: req.body}));
routes.post('/photo', (req,res) => {
  res.send({
    body: req.body
  })});
