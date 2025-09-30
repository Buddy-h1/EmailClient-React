import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';

interface LetterPageErrorProps {
	refetch: () => void;
}

export const LetterPageError: FC<LetterPageErrorProps> = ({ refetch }) => {
	const navigate = useNavigate();

	return (
		<Result
			status="error"
			title="Не удалось загрузить письмо"
			subTitle="Произошла ошибка при получении данных. Попробуйте снова."
			extra={[
				<Button key="back" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
					Назад
				</Button>,
				<Button key="retry" type="primary" icon={<ReloadOutlined />} onClick={() => refetch()}>
					Повторить
				</Button>,
			]}
		/>
	);
};
