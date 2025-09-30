import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import { antdComponentsConfig, antdGlobalConfig } from '@/shared/config';
import { AppRouter } from './router/AppRouter';
import '@/app/EmailApp.css';
import '../shared/injectRandomServerErrors';

import 'dayjs/locale/ru';
import { MainLayout } from '@/widgets/layout';

export const EmailApp = () => {
	useEffect(() => {
		dayjs.extend(updateLocale);
		dayjs.extend(localeData);
		dayjs.updateLocale('ru', { weekStart: 1 });
	}, []);

	return (
		<ConfigProvider
			locale={ruRU}
			theme={{
				token: antdGlobalConfig,
				components: antdComponentsConfig,
				cssVar: true,
			}}
		>
			<MainLayout>
				<AppRouter />
			</MainLayout>
		</ConfigProvider>
	);
};
