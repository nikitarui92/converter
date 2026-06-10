# Converter

HTML → PDF сервис на Node.js. Принимает HTML и возвращает готовый PDF, используя удалённый Chromium (Browserless) через Puppeteer.

## Архитектура

Сервис состоит из двух контейнеров:

- **converter** — Express-приложение (этот репозиторий). Принимает HTTP-запросы и генерирует PDF.
- **browser** — [Browserless Chromium](https://github.com/browserless/browserless). Запускает Chromium, к которому converter подключается по WebSocket (CDP). Свой Chromium сервис не запускает.

```
client ──HTTP──> converter ──WebSocket(CDP)──> browser (Chromium)
```

## Требования

- Docker и Docker Compose
- Либо для локального запуска без Docker: Node.js 22+ и доступный Browserless-эндпоинт

## Запуск через Docker

```bash
docker compose up --build -d
```

Сервис будет доступен на `http://localhost:3003`.

Остановить:

```bash
docker compose down
```

## Переменные окружения

| Переменная                | Назначение                                  | По умолчанию        |
| ------------------------- | ------------------------------------------- | ------------------- |
| `PORT`                    | Порт сервиса converter                      | `3000` (`3003` в compose) |
| `BROWSER_WS_ENDPOINT`     | WebSocket-адрес Browserless                 | `ws://browser:3000` |
| `BROWSER_TOKEN`           | Токен авторизации Browserless               | `''`                |
| `BROWSER_CONNECT_TIMEOUT` | Таймаут CDP-протокола (мс)                  | `30000`             |
| `NODE_ENV`                | Окружение                                   | —                   |

Настройки Browserless (в сервисе `browser`):

| Переменная   | Назначение                              | Значение  |
| ------------ | --------------------------------------- | --------- |
| `TOKEN`      | Токен авторизации                       | —         |
| `CONCURRENT` | Макс. число параллельных сессий браузера | `2`       |

> `shm_size: '1gb'` для контейнера `browser` увеличивает `/dev/shm`, чтобы Chromium не падал при рендеринге тяжёлых страниц.

## API

Базовый префикс: `/html`

### `POST /html/pdf`

Генерация PDF из HTML, переданного в формате base64.

**Тело запроса (JSON):**

```json
{
  "htmlBase64": "PGgxPkhlbGxvPC9oMT4="
}
```

**Ответ:** `application/pdf` (скачивается как файл).

Пример:

```bash
curl -X POST http://localhost:3003/html/pdf \
  -H "Content-Type: application/json" \
  -d "{\"htmlBase64\":\"$(echo -n '<h1>Hello</h1>' | base64)\"}" \
  --output document.pdf
```

### `POST /html/pdf/upload`

Генерация PDF из загруженного HTML-файла (multipart/form-data, поле `html`).

```bash
curl -X POST http://localhost:3003/html/pdf/upload \
  -F "html=@page.html" \
  --output document.pdf
```

## Локальная разработка

```bash
npm install
npm start
```

Скрипт `start` запускает приложение с `--env-file=.env`, поэтому создайте файл `.env` с нужными переменными (как минимум `BROWSER_WS_ENDPOINT`).

## Структура проекта

```
src/
  app.js                  точка входа, настройка Express
  config.js               чтение переменных окружения
  lib/
    browser.js            подключение к Browserless, переподключение при разрыве
  routers/
    html.router.js        маршруты /html/pdf и /html/pdf/upload
  services/
    pdf.service.js        генерация PDF из HTML/URL через Puppeteer
```
