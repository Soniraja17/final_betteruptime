import axios from "axios";
import { BACKEND_URL } from "./config";
import { describe, test,it, expect, beforeAll } from "bun:test";
 

const USER_NAME=Math.random().toString;
 
 

describe("signup endpoint",()=>{
     



    it("ist able to signup if body is incorrect",async()=>{
        try{
            await axios.post(`${BACKEND_URL}/user/signup`,{
               
            })
            expect(false,"control shouldnt reach here")

        }catch(e){

        }

    })

    it("is able to signup all body is correct",async()=>{
        try{
            
            const res=await axios.post(`${BACKEND_URL}/user/signup`,{
                username:USER_NAME,
                password:"password"
    
            })
            expect(res.status).toBe(200);
            expect(res.status).toBeDefined();
        }
        catch(e){

        }


    })

})

describe("signin endpoint",()=>{
    
    it("isnt able to signin all body is incorrect",async()=>{
        try{
            
            const res=await axios.post(`${BACKEND_URL}/user/signin`,{
                username: USER_NAME,
                password:"password"
    
            })
            expect(res.status).toBe(200);
            expect(res.status).toBeDefined();
        }
        catch(e){
            
        }


    })


    it("is able to signup all body is correct",async()=>{
        try{
            
            const res=await axios.post(`${BACKEND_URL}/user/signin`,{
                username:USER_NAME,
                password:"password"
    
            })
            expect(res.status).toBe(200);
            expect(res.data.jwt).toBeDefined();
        }
        catch(e){
            
        }


    })

})