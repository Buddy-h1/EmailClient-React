import { useEffect, useRef, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Flex, Skeleton, type MenuProps, theme, Typography } from 'antd';
import useApp from 'antd/es/app/useApp';
import { UserOutlined } from '@ant-design/icons';
import { getAuthEmail, setUser, useGetAuthUserListQuery } from '@/entities/auth';
import { useAppDispatch, useAppSelector } from '@/shared/utils';
import { routes } from '@/shared/config';
import { useStylesHeaderApp } from './useStylesHeaderApp';

export const UserAvatarDropdown: FC = () => {
	const { token } = theme.useToken();
	const navigate = useNavigate();
	const { styles } = useStylesHeaderApp();
	const { message } = useApp();

	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(getAuthEmail);
	const { data: users, error } = useGetAuthUserListQuery();

	useEffect(() => {
		if (!currentUser && users && users.length > 0) {
			dispatch(setUser(users[0]));
		}
	}, [currentUser, users, dispatch]);

	const errorShown = useRef(false);
	useEffect(() => {
		if (users && users.length > 0) {
			errorShown.current = true;
		}

		if (error && !errorShown.current) {
			message.error('Ошибка при загрузке пользователей. Пожалуйста, обновите страницу');
			errorShown.current = true;
		}
	}, [error, users, message]);

	const items: MenuProps['items'] = [
		...(users?.map((user) => ({
			key: user.email,
			label: <Typography.Text strong={user.email === currentUser}>{user.email}</Typography.Text>,
			icon: <UserOutlined />,
			className: styles.menuItem,
			onClick: () => {
				dispatch(setUser(user));
				navigate(routes.main());
			},
		})) ?? []),
	];

	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
			align={{ offset: [-token.margin, token.marginXXS] }}
		>
			<Flex
				align="center"
				gap={token.marginXS}
				className={styles.hoverBgPrimary}
				style={{
					paddingLeft: token.margin,
					paddingRight: token.margin,
					cursor: 'pointer',
					height: 'var(--header-height)',
				}}
			>
				<Avatar size="large" icon={<UserOutlined />} style={{ flexShrink: 0 }} />
				{!users ? (
					<Skeleton active paragraph={false} style={{ width: 120 }} />
				) : (
					<Typography.Text style={{ whiteSpace: 'nowrap' }}>{currentUser}</Typography.Text>
				)}
			</Flex>
		</Dropdown>
	);
};
