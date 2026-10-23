import type { PageServerLoad } from './$types';
import { modules } from '#lib/modules';

export const load: PageServerLoad = () => {
	return { modules };
};
