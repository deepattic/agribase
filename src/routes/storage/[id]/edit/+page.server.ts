import type { PageServerLoad, Actions } from "./$types";
import { redirect, error } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";

export const load: PageServerLoad = async ({ locals, url, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, handleLoginRedirect(url));
    }

    try {
        // Fetch the storage facility to edit
        const storage = await locals.pb.collection('storage_facilities').getOne(params.id);
        return { storage };
    } catch (e) {
        console.error(e);
        throw error(404, { message: "Storage facility not found" });
    }
}

function removeEmptyFields(formData: FormData): FormData {
    const newFormData = new FormData();

    for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size === 0) {
            continue;
        }

        if (value === '' || value === null || value === undefined) {
            continue;
        }

        newFormData.append(key, value);
    }

    return newFormData;
}

export const actions = {
    updateStorage: async ({ request, locals, params }: {request: any, locals: any, params: any}) => {
        let formData = await request.formData();
        formData = removeEmptyFields(formData);

        if (!locals.pb.authStore.record) {
            throw error(400, { message: "You must be logged in to update storage" });
        }

        try {
            await locals.pb.collection('storage_facilities').update(params.id, formData);
        } catch (err) {
            console.error(err);
            throw error(400, { message: "Something went wrong" });
        }
        
        throw redirect(303, '/storage');
    },
} satisfies Actions;