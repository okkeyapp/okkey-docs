---
title: Этапы установки
sidebar_position: 3
plans: [free, enterprise]
---

# Этапы установки

Поставьте Okkey одной командой. Репозиторий клонировать не нужно.

Поддерживается только Docker Compose. Kubernetes и Helm запланированы и не входят в v1.0.0.

Файлы установки берутся с релиза `v1.0.0-beta.2`, образы — с тега `1.0.0-beta.2`. Скрипт проверяет подписи образов через cosign. Проверка включена по умолчанию.

Команды ниже закреплены на `v1.0.0-beta.2`. Так устроена текущая страница установки.

Установка работает на тарифе «Бесплатный». Тариф «Предприятие» подключает сотрудник Okkey. См. [Предприятие](./enterprise.md) и [Тарифы](../plans.md).

## Перед запуском

Нужны программы со страницы [Требования](./requirements.md): Docker Engine 28 или новее, плагин Compose, `curl`, `bash` и cosign.

Обязателен адрес `OKKEY_SALES_EMAIL`. Это почта, на которую Okkey отправит заявку на смену тарифа. Запасного адреса в продукте нет.

- Если у скрипта есть терминал, он спросит `OKKEY_SALES_EMAIL:` и не пойдёт дальше, пока адрес не будет похож на почту: один `@`, точка в домене, без пробелов.
- Если скрипт запущен через пайп и терминала нет, установка останавливается. Передайте адрес справа от `|`.

Переменные ставьте справа от `|`. Запись `OKKEY_SALES_EMAIL=… curl … | bash` в скрипт не попадает.

## Установка

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/install.sh \
  | OKKEY_REF=v1.0.0-beta.2 OKKEY_IMAGE_TAG=1.0.0-beta.2 OKKEY_SALES_EMAIL=you@example.com bash
```

Замените `you@example.com` на свой адрес. Если терминал есть и переменную не задавать, скрипт спросит её сам.

Каталог установки — `~/okkey`. Имя проекта Compose — имя каталога в нижнем регистре. Для `~/okkey` это `okkey`.

Скрипт делает четыре шага:

1. Проверяет `OKKEY_SALES_EMAIL`, ещё не переписывая файлы.
2. Создаёт каталог и скачивает `docker-compose.prod.yml` и `.env.example`.
3. При первом запуске записывает секреты и пароли в `.env`, затем подставляет адрес заявок.
4. Скачивает образы, проверяет подписи `api`, `web` и `worker` и запускает стек.

После старта скрипт печатает адрес веба. По умолчанию это `http://localhost:8080`. Проверка API на той же машине: `http://127.0.0.1:4000/health`. Ответ содержит `"status": "ok"`. С другой машины этот порт API не открыт.

## Что лежит в `.env` и что сохранить

Файл `~/okkey/.env` создаётся один раз. Повторный запуск скрипта его не перезаписывает и не меняет в нём `OKKEY_IMAGE_TAG`.

При первой установке скрипт сам записывает:

| Переменная | Зачем хранить |
| --- | --- |
| `POSTGRES_PASSWORD` | Пароль базы. Postgres принимает его только при первом создании тома. Новый пароль к старым данным не подойдёт. |
| `SESSION_SECRET` | Сессии и секрет второго фактора. Новый секрет не открывает то, что запечатано старым. |
| `JWT_SECRET` | Принимается как запасное имя того же секрета сессий. |
| `EMAIL_DEAD_LETTER_SEAL_KEY` | Запечатывает письма с кодом, которые не удалось отправить. Если ключа нет, используется `SESSION_SECRET`. |
| `MINIO_ROOT_PASSWORD` | Пароль хранилища файлов. |
| `OKKEY_SALES_EMAIL` | Куда уходит заявка на тариф. Без адреса API не стартует. |
| `OKKEY_UPDATE_AGENT_TOKEN` | Скрипт создаёт его, если поля не было. |

Рядом остаются `OKKEY_IMAGE_TAG=1.0.0-beta.2`, адреса `PUBLIC_APP_URL` и `OKKEY_API_PUBLIC_URL`, параметры входа по ключу устройства и политика шифрования. Её не меняйте. Допустим только профиль 2:

```text
DEPLOY_ENV=dev
CRYPTO_ALLOWED_PROFILE_VERSIONS=2
CRYPTO_ROLLOUT_MODE=compat
```

Новые регистрации используют KDF v2. Другой профиль может не дать зарегистрироваться.

Скопируйте `.env` в надёжное место вместе с копией данных. Как это сделать — на странице [Копирование и восстановление](../admin/backup-restore.md).

