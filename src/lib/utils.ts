import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ServerLoadEvent } from "@sveltejs/kit";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
};

export const avatarImageURL = (collectionId: string, recordId: string, fileName: string, size: string = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export function handleLoginRedirect(
	url: URL,
	message: string = "You must be logged in to access this page"
) {
	const redirectTo = url.pathname + url.search
	console.log(redirectTo)
	return `/login?redirectTo=${redirectTo}&message=${message}`;
};