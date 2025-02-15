
import { avatarImageURL } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const authRecord = locals.pb.authStore.record;
	if (!authRecord) {
		return {
			user: {
				email: 'guest@agribase.com',
				name: 'guest',
			}
		};
	}
	return {
		user: {
			name: authRecord.name,
			email: authRecord.email,
			avatar: avatarImageURL(authRecord.collectionId, authRecord.id, authRecord.avatar),
		}
	}
};