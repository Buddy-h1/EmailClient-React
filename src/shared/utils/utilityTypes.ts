// Создаёт тип на основе T, исключая из него свойства K.
// Полезно для создания типа без определённых ключей.
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Исключает ключ K из типа T
// Полезно для создания типа без определённых ключей.
export type StrictExclude<T, K extends T> = Exclude<T, K>;

// Проверяет что объект является массивом
export type NotArray<T extends object> = T extends readonly unknown[] ? never : T;

// Делает все поля типа T необязательными, кроме указанных в K
export type PartialWithRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
