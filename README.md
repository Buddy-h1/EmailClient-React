# EmailClient-React - Тестовое задание

Для запуска проекта необходимо:

1. Клонировать репозиторий

2. Установить зависимости командой npm install

3. Запустить проект командой npm run dev:all

Фронтенд будет доступен по адресу: http://localhost:5173. API JSON Server доступен по адресу: http://localhost:4000

Описание скриптов:

- npm run dev — запуск проекта в режиме разработки (Vite)

- npm run server — запуск JSON-сервера для локального API (http://localhost:4000)

- npm run dev:all — одновременный запуск фронтенда и сервера

- npm run build — сборка проекта

- npm run preview — просмотр собранного проекта

- npm run lint — проверка кода через ESLint

- npm run lint-fsd — проверка структуры FSD через Steiger

Логика симуляции ошибок сервера находится в файле src/shared/injectRandomServerErrors.ts и подключается в app/EmailApp.tsx
При необходимости её можно отключить, закомментировав или удалив импорт в EmailApp.tsx
