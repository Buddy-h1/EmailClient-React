import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginReact from 'eslint-plugin-react'; // Линтинг специфичных для React правил
import eslintComments from 'eslint-plugin-eslint-comments'; // Улучшает работу с комментариями ESLint (например, запрещает бесполезные disable)
import eslintConfigPrettier from 'eslint-config-prettier'; // Отключает конфликтующие правила ESLint с Prettier
import prettierPlugin from 'eslint-plugin-prettier'; // Запускает Prettier в ESLint как правило

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		plugins: {
			react: pluginReact,
			prettier: prettierPlugin,
			'eslint-comments': eslintComments,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			...prettierPlugin.configs.recommended.rules, // Включает проверку форматирования Prettier как правило ESLint
			...eslintConfigPrettier.rules, // Отключает правила ESLint, которые конфликтуют с Prettier

			// Правила Prettier
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],

			// Общие ограничения ESLint
			'max-lines': ['warn', { max: 300 }],
			'max-params': ['error', 5],

			// Правила для React
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Разрешает экспорт только компонентов (важно для React Fast Refresh)
			'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }], // Убирает лишние `{}` в JSX, если это не нужно
			'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }], // Требует использовать стрелочные функции для компонентов
			'react/self-closing-comp': ['error', { component: true, html: true }], // Требует самозакрывающийся синтаксис для пустых тегов (<br> → <br />)
			'react-hooks/rules-of-hooks': 'error',

			// TypeScript правила
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
				},
			],

			// Комментарии ESLint
			'eslint-comments/require-description': 'warn',
		},
	},
]);
