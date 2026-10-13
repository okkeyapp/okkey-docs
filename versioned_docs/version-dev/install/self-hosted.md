---
title: Этапы установки
sidebar_position: 3
plans: [free, enterprise]
---

# Этапы установки

Предпочтительный путь из корневого README ветки `dev` — одна команда, без клонирования монорепозитория:

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/install.sh | bash
```

`OKKEY_REF` по умолчанию — `dev`. Каталог установки — `~/okkey` (`OKKEY_INSTALL_DIR`).

Скрипт:

1. Создаёт каталог установки.
2. Скачивает `docker-compose.prod.yml` и `.env.example` с выбранного ref.
3. Генерирует `JWT_SECRET`, `SESSION_SECRET` и пароли Postgres и MinIO в `.env`.
4. Делает `docker compose pull` и `up -d`.

После старта веб открывается на `PUBLIC_APP_URL` или `http://localhost:$WEB_PORT` (по умолчанию `http://localhost:8080`). Проверка API: `http://localhost:4000/health`.

## Что важно на ветке dev

`deploy/docker/README.md` в той же ветке всё ещё описывает временный ref `cursor/self-host-docker-2ea1` и тег `0.0.0-pr19.4`, пока пакеты GHCR могут быть закрыты. Если `docker compose pull` с `dev` не находит образы, ориентируйтесь на этот README и переменную `OKKEY_IMAGE_TAG`, а не выдумывайте тег. **TODO:** какой тег считать стабильным релизом, в `dev` не зафиксирован: публикация идёт с git-тегов `v*` плюс `latest`.

Полезные переменные установщика:

| Переменная | Смысл |
| --- | --- |
| `OKKEY_REF` | Ветка, тег или SHA для скачивания `deploy/docker/*`. По умолчанию `dev`. |
| `OKKEY_INSTALL_DIR` | Каталог. По умолчанию `~/okkey`. |
| `OKKEY_SKIP_PULL=1` | Не тянуть образы (локальная сборка). |
| `OKKEY_RESET_VOLUMES=1` | `docker compose down -v` перед стартом. Сотрёт данные Postgres, Redis и MinIO. |

Пароль Postgres применяется только при первом создании тома. Если удалить `.env`, заново сгенерировать секреты и поднять старый том `okkey_okkey-postgres`, API уйдёт в цикл с ошибкой аутентификации Postgres.

## Ручная установка

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/.env.example"
cp .env.example .env
```

В `.env` замените пароли и при домене с TLS задайте:

- `PUBLIC_APP_URL`
- `OKKEY_API_PUBLIC_URL`
- `CORS_ORIGIN`
- `WEBAUTHN_ORIGINS`
- `WEBAUTHN_RP_ID`

Затем:

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

Перед `web` и `api` ставится свой reverse proxy (в документации ядра названы Caddy, Traefik, nginx). Сам compose TLS не терминирует.

## Почта

По умолчанию `EMAIL_PROVIDER=logger` и `EMAIL_DELIVERY_MODE=queue`. Коды подтверждения видны в логах **worker**, не API: API только кладёт письмо в Redis (`okkey:email:queue`, `okkey:email:delayed`, `okkey:email:dead`). Для настоящей почты задайте SMTP в `.env` (`EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`).

## Модули Enterprise

Платные экраны self-hosted (свои роли и профили, приглашения, общие сейфы, файлы в записях, мониторинг, расширенное восстановление, настройки доступа капсул) включаются вместе с модулями.

- API: `ENTERPRISE_MODULES=true`. Необязательно `ENTERPRISE_MODULES_PATH` — путь к каталогу `okkey-enterprise`.
- Web: `VITE_ENTERPRISE_MODULES=true`.

Пока флаг выключен, регистрация ставит `plan_tier` `FREE`. API отдаёт только встроенные роли и профили. Нет своих ролей и профилей, приглашений и создания общих сейфов.

При `ENTERPRISE_MODULES=true` регистрация нового пространства ставит `plan_tier` `ENTERPRISE`. Проверки функций смотрят на этот tier. В self-hosted у владельца одно пространство. Что именно открывает каждый тариф — на странице [Тарифы](../plans).

Уже созданное пространство Free переводится на Enterprise только вручную, по запросу, специалистом Okkey. Для этого нужен SSH-доступ к VPS, где установлен Okkey. Напишите команде Okkey и предоставьте этот доступ. Подробнее — в [тарифах](../plans#уже-созданное-пространство).

## Криптополитика при установке

Оставьте для текущего веб-клиента:

```text
DEPLOY_ENV=dev
CRYPTO_ALLOWED_PROFILE_VERSIONS=1,2
CRYPTO_ROLLOUT_MODE=compat
```

Иначе регистрация ответит «Профиль шифрования не разрешён» (`CRYPTO_PROFILE_NOT_ALLOWED`). Подробности — в [Q-Day ready](../features/qday).

## Обновление

```bash
docker compose -f docker-compose.prod.yml --env-file .env pull
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

Миграции SQL из `services/api/migrations` применяет API (и worker) на старте и записывает их в `schema_migrations`.

## Локальная сборка образов

Из корня монорепозитория:

```bash
docker build -f services/api/Dockerfile --target api -t ghcr.io/okkeyapp/api:local .
docker build -f services/api/Dockerfile --target worker -t ghcr.io/okkeyapp/worker:local .
docker build -f apps/web/Dockerfile -t ghcr.io/okkeyapp/web:local .
```

В `.env`: `OKKEY_IMAGE_TAG=local` и при необходимости `OKKEY_API_IMAGE`, `OKKEY_WEB_IMAGE`, `OKKEY_WORKER_IMAGE`. Установщик: `OKKEY_SKIP_PULL=1`.
