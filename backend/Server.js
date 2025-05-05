import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import User from "./Models/User.js"

let app = express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/OAuthDb").then(()=>
{
    console.log("Connected to MongoDB...")
})


app.get("/api/blogs",(req,res)=>{
    res.json([
        "A","B","C"
    ])
})

app.post("/api/login",async(req,res)=>{
    let user = await User.findOne({username:req.body.username});
    console.log(user);
    
    if(!user)
    {
        return res.json({"message":"User Not Found!"})
    }

    
    if(user.password == req.body.password)
    {
        return res.json({"message":true,"user":{
            "fullName":user.fullName,
            "username":user.username,
            "age":user.age
        }})
    }

    return res.json({"message":"Incorrect Password!"})

})

app.post("/api/SignUp",async (req,res)=>{
    let user = new User(req.body)
    await user.save()
   return res.json({"user created":user})
})



app.listen(5500,()=>{
    console.log("Server listening on 5500...")
})