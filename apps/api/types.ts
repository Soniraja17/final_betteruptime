
import { z }from "zod";
export const authinput= z.object({
    username: z.string(),
    password: z.string()
}) 