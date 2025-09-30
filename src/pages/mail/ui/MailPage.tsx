import { useMemo, useRef, useState, type FC, useEffect, type Key, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Flex, Tag, theme, Radio } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import useApp from 'antd/es/app/useApp';
import { useDebounce } from 'use-debounce';
import { useDeleteLetterMutation, useGetLetterListQuery, type Letter } from '@/entities/letter';
import { getAuthEmail } from '@/entities/auth';
import { SendLetterModal } from '@/features/send-letter';
import { routes } from '@/shared/config';
import { useAppSelector } from '@/shared/utils';
import { columns } from './columns';
import { useTableHeight } from './useTableHeight';
import { CategoryFilterSelect, type CategoryFilterValue } from './CategoryFilterSelect';
import { useConfirmDelete } from '@/features/confirm-delete';

export const MailPage: FC = () => {
	const { token } = theme.useToken();
	const { message } = useApp();
	const navigate = useNavigate();

	const container = useRef<HTMLDivElement>(null);
	const usersTableRef = useRef<HTMLDivElement>(null);
	const { tableHeight: usersTableHeight } = useTableHeight(container, usersTableRef);

	const currentUserEmail = useAppSelector(getAuthEmail);
	const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
	const [openSendLetterModal, setOpenSendLetterModal] = useState(false);
	const [editingDraft, setEditingDraft] = useState<Letter | null>(null);

	const [category, setCategory] = useState<CategoryFilterValue>('all');
	const [dateSortOrder, setDateSortOrder] = useState<'ascend' | 'descend'>('descend');

	const {
		data: letters = [],
		isFetching,
		refetch,
		isError,
	} = useGetLetterListQuery(
		{ currentUserEmail: currentUserEmail! },
		{ skip: !currentUserEmail, refetchOnMountOrArgChange: false },
	);
	const [debouncedIsFetching] = useDebounce(isFetching, 100);

	const [deleteLetter] = useDeleteLetterMutation();

	const deleteLetterConfirm = useConfirmDelete(
		async () => {
			await Promise.all(
				selectedKeys.map((key) =>
					deleteLetter({ id: String(key), currentUserEmail: currentUserEmail! }).unwrap(),
				),
			);
		},
		{
			title: selectedKeys.length === 1 ? 'Удалить выбранное письмо?' : 'Удалить выбранные письма?',
			messageSuccess:
				selectedKeys.length === 1 ? 'Письмо было успешно удалено' : 'Письма были успешно удалены',
			messageError:
				selectedKeys.length === 1
					? 'При удалении письма произошла ошибка. Попробуйте снова'
					: 'При удалении писем произошла ошибка. Попробуйте снова',
			onSuccess: () => {
				setSelectedKeys([]);
				refetch();
			},
			onError: () => {
				setSelectedKeys([]);
			},
		},
	);

	useEffect(() => setSelectedKeys([]), [currentUserEmail]);

	useEffect(() => {
		if (isError) {
			message.error(
				<span>
					При получении Ваших писем произошла ошибка. Нажмите кнопку
					<Tag style={{ marginLeft: token.marginXS, marginRight: token.marginXS }}>
						<ReloadOutlined />
					</Tag>
					для обновления
				</span>,
			);
		}
	}, [isError, message, token.marginXS]);

	const handleDeleteSelected = useCallback(() => {
		if (!selectedKeys.length) return;
		deleteLetterConfirm(selectedKeys as string[]);
	}, [selectedKeys, deleteLetterConfirm]);

	const filteredAndSortedLetters = useMemo(() => {
		// Фильтрация по категории
		let filtered = letters;
		if (category !== 'all') {
			filtered = letters.filter((letter) => letter.category === category);
		}

		// Сортировка по дате
		if (dateSortOrder === 'ascend') {
			filtered = filtered
				.slice()
				.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		} else if (dateSortOrder === 'descend') {
			filtered = filtered
				.slice()
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		}

		return filtered;
	}, [letters, category, dateSortOrder]);

	return (
		<>
			<div ref={container} style={{ width: '100%', height: '100%' }}>
				<div ref={usersTableRef}>
					<Table
						showHeader={false}
						size="middle"
						rowKey={(record) => record.id}
						dataSource={filteredAndSortedLetters}
						columns={columns()}
						rowSelection={{
							selectedRowKeys: selectedKeys,
							onChange: setSelectedKeys,
						}}
						scroll={{ y: usersTableHeight }}
						loading={debouncedIsFetching}
						pagination={{
							showSizeChanger: true,
							pageSizeOptions: [20, 30, 50],
							defaultPageSize: 20,
						}}
						onRow={(record) => ({
							onClick: () => {
								if (record.category === 'draft') {
									setOpenSendLetterModal(true);
									setEditingDraft(record);
								} else {
									navigate(routes.letter(record.id.toString()));
								}
							},
							style: { cursor: 'pointer' },
						})}
						title={() => (
							<Flex justify="space-between" align="center" style={{ width: '100%' }}>
								<Flex gap={token.marginXS}>
									<Button type="default" icon={<ReloadOutlined />} onClick={() => refetch()} />
									<CategoryFilterSelect
										value={category}
										onChange={(value) => setCategory(value)}
										style={{ width: 200 }}
									/>
									<Radio.Group
										options={[
											{ label: 'Сначала старые ↑', value: 'ascend' },
											{ label: 'Сначала новые ↓', value: 'descend' },
										]}
										value={dateSortOrder}
										onChange={(event) => setDateSortOrder(event.target.value)}
										optionType="button"
										buttonStyle="solid"
									/>
								</Flex>

								<Button
									type="primary"
									danger
									disabled={selectedKeys.length === 0}
									onClick={handleDeleteSelected}
									icon={<DeleteOutlined />}
								>
									Удалить
								</Button>
							</Flex>
						)}
					/>
				</div>
			</div>
			<SendLetterModal
				open={openSendLetterModal}
				onClose={() => setOpenSendLetterModal(false)}
				editingDraft={editingDraft}
			/>
		</>
	);
};