:::warning
Пароль базы применяется при первом создании данных. Если удалить `.env` и запустить установку снова, пока том Postgres ещё есть, скрипт остановится и новый пароль не запишет. Верните старый `.env`. Стирание томов (`OKKEY_RESET_VOLUMES=1`) удаляет базу, сессии и файлы.
:::

Полезные переменные установщика:

| Переменная | Смысл |
| --- | --- |
| `OKKEY_REF` | Git-ref файлов установки. Для этого релиза: `v1.0.0-beta.2`. |
| `OKKEY_IMAGE_TAG` | Тег образов при первой записи `.env`. Для этого релиза: `1.0.0-beta.2`. |
| `OKKEY_SALES_EMAIL` | Почта для заявок на тариф. Обязательна. |
| `OKKEY_INSTALL_DIR` | Каталог. По умолчанию `~/okkey`. |
| `WEB_PORT` / `API_PORT` | Порты на машине. По умолчанию `8080` и `4000`. Если задать только их, скрипт подставит те же порты в публичные адреса. |
| `OKKEY_RESET_VOLUMES=1` | Удалить данные базы, сессий и файлов перед стартом. |

## Образы и проверка cosign

Образы: `ghcr.io/okkeyapp/api`, `ghcr.io/okkeyapp/web`, `ghcr.io/okkeyapp/worker`. Их можно скачать без входа в реестр. Тег этого релиза — `1.0.0-beta.2`. Плавающий тег `latest` для установки не используется.

Перед запуском скрипт проверяет подпись cosign у скачанного дайджеста `api`, `worker` и `web`. Подпись без ключа, от GitHub Actions, издатель `https://token.actions.githubusercontent.com`. Образы Postgres, Redis и MinIO этой проверкой не покрыты.

Проверить один образ после скачивания:

```bash
digest="$(docker image inspect --format '{{index .RepoDigests 0}}' ghcr.io/okkeyapp/api:1.0.0-beta.2)"
cosign verify \
  --certificate-identity-regexp '^https://github\.com/okkeyapp/okkey/\.github/workflows/publish-images\.yml@refs/(?:heads/dev|tags/v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  "$digest"
```

То же для `ghcr.io/okkeyapp/worker:1.0.0-beta.2` и `ghcr.io/okkeyapp/web:1.0.0-beta.2`.

## Ручная установка

1. Скачайте файлы релиза `v1.0.0-beta.2`.

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/.env.example"
cp .env.example .env
```

2. В `.env` замените пароли и секреты. Оставьте `OKKEY_IMAGE_TAG=1.0.0-beta.2`. Запишите реальный `OKKEY_SALES_EMAIL`. Для сайта с HTTPS задайте `PUBLIC_APP_URL`, `OKKEY_API_PUBLIC_URL`, `CORS_ORIGIN`, `WEBAUTHN_ORIGINS`, `WEBAUTHN_RP_ID`. Профиль шифрования оставьте как в примере: только `2`.
3. Скачайте образы и проверьте подписи командой выше. Затем запустите контейнеры.

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env pull
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

Перед вебом и API для доступа с других машин поставьте [прокси](./domain-tls.md). Сама установка HTTPS не включает. Порт API остаётся на `127.0.0.1`.

## Первый вход без почты

Пока в базе нет пользователей, первый аккаунт создаётся без письма. Откройте адрес, который напечатал установщик.

1. На экране «Добро пожаловать в Okkey» введите email и нажмите «Войти».
2. Код для этого первого аккаунта не нужен. Откроется «Регистрация в Okkey».
3. Дальше — [первая настройка](../getting-started/first-setup.md).

Следующий вход и следующий аккаунт запрашивают код из 6 цифр. Пока почта не настроена, код пишет воркер в лог. Установщик по умолчанию ставит `EMAIL_PROVIDER=logger` и `DEPLOY_ENV=dev`, поэтому текст письма попадает в лог.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env logs -f worker
```

Ищите строку `email sent`. Код лежит в поле `plainText`. В теме письма цифры кода скрыты. Если каталог не `~/okkey`, подставьте его имя в нижнем регистре вместо `okkey`.

Как включить настоящие письма — на странице [Почта](./email.md).

## Как проверить

На той же машине:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

В `ps` сервисы `api`, `web` и `worker` в состоянии running, у `api` — healthy. В ответе `/health` есть `"status": "ok"` и `"service": "okkey-api"`. В браузере на этой машине открывается `http://localhost:8080`, если порт не меняли.

## Дальше

- [Домен и TLS](./domain-tls.md)
- [Почта](./email.md)
- [Первая настройка](../getting-started/first-setup.md)
- [Если установка не пошла](./troubleshooting.md)
- [Копирование и восстановление](../admin/backup-restore.md)
- [Тарифы](../plans.md)
