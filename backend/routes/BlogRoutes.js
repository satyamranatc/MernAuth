import { Router } from "express";

const router = Router();




router.get("/",authMiddleware,(req,res)=>{
    res.json([
        "A","B","C"
    ])
})



export default router
