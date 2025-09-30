import type { Letter, LetterCategory } from './types/letter';
import type { LetterVM } from './types/letterVM';

/*
 * Маппер писем между Back и Front
 *
 * Нужен для замены логики бэкенда: в идеале бэкенд мог бы отправлять
 * категорию письма (draft, sent, inbox) относительно текущего пользователя,
 * но так как бэкенда нет, эта логика реализуется здесь на фронте.
 */

// Маппер из LetterVM в Letter
type MapResult<T> = T extends LetterVM[] ? Letter[] : Letter;
export const mapLettersToFront = <T extends LetterVM | LetterVM[]>(
	input: T,
	currentUserEmail: string,
): MapResult<T> => {
	const mapLetterToCategory = (letter: LetterVM): LetterCategory => {
		if (letter.isDraft) return 'draft';
		if (letter.from === currentUserEmail) return 'sent';
		if (letter.to.includes(currentUserEmail)) return 'inbox';
		return 'inbox';
	};

	const mapSingle = (letter: LetterVM): Letter => ({
		...letter,
		category: mapLetterToCategory(letter),
	});

	if (Array.isArray(input)) {
		return input.map(mapSingle) as MapResult<T>;
	}

	return mapSingle(input) as MapResult<T>;
};

// Маппер из Letter в LetterVM
export function mapLetterToBack(letter: Letter): LetterVM {
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars
		-- Необходимо, чтобы исключить category из объекта */
	const { category, ...restLetter } = letter;
	return {
		...restLetter,
		isDraft: letter.category === 'draft',
	};
}
