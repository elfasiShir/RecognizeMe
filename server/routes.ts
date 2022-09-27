
const router = require('express').Router()
const mongoose = require('mongoose')

const UserSchema = require( '../database/UserImage')
const Image = mongoose.model('UserImage', UserSchema)

const PostScheme = require('../database/Post')
const Post = mongoose.model("Post", PostScheme)


const VerifyUserFace = './verifyUserFace.py'
const EncodingNewFace = './encodingNewFace.py'
import { Options, PythonShell } from 'python-shell'

//routes
router.get('/', (req, res) => {});

router.post('/create-user', async (req, res) => {
  const newImage = req.body.webcamImage._imageAsDataUrl
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
        name: req.body.username
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
        knownUsers = JSON.stringify({"users" : users })
        resolve(users)
      })
    } catch (err) {
      res.status(200).json({
        message: "Could not get users, " + err
      })
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
      else {
        userId = results
        resolve(results)
      }
    })
  })
  await myPromise


  res.status(200).json({
    id: userId
  })
});

router.post('/new-post', async (req, res) => {
  let username = getUsername(req.body.userId)

  let post = new Post({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.userId,
    username: username,
    content: req.body.content,
    likes: [],
    comments: []
  })

  let savingPostPromise = new Promise<void>((resolve, reject) => {
    try {
      post.save()
      res.status(200).json({
        message: 'post saved!'
      })
      resolve()
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "could not save the post" + err
      })
      reject(err)
    }
  })
  await savingPostPromise
});

router.get('/all-posts', async (req, res) => {
  if(await getUsername(req.body.userId) != null) {
    let jsonPosts
    let getPostsPromise = new Promise((resolve, reject) => {
      try {
        Post.find().then((posts) => {
          jsonPosts = JSON.stringify({"posts": posts})
          resolve(jsonPosts)
        })
      } catch (err) {
        res.status(200).json({
          message: "Could not get posts, " + err
        })
        reject(err)
      }
    })
    await getPostsPromise

    res.status(200).json({
      jsonPosts
    })
  }
});

router.patch('/add-comment-to-post', async (req, res) => {
  let username = getUsername(req.body.userId)

  const commentJson = {
    content: req.body.comment,
    date: Date.now(),
    username: username,
    userId: req.body.userId
  }

  const listingQuery = { _id: req.body.postId };
  const updates = {
    $push: { comments: commentJson }
  };

  try {
    Post.updateOne( listingQuery, updates, () => {
      res.status(200).json({
        message: "Post updated successfully!"
      })
    })
  } catch (error) {
    res.status(500).json({
      message: "could not update the post" + error
    })
  }
});

router.patch('/like-post', async (req, res) => {
  const listingQuery = { _id: req.body.postId };
  const updates = {
    $push: { likes: req.body.userId }
  };

  try {
    Post.updateOne( listingQuery, updates, () => {
      res.status(200).json({
        message: "like post!"
      })
    })
  } catch (error) {
    res.status(500).json({
      message: "could not like the post" + error
    })
  }
});

router.patch('/unlike-post', async (req, res) => {
  const listingQuery = { _id: req.body.postId };
  const updates = {
    $pull: { likes: req.body.userId }
  };

  try {
    Post.updateOne( listingQuery, updates, () => {
      res.status(200).json({
        message: "unlike post"
      })
    })
  } catch (error) {
    res.status(500).json({
      message: "could not unlike the post" + error
    })
  }
});

router.get('/all-likes', async (req, res) => {
  try {
    if (await getUsername(req.body.userId) != null) {
      let post = await getPost(req.body.userId, req.body.postId);
      res.status(200).json({
        likes: post["likes"]
      })
    }
  }
  catch (err) {
    res.status(500).json({
      message: "could not find user or post"
    })
  }
})

async function getUsername(userId) {
  let username = null
  let getUsernamePromise = new Promise((resolve, reject) => {
    try {
      Image.findById(mongoose.Types.ObjectId(userId)).then((object) => {
        username = object.name
        resolve(object.name)
      })
    } catch (err) {
      reject(err)
    }
  })
  await getUsernamePromise
  return username
}

async function getPost(userId, postId){
  let post = null
  let getPostPromise = new Promise((resolve, reject) => {
    try {
      Post.findById(mongoose.Types.ObjectId(postId)).then((object) => {
        post = JSON.parse(JSON.stringify(object))
        resolve(post)
      })
    } catch (err) {
      reject(err)
    }
  })
  await getPostPromise
  return post
}
module.exports = router

