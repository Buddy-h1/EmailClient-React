import { type FC, useEffect, useRef, useState } from 'react';
import { Alert, Button, Result, Typography } from 'antd';

interface UnhandledErrorProps {
	error: Error;
	resetErrorBoundary: () => void;
}

export const UnhandledError: FC<UnhandledErrorProps> = ({ error, resetErrorBoundary }) => {
	const [expanded, setExpanded] = useState(false);
	const [hasParentPadding, setHasParentPadding] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current?.parentElement) {
			const parentStyles = getComputedStyle(containerRef.current.parentElement);
			const parentPadding = parseInt(parentStyles.padding) || 0;
			setHasParentPadding(parentPadding > 0);
		}
	}, []);

	return (
		<div ref={containerRef} style={{ padding: hasParentPadding ? 0 : 20 }}>
			<Result
				status="error"
				title="Что-то пошло не так"
				subTitle="Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова позже"
				extra={[
					<Button key="reload-button" type="primary" onClick={() => window.location.reload()}>
						Перезагрузить страницу
					</Button>,
					<Button key="reset-button" type="default" onClick={resetErrorBoundary}>
						Попробовать снова
					</Button>,
				]}
			/>
			<div style={{ marginBottom: 20 }}>
				<Typography.Title level={5}>Сообщение об ошибке</Typography.Title>
				<pre>{error.message}</pre>
			</div>

			<Typography.Title level={5}>Стек вызовов</Typography.Title>
			<Alert
				description={
					<Typography.Paragraph
						ellipsis={{
							rows: 5,
							expandable: 'collapsible',
							symbol: expanded ? 'Скрыть' : 'Показать больше',
							expanded,
							onExpand: (_, info) => setExpanded(info.expanded),
						}}
						copyable
						style={{ whiteSpace: 'pre-wrap' }}
					>
						{error.stack}
					</Typography.Paragraph>
				}
				type="error"
			/>
		</div>
	);
};
