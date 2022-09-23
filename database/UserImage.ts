// @ts-ignore
const mongoose = require('mongoose'), Schema = mongoose.Schema, UserScheme = new Schema({
    _id: Schema.Types.ObjectId,
    encoding: [] ,
    name: String,
    img: String
  }
);

module.exports = mongoose.model("UserImage", UserScheme);
module.exports =  UserScheme;
