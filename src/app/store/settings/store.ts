import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { emailApi } from '@/shared/api';
import { authReducer } from '@/entities/auth';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		auth: authReducer,
		[emailApi.reducerPath]: emailApi.reducer,
	};

	return configureStore({
		reducer: rootReducers,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emailApi.middleware),
	});
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
