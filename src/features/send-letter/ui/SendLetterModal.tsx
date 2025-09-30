import { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, type ModalProps } from 'antd';
import { useCreateLetterMutation, useUpdateLetterMutation } from '@/entities/letter';
import { getAuthEmail } from '@/entities/auth';
import type { Letter } from '@/entities/letter';
import { useAppSelector, type StrictOmit } from '@/shared/utils';
import { nameof } from 'ts-simple-nameof';
import useApp from 'antd/es/app/useApp';
import { RecipientSelect } from './RecipientSelect';

interface SendLetterModalProps extends StrictOmit<ModalProps, 'footer'> {
	open: boolean;
	onClose: () => void;
	editingDraft?: Partial<Letter> | null;
}

interface SendLetterFormValues {
	to: Letter['to'];
	subject: Letter['subject'];
	body: Letter['body'];
}

export const SendLetterModal = ({
	open,
	onClose,
	editingDraft,
	...modalProps
}: SendLetterModalProps) => {
	const { message } = useApp();
	const [form] = Form.useForm<SendLetterFormValues>();
	const [createLetter, { isLoading: isCreating }] = useCreateLetterMutation();
	const [updateLetter, { isLoading: isUpdating }] = useUpdateLetterMutation();

	const currentEmailUser = useAppSelector(getAuthEmail);

	useEffect(() => {
		if (!open) return;

		if (editingDraft) {
			form.setFieldsValue({
				to: editingDraft.to,
				subject: editingDraft.subject,
				body: editingDraft.body,
			});
		} else {
			form.resetFields();
		}
	}, [editingDraft, form, open]);

	const handleSubmit = async (saveAsDraft: boolean) => {
		try {
			if (!currentEmailUser) return;
			const values = await form.validateFields();

			const letterPayload: Letter = {
				...editingDraft,
				id: editingDraft?.id || '',
				isDraft: editingDraft?.isDraft || false,
				deletedBy: editingDraft?.deletedBy || [],
				from: currentEmailUser,
				to: values.to,
				subject: values.subject,
				body: values.body,
				date: new Date().toISOString(),
				category: saveAsDraft ? 'draft' : 'sent',
			};

			if (editingDraft && editingDraft?.id) {
				await updateLetter(letterPayload)
					.unwrap()
					.then(() => {
						message.success(saveAsDraft ? 'Черновик обновлен' : 'Письмо отправлено');
						onClose();
					})
					.catch(() => {
						message.error(
							saveAsDraft
								? 'Произошла ошибка при редактировании черновика'
								: 'Произошла ошибка при отправке письма',
						);
					});
			} else {
				await createLetter(letterPayload)
					.unwrap()
					.then(() => {
						message.success(saveAsDraft ? 'Черновик сохранен' : 'Письмо отправлено');
						onClose();
					})
					.catch(() => {
						message.error(
							saveAsDraft
								? 'Произошла ошибка при сохранении черновика'
								: 'Произошла ошибка при отправке письма',
						);
					});
			}
		} catch {
			// Обработка исключений не требуется
		}
	};

	return (
		<Modal
			confirmLoading={isCreating || isUpdating}
			title={editingDraft ? 'Редактировать черновик' : 'Новое письмо'}
			destroyOnHidden
			{...modalProps}
			open={open}
			onCancel={onClose}
			footer={
				<Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button onClick={() => handleSubmit(true)} loading={isCreating || isUpdating}>
						Сохранить черновик
					</Button>
					<Button
						type="primary"
						onClick={() => handleSubmit(false)}
						loading={isCreating || isUpdating}
					>
						Отправить
					</Button>
				</Space>
			}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					label="Получатель"
					name={nameof<SendLetterFormValues>((l) => l.to)}
					rules={[{ required: true, message: 'Укажите хотя бы одного получателя' }]}
				>
					<RecipientSelect placeholder="Выберите получателя" />
				</Form.Item>

				<Form.Item label="Тема" name={nameof<SendLetterFormValues>((l) => l.subject)}>
					<Input placeholder="О чем вы хотите написать?" />
				</Form.Item>

				<Form.Item
					label="Текст письма"
					name={nameof<SendLetterFormValues>((l) => l.body)}
					rules={[{ required: true, message: 'Введите текст письма' }]}
				>
					<Input.TextArea rows={6} placeholder="Расскажите всё, что хотели бы сказать..." />
				</Form.Item>
			</Form>
		</Modal>
	);
};
