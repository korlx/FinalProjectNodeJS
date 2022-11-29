const express=require('express')
const router=express.Router();
const {ToysModel, toysValidation}=require('../models/toysModel')


router.get('/',async (req,res)=>{
  try {
    let data= await ToysModel
    .find({})
    res.json(data)

  } catch (error) {
  console.log(error);    
  }
})
router.post('/',async(req,res)=>{
   let validateRequest=toysValidation(req.body);
   if(validateRequest.error){
    return res.status(400).json(validateRequest.error.details)
   }

    try {
        let ModelReqData=ToysModel(req.body)
        await ModelReqData.save();
        res.status(201).json({msg:"saved",ModelReqData})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
})


module.exports=router;