import type {Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from '$lib/utils';
 
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

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, handleLoginRedirect(url));
	}

}

export const actions = {
	updateProfile: async ({ request, locals }) => {
		let formData = await request.formData();
		formData = removeEmptyFields(formData)

		if (!locals.pb.authStore.record) {
			throw error(400, { message: "You must be logged in to update your profile" });
		}

		try {
			await locals.pb.collection('users').update(locals.pb.authStore.record.id, formData);
		} catch (err) {
			console.error(err);
			throw error(400, { message: "Something went wrong" });
		}
		return { success: true };
	},
} satisfies Actions;

	

