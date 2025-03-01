
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
        const farmer = await locals.pb.collection('farmers').getOne(params.farmerId);

		if (locals.pb.authStore.record?.id === farmer.agent) {
			return {
				farmer
			};
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (e) {
		console.log('Error: ', e);
		throw error(e.status, e.message);
	}
};

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
	updateFarmer: async ({ request, locals, params }) => {
		let formData = await request.formData();
        formData = removeEmptyFields(formData);

		try {
			await locals.pb.collection('farmers').update(params.farmerId, formData);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/farmers`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('farmers').update(params.farmerId, { avatar: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};