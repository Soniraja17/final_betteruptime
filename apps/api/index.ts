import express from "express"
import {prisma} from "store/client"


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
            timeAdded:new Date()
        }
    })
    res.json({
        id:website.id
    })
    
})

app.get("/status/:websiteId",(req,res)=>{
    res.send("status/websiteId endpoint")

})

app.listen(process.env.PORT ||3000);

