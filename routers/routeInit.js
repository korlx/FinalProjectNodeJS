const express=require('express')
const app=express()
const root=require("./root")
const toys=require("./toys")
const users=require("./users")
const commentsR=require("./comments")
exports.routeInit=(app)=>{
    app.use('/',root);
    app.use("/toys",toys);
   app.use("/users",users);
   app.use("/comments",commentsR);






    app.use("*",(req,res)=>{
        res.status(400).json({msg:"endpoind not found,Eror 404",error:404})
    })
}