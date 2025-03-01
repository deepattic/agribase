import type { PageServerLoad } from './$types';
import { error, redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";

export const load = (async ({ locals, url }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, handleLoginRedirect(url));
    }

    try {
        const storage = await locals.pb.collection('storage_facilities').getFullList();
        return { storage };
    } catch (e) {
        console.error(e);
        throw error(400, { message: "Something went wrong" });
    }
}) satisfies PageServerLoad;

