import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { routes } from '@/shared/config';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	return (
		<Result
			status="404"
			title="Страница не найдена"
			subTitle="Этой страницы не существует или она была перемещена. Вы можете вернуться на главную или попробовать другой путь"
			extra={[
				<Button type="primary" onClick={() => navigate(routes.main(), { replace: true })}>
					На главную
				</Button>,
				<Button onClick={() => navigate(-1)}>Назад</Button>,
			]}
		/>
	);
};
