import express from "express"
import {prisma} from "store/client"
import { authinput } from "./types.ts"
 
import jwt from 'jsonwebtoken';



const app= express()
 
// Add middleware to parse JSON request bodies 
app.use(express.json())

app.post("/website", async(req,res)=>{
    if (!req.body.url){
        res.status(411).json({})
        return
    }
    const website=await prisma.website.create({
        data:{
            url:req.body.url,
            time_Added:new Date(),
            user_id: "temp-user-id" // You'll need to replace this with actual user ID from JWT
        }
    })
    res.json({
        id:website.id
    })
    
})

app.get("/status/:websiteId",(req,res)=>{
    res.send("status/websiteId endpoint")
    
})

app.post("/user/signup",async(req,res)=>{
    const data=authinput.safeParse(req.body)
    
    
    if(!data.success){
        console.log(data.error.toString())
        res.status(403).send("")
        return;
    }
    try{

      let user= await prisma.user.create({
            data:{
                username:data.data.username,
                password:data.data.password
            }
        })
        res.json({
            id:user.id
        })
    }
    catch(e){
        console.log(e)
        res.status(403).send("")
    }

    

})

app.post("/user/signin",async(req,res)=>{
    const data=authinput.safeParse(req.body)
    if(!data.success){
        res.status(403).send("")
        return;
    }
    let user= await prisma.user.findFirst({
        where:{
            username:data.data.username
        }
    })
    if(user?.password!=data.data.password){
        res.status(403).send("");
        return;
    }
    let token=jwt.sign({
        sub:user.id
    },process.env.JWT_SECRET || 'fallback-secret')
    res.json({
        jwt: token
    })

   

})


app.listen(process.env.PORT ||3000);

