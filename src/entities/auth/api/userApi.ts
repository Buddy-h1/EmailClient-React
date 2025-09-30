import { emailApi } from '@/shared/api';
import type { User } from '../model/types/user';

export const userApi = emailApi.injectEndpoints({
	endpoints: (builder) => ({
		getAuthUserList: builder.query<User[], void>({
			query: () => ({
				url: 'users',
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: true,
});

export const { useGetAuthUserListQuery } = userApi;
