import type { Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { schema } from "./schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema)),
	};
};

export const actions = {
	default: async ({locals, request}) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        try {
            await locals.pb.collection('users').create(data)
            await locals.pb
              .collection('users')
              .authWithPassword(email, password)
          } catch (e) {
            console.error(e)
            throw e
          }
      
          redirect(303, '/')
      
    }
} satisfies Actions;