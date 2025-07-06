import {describe,expect,it} from  "bun:test"
import axios from "axios"

let BASE_URL="http://localhost:3000"

describe("website gets created",()=>{
    it ("website not created if url is not present",async ()=>{
        try{
            
            await axios.post(`${BASE_URL}/website`,{
   
           })
           expect(false,"website created when it shouldent")
        } catch(e){

        }
    })

    it ("website is created if url is present",async ()=>{
        
            
            const response=await axios.post(`${BASE_URL}/website`,{
                url:"http://google.com"
   
           })
           expect(response.data.id).not.toBeNull();
       
    })



})