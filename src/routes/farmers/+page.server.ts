
import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";

export const load: PageServerLoad = async ({ locals, url, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, handleLoginRedirect(url));
    }

    try {
        const farmers = await locals.pb.collection('farmers').getFullList();
        return { farmers };
    } catch (e) {
        console.error(e);
        throw error(400, { message: "Something went wrong" });
    }
};
