import type { LetterVM } from './letterVM';

export type LetterCategory = 'inbox' | 'sent' | 'draft';

// Модель, которая используется на Front
export interface Letter extends LetterVM {
	category: LetterCategory;
}
