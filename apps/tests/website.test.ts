import {beforeAll, describe,expect,it} from  "bun:test"
import axios from "axios"
import { createUser } from "./testUtils"
import { BACKEND_URL } from "./config"

let BASE_URL="http://localhost:3000"
let jwt:string,token:string

describe("website gets created",()=>{
    beforeAll(async()=>{
        const data=await createUser()

        jwt=data.jwt
        token=data.jwt
     })
    it("website not created if url is not present",async ()=>{
        try{
            
            await axios.post(`${BASE_URL}/website`,{
   
           },{
            headers:{
                Authorization:token
            }
        })
           expect(false,"website created when it shouldent")
        } catch(e){

        }
    })

    it("website is created if url is present",async ()=>{

        try{

            const response=await axios.post(`${BASE_URL}/website`,{
                url:"http://google.com"
    
           },{
            headers:{
                Authorization:token
            }
        })
           expect(response.data.id).not.toBeNull();
        }
        catch(e){
            console.log(e)
        }
            
       
    })

    it("website is not created due to header is not present",async ()=>{
        try{
            const response=await axios.post(`${BASE_URL}/website`,{
                url:"http://google.com"
           }
           ) 
           expect(false,"websit should be created if no header present");

        }
        catch(e){

        }
   
})


})

describe("fetch website",()=>{
    let userid1:string,token1:string
    let userid2:string,token2:string

    beforeAll(async()=>{
        const user1=await createUser()
        const user2=await createUser()
        userid1=user1.id
        userid2=user2.id
        token1=user1.jwt
        token2=user2.jwt
    })

    it("able to fetch website that the user created",async()=>{

        try{

            const websiteresponse=await axios.post(`${BACKEND_URL}/website`,{
    
            },{
                headers:{
                    Authorization:token1
                }
            })
            const getwebsiteresponse=await axios.get(`${BACKEND_URL}/status/${websiteresponse.data.id}`,{
                headers:{
                    Authorization:token1
                }
            })
            expect(websiteresponse.data.id).toBe(getwebsiteresponse.data.id)
            expect(getwebsiteresponse.data.website.user_id).toBe(userid1)
        }
        catch(e){
            
        }
         
    })

    it("not able to fetch website with other user details.",async()=>{

        try{

            const websiteresponse=await axios.post(`${BACKEND_URL}/website`,{
    
            },{
                headers:{
                    Authorization:token2
                }
            })
            const getwebsiteresponse=await axios.get(`${BACKEND_URL}/status/${websiteresponse.data.id}`,{
                headers:{
                    Authorization:token1
                }
            })
            expect(false,"user is different")
        }
        catch(e){
            console.log(e)
        }
    })

})