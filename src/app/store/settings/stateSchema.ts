import type { AuthSchema } from '@/entities/auth';
import { emailApi } from '@/shared/api';

export type StateSchema = {
	auth: AuthSchema;
	[emailApi.reducerPath]: ReturnType<typeof emailApi.reducer>;
};
