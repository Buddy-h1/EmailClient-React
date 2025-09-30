import { useMemo, type FC } from 'react';
import { Select, Button, Empty } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { SelectProps } from 'antd/lib';
import useApp from 'antd/es/app/useApp';
import { useAppSelector, type StrictOmit } from '@/shared/utils';
import { getAuthEmail, useGetAuthUserListQuery } from '@/entities/auth';

export const RecipientSelect: FC<
	StrictOmit<SelectProps, 'options' | 'loading' | 'notFoundContent'>
> = (selectProps) => {
	const { message } = useApp();

	const currentEmailUser = useAppSelector(getAuthEmail);

	const { data = [], error, isFetching, refetch } = useGetAuthUserListQuery();

	const options: DefaultOptionType[] = useMemo(() => {
		if (error) {
			message.error('Ошибка при загрузке списка получателей');
			return [];
		}
		return data
			.filter((user) => user.email !== currentEmailUser)
			.map((user) => ({ label: user.email, value: user.email }));
	}, [data, error, message, currentEmailUser]);

	return (
		<Select
			showSearch
			{...selectProps}
			options={options}
			loading={isFetching}
			notFoundContent={
				error ? (
					<Empty
						description={
							<Button type="link" onClick={() => refetch()}>
								Повторить
							</Button>
						}
					/>
				) : undefined
			}
		/>
	);
};
