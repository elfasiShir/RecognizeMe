// @ts-ignore
const mongoose = require('mongoose'), Schema = mongoose.Schema, PostScheme = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    username: String,
    content: String,
    likes: [],
    comments: [{}]
  }
);

module.exports = mongoose.model("Post", PostScheme);
module.exports =  PostScheme;
