import type { FC } from 'react';
import { Flex, Skeleton, Card, Divider, theme } from 'antd';

export const LetterPageSkeleton: FC = () => {
	const { token } = theme.useToken();

	return (
		<>
			<Flex justify="space-between" style={{ marginBottom: token.margin }}>
				<Flex gap={token.marginXS}>
					<Skeleton.Button active />
					<Skeleton.Button active />
				</Flex>
				<Skeleton.Button active />
			</Flex>
			<Card>
				<Skeleton active title={{ width: 500 }} paragraph={false} />
				<Divider />
				<Flex vertical gap={token.marginXS}>
					<Flex gap={token.marginXS} align="center">
						<Skeleton.Button active size="small" style={{ width: 40 }} />
						<Skeleton.Input active size="small" style={{ width: 120 }} />
					</Flex>

					<Flex gap={token.marginXS} align="center">
						<Skeleton.Button active size="small" style={{ width: 60 }} />
						<Skeleton.Input active size="small" style={{ width: 180 }} />
					</Flex>

					<Flex gap={token.marginXS} align="center">
						<Skeleton.Button active size="small" style={{ width: 50 }} />
						<Skeleton.Input active size="small" style={{ width: 140 }} />
					</Flex>

					<Flex gap={token.marginXS} align="center">
						<Skeleton.Button active size="small" style={{ width: 70 }} />
						<Skeleton.Input active size="small" style={{ width: 80 }} />
					</Flex>
					<Divider />
					<Skeleton paragraph={{ rows: 5 }} active />
				</Flex>
			</Card>
		</>
	);
};
