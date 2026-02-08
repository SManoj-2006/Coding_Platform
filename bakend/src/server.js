import express, { json } from "express";
import { ENV } from "./lib/env.js";
const app = express();


app.get("/health",(req,res)=>{
    res.status(200).json({msg:"success from backend 12223"})
})
app.listen(ENV.PORT,()=>{
    console.log("Server is running:",ENV.PORT)
})