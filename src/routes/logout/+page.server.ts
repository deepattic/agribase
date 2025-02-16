import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals } : { locals: any }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	},
}