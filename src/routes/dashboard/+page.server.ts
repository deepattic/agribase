import type { PageServerLoad } from './$types';
import { error, redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";

export const load = (async ({ locals }) => {
    try {
        const storage = await locals.pb.collection('storage_facilities').getFullList();
        const farmers = await locals.pb.collection('farmers').getFullList();
        return { storage, farmers };
    } catch (e) {
        console.error(e);
        throw error(400, { message: "Something went wrong" });
    }
}) satisfies PageServerLoad;

