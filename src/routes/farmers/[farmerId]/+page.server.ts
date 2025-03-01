import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";
// import { get } from "svelte/store";

// export const load: PageServerLoad = async ({ locals, url, params }) => {
// 	if (!locals.pb.authStore.isValid) {
// 		throw redirect(303, handleLoginRedirect(url));
// 	}

//     const getFarmer = async (farmerId: string) => {
//         try {
//             const farmer = await locals.pb.collection('farmers').getOne(farmerId)
//             return { farmer };       
//         } catch (e) {
//             console.error(e)
//             throw error(400, { message: "Something went wrong" })
//         };
//     }
//     return {
//         farmer: getFarmer(params.farmerId)
//     }

// }

export const load: PageServerLoad = async ({ locals, url, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, handleLoginRedirect(url));
    }

    try {
        const farmer = await locals.pb.collection('farmers').getOne(params.farmerId);
        return { farmer };
    } catch (e) {
        console.error(e);
        throw error(400, { message: "Something went wrong" });
    }
};
