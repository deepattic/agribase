import { z } from "zod";
 
export const themes = ["light", "dark"] as const;
export const languages = ["en", "es", "fr"] as const;
export const allergies = ["peanuts", "dairy", "gluten", "soy", "shellfish"] as const;
 
export const schema = z.object({
	name: z.string().min(3).max(50).optional(),
});

	

