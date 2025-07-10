import {xaddbulk} from "redisstream/client"
import {prisma} from "store/client"



 

async function  main() {
    let websites= await prisma.website.findMany({
        select:{
            url:true,
            id:true
        }
    })

    console.log(websites.length)

    await xaddbulk(websites.map(w=>({
        url:w.url,
        id:w.id
    })))

    
    
    
}

setInterval(()=>{
    main()
},3*1000)


main()
 