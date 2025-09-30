// Модель, которая приходит с Back
export interface LetterVM {
	id: string; // Уникальный идентификатор письма
	subject?: string | null; // Тема письма
	body: string; // Основной текст письма
	from: string; // Email отправителя письма
	to: string; // Email-адрес получателя
	date: string; // Дата и время создания письма в ISO-формате
	isDraft: boolean; // Флаг, показывающий, является ли письмо черновиком
	deletedBy: string[]; // Email's пользователей, которые удалили письмо
}
