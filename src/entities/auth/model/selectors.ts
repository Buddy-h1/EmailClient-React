export const getAuthUser = (state: StateSchema) => state.auth.user;
export const getAuthEmail = (state: StateSchema) => state.auth.user?.email ?? null;
