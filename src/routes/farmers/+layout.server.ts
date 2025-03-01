import type { PageServerLoad } from "../login/$types";
import { redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";

// redirect to login if !authenticated
export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, handleLoginRedirect(url));
	}

}

