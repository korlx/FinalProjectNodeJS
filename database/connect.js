const {config}=require("../config/secret")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://koko123:koko123123@cluster0.ds3pany.mongodb.net/?retryWrites=true&w=majority`);
   console.log("Connected to Toys DB")
 }
 //mongodb+srv://${config.userDb}:${config.userPass}@cluster0.ds3pany.mongodb.net/Toys