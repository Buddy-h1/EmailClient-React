import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
	...fsd.configs.recommended,

	{
		rules: {
			'fsd/repetitive-naming': 'off', // Отключает правило, проверяющее повторяющиеся названия файлов и директорий
			'fsd/insignificant-slice': 'off', // Отключает проверку на "незначительные" слайсы (слишком маленькие модули)
		},
	},

	{
		files: ['./src/shared/assets/**'],
		rules: {
			'fsd/public-api': 'off', // Отключает правило обязательного public-api в сегменте
		},
	},

	{
		files: ['./src/shared/utils/**'],
		rules: {
			'fsd/segments-by-purpose': 'off', // Отключает правило именования сегмента
		},
	},
]);
