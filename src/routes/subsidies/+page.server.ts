import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { handleLoginRedirect } from "$lib/utils";

export const load: PageServerLoad = async ({ locals, url, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, handleLoginRedirect(url));
    }

    try {
        // Fetch farmers list
        const farmers = await locals.pb.collection('farmers').getFullList();
        
        // Fetch subsidies
        const subsidies = await locals.pb.collection('subsidies').getFullList({
            expand: 'farmer_id'
        });
        
        // Fetch fertilizer stock
        const fertilizerStock = await locals.pb.collection('fertilizer_stock').getFullList();
        
        return { 
            farmers,
            subsidies,
            fertilizerStock
        };
    } catch (e) {
        console.error(e);
        throw error(400, { message: "Something went wrong" });
    }
};

export const actions: Actions = {
    createSubsidy: async ({ request, locals }) => {
        if (!locals.pb.authStore.isValid) {
            throw error(401, { message: "Unauthorized" });
        }

        const formData = await request.formData();
        const farmerId = formData.get('farmer_id') as string;
        const amount = formData.get('amount') as string;
        const status = formData.get('status') as string;
        const subsidyType = formData.get('subsidy_type') as string;
        const notes = formData.get('notes') as string;
        
        try {
            await locals.pb.collection('subsidies').create({
                farmer_id: farmerId,
                amount: parseFloat(amount),
                status: status,
                subsidy_type: subsidyType,
                notes: notes,
                created_by: locals.pb.authStore.model?.id,
                approved_date: status === 'approved' ? new Date().toISOString() : null
            });
            
            return { success: true };
        } catch (err) {
            console.error('Error creating subsidy:', err);
            throw error(400, { message: "Failed to create subsidy" });
        }
    },
    
    updateFertilizerStock: async ({ request, locals }) => {
        if (!locals.pb.authStore.isValid) {
            throw error(401, { message: "Unauthorized" });
        }
        
        const formData = await request.formData();
        const stockId = formData.get('stock_id') as string;
        const quantity = formData.get('quantity') as string;
        const operation = formData.get('operation') as string;
        
        try {
            // Get current stock
            const currentStock = await locals.pb.collection('fertilizer_stock').getOne(stockId);
            
            // Calculate new quantity
            let newQuantity = currentStock.quantity;
            if (operation === 'add') {
                newQuantity += parseFloat(quantity);
            } else if (operation === 'remove') {
                newQuantity -= parseFloat(quantity);
                if (newQuantity < 0) newQuantity = 0;
            } else {
                newQuantity = parseFloat(quantity); // Set directly
            }
            
            // Update stock
            await locals.pb.collection('fertilizer_stock').update(stockId, {
                quantity: newQuantity,
                last_updated: new Date().toISOString(),
                updated_by: locals.pb.authStore.model?.id
            });
            
            return { success: true };
        } catch (err) {
            console.error('Error updating fertilizer stock:', err);
            throw error(400, { message: "Failed to update fertilizer stock" });
        }
    },
    
    updateSubsidyStatus: async ({ request, locals }) => {
        if (!locals.pb.authStore.isValid) {
            throw error(401, { message: "Unauthorized" });
        }
        
        const formData = await request.formData();
        const subsidyId = formData.get('subsidy_id') as string;
        const status = formData.get('status') as string;
        const notes = formData.get('notes') as string || '';
        
        try {
            await locals.pb.collection('subsidies').update(subsidyId, {
                status: status,
                notes: notes,
                approved_date: status === 'approved' ? new Date().toISOString() : null
            });
            
            return { success: true };
        } catch (err) {
            console.error('Error updating subsidy status:', err);
            throw error(400, { message: "Failed to update subsidy status" });
        }
    }
};