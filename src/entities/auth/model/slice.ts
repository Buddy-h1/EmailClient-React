import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthSchema } from './types/authSchema';
import type { User } from './types/user';

const initialState: AuthSchema = {
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
