import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from './settings/store';

interface IStoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
}

export const StoreProvider: FC<IStoreProviderProps> = ({ children, initialState }) => {
	const store = createReduxStore(initialState);

	return <Provider store={store}>{children}</Provider>;
};
