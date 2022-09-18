// import * as express from 'express';
// export const routes = express.Router();

//face recognition imports
// import '@tensorflow/tfjs-node';
// import * as canvas from 'canvas';
// import * as faceapi from 'face-api.js';

const express = require('express');
let router = express.Router();
let image : MediaImage = null
//routes
router.post('/RecognizePhoto', (req,res) => {
  
  res.send(401, {body : req.body});
  });

module.exports = router
