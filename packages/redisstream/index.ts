import { createClient } from "redis";
 

 

const client = await createClient({
  
    username: 'default',
    password:  process.env.PASSWORD,
    socket: {
        host: 'redis-18374.c80.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 18374
    }
  }
  
)
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

  type websiteEvent={url:string,id :string}
  type MessageType = {
    id: string,
    message: {
        url: string,
        id: string
    }
    //@ts-ignore
}
  const stream_name='betteruptime:website'

async function xadd({url,id}:websiteEvent) {
   const res= await client.xAdd(stream_name, '*', {
        url,
        id
      });
      console.log("✅ Added to Redis:", { url, id });

      


}  

export async function xaddbulk(websites:websiteEvent[]){
    for(let i=0;i<websites.length;i++){
        await xadd({
            url: websites[i]!.url,
            id: websites[i]!.id
        })
    }
    
}


export async function xreadgroup(consumer_grp:string,worker_id:string): Promise<MessageType[] | undefined>{
     
        try {
            const res20 = await client.xReadGroup(
                consumer_grp,
                worker_id, {
                  key: stream_name,
                  id: '>'
                }, {
                  'COUNT': 5
                }
              );
              //@ts-ignore
               
                //@ts-ignore
                let messages: MessageType[] | undefined = res20?.[0]?.messages;

                return messages;
            
        } catch (error) {
            console.log(error)
            
        }
        
    
    
}


async function xack(consumer_grp:string,stream_id:string) {
    await client.xAck(stream_name,consumer_grp,stream_id)
    
}

export async function xackbulk(consumer_grp:string ,Event_id:string[]) {
    await  Event_id.map(eventid=>xack(consumer_grp,eventid))
    
}