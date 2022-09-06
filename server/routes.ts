// import * as express from 'express';
// export const routes = express.Router();

//face recognition imports
// import '@tensorflow/tfjs-node';
// import * as canvas from 'canvas';
// import * as faceapi from 'face-api.js';

const express = require('express');
let router = express.Router();

//routes
router.get('/', (req, res) =>
  res.send('world'));
router.get('/users', (req, res) =>
  res.send([{jhds:"jiosdlj"},"o0ovspjojs"]));
router.post('/users', (req, res) =>
  res.send({body: req.body}));
router.post('/photo', (req,res) => {
  res.send({
    body: req.body
  })});

module.exports = router
