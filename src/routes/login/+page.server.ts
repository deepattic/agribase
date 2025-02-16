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
  default: async ({ locals, request, url }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      throw fail(400, { form })
    }

    try {
      await locals.pb
        .collection('users')
        .authWithPassword(form.data.email, form.data.password)
      // check verify later
    } catch (e) {
      console.error(e)
      throw e
    }

    const redirectTo = url.searchParams.get('redirectTo')
    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`)
    }
    redirect(302, '/')
  },
} satisfies Actions;