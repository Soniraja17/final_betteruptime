import {beforeAll, describe,expect,it} from  "bun:test"
import axios from "axios"
import { createUser } from "./testUtils"

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