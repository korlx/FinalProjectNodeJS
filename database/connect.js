const {config}=require("../config/secret")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.userPass}@cluster0.ds3pany.mongodb.net/Toys`);
   console.log("Connected to Toys DB")
 }