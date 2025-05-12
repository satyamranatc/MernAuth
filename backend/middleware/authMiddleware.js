import jwt from "jsonwebtoken";
export default function authMiddleware(req,res,next){

//    Barrier Token:
    let token = req.headers.authorization;

    if(!token)
    {
        return res.status(401).json({message:"Access Denied"})
    }

    try {
        jwt.verify(token,process.env.JWT_Secrate)
        next();
    } catch (error) {
        return res.status(401).json({message:"Access Denied"})
    }

    
 
}