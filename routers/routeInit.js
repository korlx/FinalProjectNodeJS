const express=require('express')
const app=express()
const root=require("./root")

const users=require("./users")
exports.routeInit=(app)=>{
    app.use('/',root);
 app.use('/users',users);







    app.use("*",(req,res)=>{
        res.status(400).json({msg:"endpoind not found,Eror 404",error:404})
    })
}