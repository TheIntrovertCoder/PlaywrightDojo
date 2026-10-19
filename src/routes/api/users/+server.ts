import type { RequestHandler } from './$types';

const users = [
	{ id: 1, name: 'Ada Lovelace', role: 'developer' },
	{ id: 2, name: 'Grace Hopper', role: 'engineer' },
	{ id: 3, name: 'Alan Turing', role: 'researcher' }
];

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('search');
	const filtered = search
		? users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
		: users;
	return new Response(JSON.stringify({ users: filtered, total: filtered.length }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as { name: string; role: string };
	const newUser = { id: users.length + 1, ...body };
	users.push(newUser);
	return new Response(JSON.stringify({ user: newUser }), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as { id: number };
	const id = body.id;
	const index = users.findIndex((u) => u.id === id);
	if (index === -1) {
		return new Response(JSON.stringify({ error: 'User not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	users.splice(index, 1);
	return new Response(JSON.stringify({ deleted: true }));
};
