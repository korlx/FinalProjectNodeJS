const mongoose = require("mongoose");
const Joi = require("joi");


const commentSchema = new mongoose.Schema({
  comment: String,
  foods_id: String,
  title: String,
  user_id:String
});


exports.CommentModel = mongoose.model('Comment', commentSchema);


exports.validateComment = (_reqBody) => {
  let joiSchema = Joi.object({
    comment: Joi.string().min(2).max(300).required(),
    foods_id: Joi.string().min(2).max(40).required(),
    title: Joi.string().min(2).max(100).required()
  })
  return joiSchema.validate(_reqBody);
}