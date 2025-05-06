import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bcrypt from "bcrypt"
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

    
    if(bcrypt.compareSync(user.password,req.body.password))
    {
        return res.json({
            "message":true,
            "user":{
                "fullName":user.fullName,
                "username":user.username,
                "age":user.age
            }})
    }

    return res.json({"message":"Incorrect Password!"})

})

app.post("/api/SignUp", async (req, res) => {
    try {
      let { fullName, age, username, password } = req.body;
  
      // Hash the password
      let hashedPassword = bcrypt.hashSync(password, 10);
      console.log(password,hashedPassword);
  
      // Create a new user (assuming you have a Mongoose User model)
      let user = new User({
        fullName,
        age,
        username,
        password: hashedPassword
      });
  
      await user.save();
  
      return res.json({ message: "User created", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  });


app.listen(5500,()=>{
    console.log("Server listening on 5500...")
})