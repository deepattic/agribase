import type { Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { schema } from "./schema.js";
import { superValidate, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema)),
	};
};

export const actions = {
	default: async ({locals, request}) => {
        const form = await superValidate(request,zod(schema));
        if(!form.valid){
            throw fail(400, { form })
        }
        const email = form.data.email;
        const password = form.data.password;

        try {
            await locals.pb.collection('users').create(form.data)
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