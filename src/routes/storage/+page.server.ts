import type { PageServerLoad, Actions } from './$types';
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

export const actions = {
    deleteStorage: async ({ request, locals }) => {
        if (!locals.pb.authStore.isValid) {
            throw error(401, { message: "Unauthorized" });
        }

        try {
            const formData = await request.formData();
            const id = formData.get('id')?.toString();
            
            if (!id) {
                throw error(400, { message: "Storage ID is required" });
            }
            
            // Using PocketBase SDK to delete the record
            await locals.pb.collection('storage_facilities').delete(id);
            
            return { success: true };
        } catch (e) {
            console.error(e);
            throw error(500, { message: "Failed to delete storage facility" });
        }
    }
} satisfies Actions;