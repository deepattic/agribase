import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
    locals.pb.authStore.clear();
    throw redirect(303, '/login');
};