import { emailApi } from '@/shared/api';
import { emailApiTags } from '@/shared/api';
import { mapLettersToFront, mapLetterToBack } from '../model/letterMapper';
import type { Letter } from '../model/types/letter';
import type { LetterVM } from '../model/types/letterVM';

export const letterApi = emailApi.injectEndpoints({
	endpoints: (builder) => ({
		getLetterList: builder.query<Letter[], { currentUserEmail: string }>({
			query: () => ({
				url: 'letters',
				method: 'GET',
			}),
			transformResponse: (letters: LetterVM[], _, arg) =>
				// Отбор писем для определенного пользователя (логика бэкенда)
				mapLettersToFront(
					letters.filter(
						(letter) =>
							!letter.deletedBy?.includes(arg.currentUserEmail) &&
							(letter.from === arg.currentUserEmail ||
								(!letter.isDraft && letter.to === arg.currentUserEmail)),
					),
					arg.currentUserEmail,
				),
			providesTags: [emailApiTags.LETTER_LIST_TAG],
		}),

		getLetterById: builder.query<Letter, { id: Letter['id']; currentUserEmail: string }>({
			query: ({ id }) => ({
				url: `letters/${id}`,
				method: 'GET',
			}),
			transformResponse: (letter: LetterVM, _, arg) =>
				mapLettersToFront(letter, arg.currentUserEmail),
		}),

		createLetter: builder.mutation<void, Letter>({
			query: (letter) => ({
				url: 'letters',
				method: 'POST',
				body: mapLetterToBack({
					...letter,
					id: Date.now().toString(),
				}),
			}),
			invalidatesTags: [emailApiTags.LETTER_LIST_TAG],
		}),

		updateLetter: builder.mutation<void, Letter>({
			query: (letter) => {
				return {
					url: `letters/${letter.id}`,
					method: 'PATCH',
					body: mapLetterToBack(letter),
				};
			},
			invalidatesTags: [emailApiTags.LETTER_LIST_TAG],
		}),

		deleteLetter: builder.mutation<void, { id: Letter['id']; currentUserEmail: string }>({
			// Удаление письма совсем или только для пользователя (логика бэкенда)
			async queryFn({ id, currentUserEmail }, _, __, fetchWithBQ) {
				// Получение всех писем
				const lettersResult = await fetchWithBQ({ url: 'letters', method: 'GET' });

				if (lettersResult.error) return { error: lettersResult.error };

				const letters = lettersResult.data as LetterVM[];
				const letter = letters.find((letter) => letter.id == id);

				if (!letter) {
					return { error: { status: 404, data: 'Letter not found' } };
				}

				// Решение удалить полностью или только для пользователя
				let result;
				if (letter.isDraft) {
					result = await fetchWithBQ({ url: `letters/${id}`, method: 'DELETE' });
				} else {
					const updatedDeletedBy = Array.isArray(letter.deletedBy) ? [...letter.deletedBy] : [];
					if (!updatedDeletedBy.includes(currentUserEmail)) {
						updatedDeletedBy.push(currentUserEmail);
					}

					result = await fetchWithBQ({
						url: `letters/${id}`,
						method: 'PATCH',
						body: { ...letter, deletedBy: updatedDeletedBy },
					});
				}

				if (result.error) return { error: result.error };
				return { data: undefined };
			},
			invalidatesTags: [emailApiTags.LETTER_LIST_TAG],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetLetterListQuery,
	useGetLetterByIdQuery,
	useCreateLetterMutation,
	useUpdateLetterMutation,
	useDeleteLetterMutation,
} = letterApi;
