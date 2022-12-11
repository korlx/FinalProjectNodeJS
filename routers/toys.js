const express=require('express')
const router=express.Router();
const { auth } = require("../middlewares/auth");
const {ToysModel, toysValidation}=require('../models/toysModel')


router.get('/',async (req,res)=>{
  let perPage = Number(req.query.perPage) || 10;
  let page = Number(req.query.page) || 1
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  try {
    let data= await ToysModel
    .find({})
    .limit(perPage)
    .skip((page-1)*perPage)
    .sort({[sort]:reverse})
    res.json(data)

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
}
})
router.post('/',auth, async(req,res)=>{
   let validateRequest=toysValidation(req.body);
   if(validateRequest.error){
    return res.status(400).json(validateRequest.error.details)
   }

    try {
        let ModelReqData=new  ToysModel(req.body)
        ModelReqData.user_id=req.tokenData._id
        await ModelReqData.save();
        res.status(201).json({msg:"saved",ModelReqData})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
})
router.get("/search",async(req,res) => {
  try{
    let searchQ = req.query.s;
    let regQuery  = new RegExp(searchQ,"i")
    let data = await ToysModel
    .find({$or:[{name:regQuery},{info:regQuery}]})
    .limit(20)
    .skip(0)
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/category/:cat_name",async(req,res)=>{
  let perPage = Number(req.query.perPage) || 10;
  let page = Number(req.query.page) || 1
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  try {
    let cat_name=req.params.cat_name;
    let data=await ToysModel
    .find({category:cat_name})
    .limit(perPage)
    .skip((page-1) * perPage )
    .sort({[sort]:reverse})
    res.json(data);
    
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
    
}
})
router.delete("/:delld",auth,async(req,res)=>{
  try {
    let delld=req.params.delld;
    let data=await ToysModel.deleteOne({_id:delld});
  res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  
}
})

router.put("/:editId",auth,async(req,res)=>{
  let validateRequest=toysValidation(req.body);
  if(validateRequest.error){
   return res.status(400).json(validateRequest.error.details)
  }
  try {
    let editId = req.params.editId;
    let data=await ToysModel.updateOne({_id:editId},req.body);
  res.json(data);
  } 
  catch (error) {
    console.log(error);
    res.status(400).json(error)
  
}
})



module.exports=router;