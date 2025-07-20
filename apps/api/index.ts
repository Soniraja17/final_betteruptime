import express from "express"
import {prisma} from "store/client"
import { authinput } from "./types.ts"
import { authmiddleware } from "./middleware.ts";
 
import jwt from 'jsonwebtoken';
import cors from "cors";




const app= express()
 
// Add middleware to parse JSON request bodies 
app.use(express.json())
app.use(cors())

app.post("/website", authmiddleware, async(req,res)=>{
    if (!req.body.url){
        res.status(411).json({})
        return
    }
    const website=await prisma.website.create({
        data:{
            url:req.body.url,
            time_Added:new Date(),
            user_id: req.userid! // You'll need to replace this with actual user ID from JWT
        }
    })
    res.json({
        id:website.id
    })
    
})

app.get("/status/:websiteId",authmiddleware, async (req,res)=>{
    const website= await prisma.website.findFirst({
        where:{
            user_id:req.userid!,
            id:req.params.websiteId,
        },
        include:{
            ticks:{
                orderBy:[{
                    createdAt:'desc'
                }],
                take:5
            }
        }
    })
    if(!website){
        res.status(411).json({
            message:"not founded"
        })
        return
    }

    res.json({
        website
    })



    
    
    
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
        let token=jwt.sign({
            sub:user.id
        },process.env.JWT_SECRET || 'fallback-secret')
        res.json({ 
            jwt: token
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
        console.log(data.error.toString());
        res.status(403).send("data not successed")
        return;
    }
    let user= await prisma.user.findFirst({
        where:{
            username:data.data.username
        }
    })
    if(user?.password!=data.data.password){
        console.log("Password mismatch");
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

app.get("/websites",authmiddleware,async(req,res)=>{
    const websites=await prisma.website.findMany({
        where:{
            user_id:req.userid
        },
        include:{
            ticks:{
                orderBy:[{
                    createdAt:"desc",
                }],
                take:1
            }
        }

    })
    res.json({
        websites
    })
})


app.listen(process.env.PORT ||3001);
// const handler = app;

// export default handler;

