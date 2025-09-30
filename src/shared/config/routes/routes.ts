export const routes = {
	main: () => '/',
	mail: () => '/mail',
	letter: (id: string = ':id') => `/letter/${id}`,
	notFound: () => '/notFound',
};
