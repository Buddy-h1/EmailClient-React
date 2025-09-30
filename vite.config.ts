import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // Плагин для работы с SVG
import tsconfigPaths from 'vite-tsconfig-paths'; // Автоматически добавляет пути из tsconfig.json
import eslint from 'vite-plugin-eslint2'; // Проверяет код ESLint при сборке и разработке
import checker from 'vite-plugin-checker'; // Выводит ошибки в консоль и на страницу браузера

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({ include: '**/*.svg' }),
		tsconfigPaths(),
		eslint(),
		checker({ typescript: true, overlay: false }),
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:4000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
