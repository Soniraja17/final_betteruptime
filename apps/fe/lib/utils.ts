import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const BACKEND_URL="https://final-betteruptime.onrender.com"

const BACKEND_URL=axios.create({
  baseURL:process.env.BACKEND_URL
})

export default BACKEND_URL;

// export const BACKEND_URL="http://localhost:3000"
