const express=require('express');
const app=express();
const port=8080;
const mongoose = require('mongoose');
const path=require('path');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
let Chat=require("./models/chat.js");


main().then(()=>{
   console.log("Connection Succesful...");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.listen(port,()=>{
    console.log(`port is listening on ${port}`);
});

app.get('/chats',async (req,res)=>
{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

//New route
app.get('/chats/new',(req,res)=>{
  res.render('new.ejs');
})

//create route
app.post('/chats',(req,res)=>{
  let {from,to,msg}=req.body;
  let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
  })
 
  newChat.save().then((res)=>
  {
    console.log("Chat was saved");
  }).catch(()=>{
    console.log("Error occcured");
  })
  res.redirect('/chats')
});

//Edit route
app.get('/chats/:id/edit',async(req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
  res.render('edit.ejs',{chat});
})

//Update route
app.put('/chats/:id' ,async(req,res)=>{
  let {id}=req.params;
  let{msg:newmsg}=req.body;
  let updateChat=await Chat.findByIdAndUpdate(
    id,
    {msg:newmsg},
    {
      runValidators:true,
      new:true
    }
  )
  res.redirect('/chats');
})

//delete route
app.delete('/chats/:id',async (req,res)=>{
  let {id}=req.params;
  let deletedchat=await Chat.findByIdAndDelete(id);
  console.log(deletedchat);
  res.redirect('/chats');
})