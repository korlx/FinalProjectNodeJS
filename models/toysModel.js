const Joi = require('joi');
const mongoose=require('mongoose');

const toysSchema=new mongoose.Schema({
    name:String,
    category:String,
    info:String,
    imgUrl:String,
    price:Number,
    user_id:String,
    date_created:{
        type:Date,
        default:Date.now()
    }
})
exports.ToysModel=mongoose.model("toys",toysSchema,"toys");


exports.toysValidation=bodyRequest=>{
    let joiShema=Joi.object({
        name:Joi.string().min(2).max(100).required(),
        info:Joi.string().min(13).max(750).required(),
        category:Joi.string().min(3).max(20).required(),
        imgUrl:Joi.string().required(),
        price:Joi.number().min(1).required(),
               
    })  
    return joiShema.validate(bodyRequest)
}