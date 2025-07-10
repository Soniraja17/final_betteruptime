import axios from "axios"
import {  xackbulk, xreadgroup } from "redisstream/client"
import { prisma } from "store/client"

const CONSUMER_ID=process.env.CONSUMER_ID 
const WORKER_ID=process.env.WORKER_ID 
// const CONSUMER_ID="1"
// const WORKER_ID="2"
 
 

async function main() {

    while(1){
        const response=await xreadgroup(CONSUMER_ID as string ,WORKER_ID as string)
    
        if (!response){
            continue
        }
        //@ts-ignore
    
        let promises= response.map(({id,message})=>fetchwebsite(message.url,message.id))
        await Promise.all(promises)
        console.log(promises.length)
    
    
        // here type cast id into string as field set in id need to be string
        await xackbulk(CONSUMER_ID as string ,response.map((item:{id:string})=>item.id))

    }


    async function fetchwebsite(url:string,websiteid:string) {
        return new Promise<void>((resovle,reject)=>{
            
            // const url=message.url
            // const websiteid=message.id
            const start_time=Date.now()
            axios.get(url)
            .then(async()=>{
                const endtime=Date.now()
                const res=await prisma.websiteTick.create({
                     
                    data:{
                        status:"UP",
                        region_id:CONSUMER_ID!,
                        website_id:websiteid,
                        response_time_ms: endtime-start_time
                    }
                })
                resovle()
            })
            .catch(async()=>{
                const endtime=Date.now()
                const res=await prisma.websiteTick.create({
                     
                    data:{
                        status:"DOWN",
                        region_id:CONSUMER_ID!,
                        website_id:websiteid,
                        response_time_ms: endtime-start_time
                    }
                })
                resovle()
    
            })
        })
        
    }

    
}
main()