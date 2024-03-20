import type { PageLoad } from './$types';
import type { Country } from '../types';

export const prerender = true;
export const csr = true;

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(
		'https://restcountries.com/v2/all?fields=name,region,area,capital,demonym'
	);

	const countries: Country[] = await res.json();

	return { countries };
};
