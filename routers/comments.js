const express= require("express");
const { auth } = require("../middlewares/auth");
const {CommentModel,validateComment} = require("../models/commentModel")
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let data = await CommentModel
    .find({})
    .limit(20)

    .sort({_id:-1});
    res.json(data);

  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/userList", auth ,async(req,res) => {
  try{
    let data = await CommentModel
    .find({user_id:req.tokenData._id})
    .limit(20)
  
    .sort({_id:-1});
    res.json(data);

  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/",auth, async(req,res) => {
  let validBody = validateComment(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let comment = new CommentModel(req.body);
   
    comment.user_id = req.tokenData._id;
    await comment.save();
    res.status(201).json(comment);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id" , async(req,res) => {
  let validBody = validateComment(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let id = req.params.id;
    let data = await CommentModel.updateOne({_id:id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id" , async(req,res) => {
  try{
    let id = req.params.id;
    let data = await CommentModel.deleteOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;