declare global {
	interface Window {
		config: {
			apiUrl: string;
		};
	}

	/**
	 * ⚠️ FSD
	 *
	 * Необходимо для использования из слоя shared к типам Redux
	 * для типизации хука selector
	 *
	 */
	declare type StateSchema = import('@/app/store/settings/stateSchema').StateSchema;

	/**
	 * ⚠️ FSD
	 *
	 * Необходимо для доступа из слоя shared к типам Redux
	 * для типизации хука dispatch
	 *
	 */
	declare type AppDispatch = import('@/app/store/settings/store').AppDispatch;
}

export {};
