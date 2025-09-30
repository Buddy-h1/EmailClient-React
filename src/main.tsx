import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { StoreProvider } from './app/store/StoreProvider';
import { UnhandledError } from './shared/ui';
import { EmailApp } from './app/EmailApp';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary FallbackComponent={UnhandledError} key={location.pathname}>
				<App
					notification={{ placement: 'bottomLeft' }}
					message={{ top: 'calc(100vh - 125px)', maxCount: 2 }}
				>
					<EmailApp />
				</App>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>,
);
