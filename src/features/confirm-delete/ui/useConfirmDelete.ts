import { useCallback } from 'react';
import useApp from 'antd/es/app/useApp';

interface useConfirmDeleteProps {
	messageSuccess?: string;
	messageError?: string;
	title?: string;
	okText?: string;
	cancelText?: string;
	onSuccess?: () => void;
	onError?: (error?: unknown) => void;
}

export const useConfirmDelete = <IDType = number | string>(
	deleteFn: () => Promise<void>,
	options?: useConfirmDeleteProps,
) => {
	const { modal, message } = useApp();

	const confirmDelete = useCallback(
		(ids: IDType[]) => {
			if (!ids.length) return;

			const confirmModal = modal.confirm({
				title: options?.title || 'Удалить выбранные элементы?',
				okText: options?.okText || 'Удалить',
				cancelText: options?.cancelText || 'Отмена',
				maskClosable: false,
				keyboard: false,
				okButtonProps: { loading: false },
				cancelButtonProps: { disabled: false },
				onOk: async () => {
					confirmModal.update({
						okButtonProps: { loading: true },
						cancelButtonProps: { disabled: true },
					});

					try {
						await deleteFn();
						message.success(options?.messageSuccess || 'Элементы были успешно удалены');
						options?.onSuccess?.();
					} catch (error) {
						message.error(
							options?.messageError || 'Произошла ошибка при удалении. Попробуйте снова',
						);
						options?.onError?.(error);
					} finally {
						confirmModal.update({
							okButtonProps: { loading: false },
							cancelButtonProps: { disabled: false },
						});
					}
				},
			}) as ReturnType<typeof modal.confirm>;
		},
		[deleteFn, modal, message, options],
	);

	return confirmDelete;
};
