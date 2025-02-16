import { z } from "zod";
 
export const schema = z.object({
	email: z.string().email("Please enter a valid email."),
	password: z.string().min(2, "Password cant be less than 2 characters."),
})

