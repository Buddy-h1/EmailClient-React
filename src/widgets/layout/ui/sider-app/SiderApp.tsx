import { useState, type FC } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { Button, Menu, Layout, theme } from 'antd';
import { InboxOutlined, EditOutlined, AntDesignOutlined } from '@ant-design/icons';
import { routes } from '@/shared/config';
import { SendLetterModal } from '@/features/send-letter';

interface SiderAppProps {
	collapsed: boolean;
}

type MenuItemType = NonNullable<Parameters<typeof Menu>[0]['items']>[number] & {
	matchPaths?: string[];
};

const MENU_ITEMS: MenuItemType[] = [
	{
		key: '1',
		icon: <InboxOutlined />,
		label: <NavLink to={routes.mail()}>Письма</NavLink>,
		matchPaths: [routes.mail(), routes.letter()],
	},
	{
		key: '2',
		icon: <AntDesignOutlined />,
		label: 'Пункт 2',
	},
	{
		key: '3',
		icon: <AntDesignOutlined />,
		label: 'Пункт 3',
	},
];

export const SiderApp: FC<SiderAppProps> = ({ collapsed }) => {
	const { token } = theme.useToken();
	const location = useLocation();
	const [openSendLetterModal, setOpenSendLetterModal] = useState(false);

	const activeKey = MENU_ITEMS.find((item) =>
		item.matchPaths?.some((pathPattern) =>
			matchPath({ path: pathPattern, end: false }, location.pathname),
		),
	)?.key;

	return (
		<>
			<Layout.Sider theme="light" collapsible collapsed={collapsed} trigger={null}>
				<div
					style={{
						margin: token.marginXXS,
						marginTop: token.marginXS,
						marginBottom: token.marginXS,
					}}
				>
					<Button
						block
						size="large"
						type="primary"
						icon={<EditOutlined />}
						onClick={() => setOpenSendLetterModal(true)}
					>
						{!collapsed && 'Написать'}
					</Button>
				</div>

				<Menu
					selectedKeys={activeKey ? [String(activeKey)] : []}
					/* eslint-disable-next-line @typescript-eslint/no-unused-vars 
						-- Необходимо, чтобы исключить matchPaths из объектов */
					items={MENU_ITEMS.map(({ matchPaths, ...item }) => item)}
				/>
			</Layout.Sider>
			<SendLetterModal open={openSendLetterModal} onClose={() => setOpenSendLetterModal(false)} />
		</>
	);
};
