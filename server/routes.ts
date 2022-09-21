
const router = require('express').Router()
const UserSchema = require( '../database/UserImage')
const mongoose = require('mongoose')
const Image = mongoose.model('UserImage', UserSchema)

const VerifyUserFace = './verifyUserFace.py'
const EncodingNewFace = './encodingNewFace.py'
import { Options, PythonShell } from 'python-shell'


//routes
router.get('/', (req, res) => {});

router.post('/create-user', async (req, res) => {
  const newImage = req.body._imageAsDataUrl

  let options: Options = {
    mode: 'text',
    args: [newImage, '--option=12']
  }

  let encodedData
  let encodingPromise = new Promise((resolve, reject) => {
    PythonShell.run(EncodingNewFace, options, (err, results) => {
      if (err) reject(err)
      else {
        encodedData = results
        resolve(results)
      }
    })
  })
  await encodingPromise


  let savingUserPromise
  if (encodedData != "False" ) {
    let userImage = new Image(
      {
        _id: new mongoose.Types.ObjectId(),
        encoding: encodedData,
        // name: req.body.username
        name: "bat-chen"
      })

     savingUserPromise = new Promise<void>((resolve, reject) => {
      try {
        userImage.save()
        res.status(200).json({
          message: 'image saved!'
        })
        resolve()
      } catch (err) {
        console.log(err)
        res.status(500).json({
          message: "something went wrong" + err
        })
        reject(err)
      }
    })

  } else {
    res.status(500).json({
      message: "could not find a face, please try again"
    })
  }
  await savingUserPromise
});

router.post('/verify-user-face', async (req, res) => {
  let knownUsers
  let getUsersPromise = new Promise((resolve, reject) => {
    try {
      Image.find().then((users) => {
        // res.status(200).json({
        //   users: users
        // })
        knownUsers = JSON.stringify(users)
        resolve(users)
      })
    } catch (err) {
      // res.status(500).json({
      //   message: "could not get users, " + err
      // })
      reject(err)
    }
  })

  await getUsersPromise
  const unknown = req.body._imageAsDataUrl;
  let options: Options = {
    mode: 'text',
    args: [knownUsers, unknown, '--option=123']
  }


  let userId
  let myPromise = new Promise((resolve, reject) => {
    PythonShell.run(VerifyUserFace, options, (err, results) => {
      if (err) reject(err)
      userId = results
      resolve(results)
    })
  })
  await myPromise
  res.status(200).json({
    id: userId
  })
});



module.exports = router

