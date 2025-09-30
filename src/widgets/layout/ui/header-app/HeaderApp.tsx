import type { FC } from 'react';
import { Button, Flex, theme } from 'antd';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { routes } from '@/shared/config';
import Logo from '@/shared/assets/images/logo.svg';
import { UserAvatarDropdown } from './UserAvatarDropdown';

interface HeaderAppProps {
	collapsed: boolean;
	onClickCollapsedButton?: React.MouseEventHandler<HTMLElement>;
}

export const HeaderApp: FC<HeaderAppProps> = ({ collapsed, onClickCollapsedButton }) => {
	const { token } = theme.useToken();

	return (
		<Header
			style={{
				paddingLeft: token.marginXS,
				paddingRight: 0,
				background: token.colorBgContainer,
				height: 'var(--header-height)',
				lineHeight: 'var(--header-height)',
			}}
		>
			<Flex vertical justify="center" style={{ width: '100%', height: '100%' }}>
				<Flex justify="space-between">
					<Flex align="center" gap={token.marginXS}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={onClickCollapsedButton}
						/>

						<Link
							to={routes.main()}
							style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
						>
							<Logo style={{ height: 25, width: 'auto' }} />
						</Link>
					</Flex>

					<Flex align="center" gap={token.marginXS}>
						<UserAvatarDropdown />
					</Flex>
				</Flex>
			</Flex>
		</Header>
	);
};
