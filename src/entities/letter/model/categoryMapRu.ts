import type { LetterCategory } from './types/letter';

export const categoryMapRu: Record<LetterCategory, string> = {
	inbox: 'Входящее',
	sent: 'Отправленное',
	draft: 'Черновик',
};
