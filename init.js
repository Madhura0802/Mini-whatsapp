const mongoose = require('mongoose');
let Chat=require("./models/chat.js");
main().then(()=>{
    console.log("Connection Succesful...");
 }).catch(err => console.log(err));
 
 async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 }
 let allchat=[{
    from:"Neha",
    to:"Priya",
    msg:"Send me your notes",
    created_at:new Date(),
},
{
    from:"Amit",
    to:"Sumit",
    msg:"Teach me js",
    created_at:new Date(),
},
{
    from:"Kunal",
    to:"Kapil",
    msg:"How are you?",
    created_at:new Date(),
},
{
    from:"Gauri",
    to:"Renu",
    msg:"Send me your photos",
    created_at:new Date(),
},
{
    from:"Savi",
    to:"Ruhi",
    msg:"Hello! cutipie",
    created_at:new Date(),
}


];
Chat.insertMany(allchat);