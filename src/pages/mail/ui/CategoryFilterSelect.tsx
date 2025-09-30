import type { FC } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd/lib';
import type { StrictOmit } from '@/shared/utils';
import type { LetterCategory } from '@/entities/letter';

export type CategoryFilterValue = LetterCategory | 'all';

const CATEGORY_OPTIONS: { label: string; value: CategoryFilterValue }[] = [
	{ label: 'Все письма', value: 'all' },
	{ label: 'Входящие', value: 'inbox' },
	{ label: 'Отправленные', value: 'sent' },
	{ label: 'Черновики', value: 'draft' },
];

export const CategoryFilterSelect: FC<StrictOmit<SelectProps<CategoryFilterValue>, 'options'>> = (
	props,
) => {
	return (
		<Select<CategoryFilterValue>
			{...props}
			placeholder="Выберите категорию"
			options={CATEGORY_OPTIONS}
		/>
	);
};
