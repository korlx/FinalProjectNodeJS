const express=require('express')
const app=express()
const root=require("./root")
const toys=require("./toys")

exports.routeInit=(app)=>{
    app.use('/',root);
    app.use("/toys",toys);
}