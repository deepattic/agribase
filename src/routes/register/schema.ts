import { z } from "zod";
 
export const schema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters."),
	email: z.string().email("Please enter a valid email."),
	password: z.string().min(8, "Password must be at least 8 characters."),
	passwordConfirm: z.string(),
}).refine(
	(values) => {
	  return values.password === values.passwordConfirm;
	},
	{
	  message: "Passwords must match!",
	  path: ["passwordConfirm"],
	}
  );

	

