import { type FC, memo, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { UnhandledError } from '@/shared/ui';
import { HeaderApp } from './header-app/HeaderApp';
import { SiderApp } from './sider-app/SiderApp';

interface MainLayoutProps {
	children?: ReactNode;
}

const HeaderAppMemp = memo(HeaderApp);

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	const { token } = theme.useToken();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);

	const contentRef = useRef<HTMLDivElement | null>(null);
	const { pathname } = useLocation();

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = 0;
		}
	}, [pathname]);

	const handleCollapsedToggle = useCallback(() => {
		setCollapsed((prev) => !prev);
	}, []);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<HeaderAppMemp collapsed={collapsed} onClickCollapsedButton={handleCollapsedToggle} />

			<Layout style={{ minHeight: '100vh - var(--header-height)' }}>
				<SiderApp collapsed={collapsed} />
				<Layout>
					<Content
						ref={contentRef}
						style={{
							padding: token.padding,
							overflowY: 'auto',
							maxHeight: 'calc(100vh - var(--header-height))',
						}}
					>
						<ErrorBoundary FallbackComponent={UnhandledError} key={location.pathname}>
							{children}
						</ErrorBoundary>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};
