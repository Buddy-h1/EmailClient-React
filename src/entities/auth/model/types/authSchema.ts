import type { User } from './user';

export interface AuthSchema {
	user: User | null;
}
