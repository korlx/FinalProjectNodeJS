// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://koko123:koko123123@cluster0.ds3pany.mongodb.net/Toys');
   console.log("Connected to Toys DB")
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}