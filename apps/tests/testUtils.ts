import axios from "axios";
import {BACKEND_URL} from "./config.ts"


const USER_NAME=Math.random().toString();

export async function createUser (): Promise<{id:string ,jwt :string}>{
    const res = await axios.post(`${BACKEND_URL}/user/signup`,{
        username:USER_NAME,
        password:"1234"
    })

    const signinres =await axios.post(`${BACKEND_URL}/user/signin`,{
        username:USER_NAME,
        password:"1234"
    })


    
    return{
        id:res.data.id,
        jwt:signinres.data.jwt
    }

}
