import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { emailApiTags } from './emailApiTags';

export const emailApi = createApi({
	reducerPath: 'emailApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		credentials: 'include',
	}),
	tagTypes: Object.values(emailApiTags),
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
});
