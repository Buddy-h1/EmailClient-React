import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Divider, theme, Flex, Tag } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDebounce } from 'use-debounce';
import { useGetLetterByIdQuery, useDeleteLetterMutation } from '@/entities/letter';
import { getAuthEmail } from '@/entities/auth';
import { categoryMapRu } from '@/entities/letter';
import { useAppSelector } from '@/shared/utils';
import { useConfirmDelete } from '@/features/confirm-delete';
import { routes } from '@/shared/config';
import { SendLetterModal } from '@/features/send-letter';
import { LetterPageSkeleton } from './LetterPageSkeleton';
import { LetterPageError } from './LetterPageError';

export const LetterPage: React.FC = () => {
	const { token } = theme.useToken();
	const { id: letterId } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [openSendLetterModal, setOpenSendLetterModal] = useState(false);
	const currentUserEmail = useAppSelector(getAuthEmail);

	const {
		data: letter,
		isFetching,
		isError,
		refetch,
	} = useGetLetterByIdQuery(
		{ id: letterId!, currentUserEmail: currentUserEmail! },
		{
			skip: !letterId,
		},
	);
	const [debouncedIsFetching] = useDebounce(isFetching, 100);

	const [deleteLetter] = useDeleteLetterMutation();
	const deleteLetterConfirm = useConfirmDelete(
		async () => {
			await deleteLetter({ id: String(letterId), currentUserEmail: currentUserEmail! }).unwrap();
		},
		{
			title: 'Удалить письмо?',
			messageSuccess: 'Письмо было успешно удалено',
			messageError: 'При удалении письма произошла ошибка. Попробуйте снова',
			onSuccess: () => navigate(routes.mail()),
		},
	);

	const handleDelete = async () => {
		if (!letterId) return;
		deleteLetterConfirm([letterId]);
	};

	if (debouncedIsFetching) return <LetterPageSkeleton />;
	if (isError || !letter) return <LetterPageError refetch={refetch} />;

	return (
		<>
			<Flex justify="space-between" style={{ marginBottom: token.margin }}>
				<Flex gap={token.marginXS}>
					<Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
					<Button icon={<EditOutlined />} onClick={() => setOpenSendLetterModal(true)}>
						Ответить
					</Button>
				</Flex>
				<Button type="primary" danger onClick={handleDelete} icon={<DeleteOutlined />}>
					Удалить
				</Button>
			</Flex>

			<Card>
				<Typography.Title level={3}>{letter.subject || '<Без темы>'}</Typography.Title>
				<Divider />
				<Typography.Text strong>От: </Typography.Text>
				<Typography.Text>{letter.from}</Typography.Text>
				<br />
				<Typography.Text strong>Кому: </Typography.Text>
				<Typography.Text>{letter.to}</Typography.Text>
				<br />
				<Typography.Text strong>Дата: </Typography.Text>
				<Typography.Text>{new Date(letter.date).toLocaleString()}</Typography.Text>
				<br />
				<Typography.Text type="secondary" style={{ display: 'block', marginTop: token.marginXS }}>
					Категория: <Tag>{categoryMapRu[letter.category]}</Tag>
				</Typography.Text>
				<Divider />
				<Typography.Paragraph
					style={{ whiteSpace: 'pre-wrap', fontSize: token.fontSizeLG, marginBottom: 0 }}
				>
					{letter.body}
				</Typography.Paragraph>
			</Card>
			<SendLetterModal
				title="Ответное письмо"
				open={openSendLetterModal}
				onClose={() => setOpenSendLetterModal(false)}
				editingDraft={{
					to: letter.category === 'sent' ? letter.to : letter.from,
					subject: letter.subject,
				}}
			/>
		</>
	);
};
