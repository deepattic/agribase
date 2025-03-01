import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";
import { error } from "@sveltejs/kit";

// redirect to login if !authenticated
export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, handleLoginRedirect(url));
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
	addFarmer: async ({ request, locals }: {request: any, locals: any}) => {
		let formData = await request.formData();
		formData = removeEmptyFields(formData)
        formData.append('agent', locals.pb.authStore.record.id)

        console.log(formData)
		if (!locals.pb.authStore.record) {
			throw error(400, { message: "You must be logged in to update your profile" });
		}

		try {
            await locals.pb.collection('farmers').create(formData)
		} catch (err) {
			console.error(err);
			throw error(400, { message: "Something went wrong" });
		}
        
        throw redirect(303, '/farmers')

	},
} satisfies Actions;