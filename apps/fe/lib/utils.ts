import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 

// const BACKEND_URL=axios.create({
//   baseURL:process.env.BACKEND_URI
// })

// export default BACKEND_URL;

export const BACKEND_URL=process.env.NEXT_PUBLIC_BACKEND_URI
//export const BACKEND_URL="http://localhost:3000"

// const BACKEND_URL=axios.create({
//   baseURL:process.env.NEXT_PUBLIC_BACKEND_URI

// })
// export default BACKEND_URL;