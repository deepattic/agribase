import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ locals, request }) => {
      const data = await request.formData();
      const email = data.get('email');
      const password = data.get('password');
  
      try {
        await locals.pb
          .collection('users')
          .authWithPassword(email, password)
        // check verify later
      } catch (e) {
        console.error(e)
        throw e
      }
  
      redirect(303, '/')
    },
  } satisfies Actions;