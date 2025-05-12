import User from "../Models/User.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"


export async function login(req,res)
{
        let user = await User.findOne({username:req.body.username});
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        
        if (bcrypt.compareSync(req.body.password,user.password )) {
    
            const Token = await jwt.sign(
                {
                    username: user.username,
                    id: user._id,
                    age: user.age
                },
                process.env.JWT_Secrate
            )
    
            console.log(Token);
    
            return res.json({
                token: Token,
                user: {
                    fullName: user.fullName,
                    username: user.username,
                    age: user.age
                }
            });
        }
        
        return res.status(401).json({ message: "Incorrect Password!" });
}


export async function SignUp(req,res) {
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
  }
