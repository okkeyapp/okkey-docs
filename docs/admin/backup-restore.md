---
title: Копирование и восстановление
sidebar_position: 2
plans: [free, enterprise]
---

# Копирование и восстановление

Копия нужна и на тарифе «Бесплатный», и на тарифе «Предприятие». Метаданные лежат в Postgres, зашифрованные файлы — в MinIO. Redis держит сессии и очередь писем. Записи сейфа в Redis нет.

Каждый раз копируйте `.env`. В нём `POSTGRES_PASSWORD`, `SESSION_SECRET`, `JWT_SECRET`, `EMAIL_DEAD_LETTER_SEAL_KEY` и `MINIO_ROOT_PASSWORD`. Сохраните и `docker-compose.prod.yml` той версии, которая сейчас запущена: при обновлении файл скачивают заново.

Команды ниже — для каталога `~/okkey` и проекта `okkey`. Другой каталог: перейдите в него и подставьте имя каталога в нижнем регистре вместо `okkey` в имени проекта и в именах томов.

`pg_dump` берётся из образа `postgres:16-alpine`, он же указан в `docker-compose.prod.yml`.

## Как часто

Для своей установки ориентир из требований к поставке: каждый день копировать Postgres и хранить копии по своему сроку, плюс копия файлов или реплика хранилища, если она у вас есть. Раз в выбранный срок восстановите копию на запасной машине и проверьте вход. Копия, которую ни разу не поднимали, может оказаться пустой.

## Копия базы

Стек должен быть запущен. Из каталога установки:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env exec -T postgres \
  sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom --no-owner --no-acl' \
  > "$HOME/okkey-postgres.dump"
```

`POSTGRES_USER` и `POSTGRES_DB` по умолчанию равны `okkey`.

Том `okkey_okkey-postgres` можно снять тем же `tar`, что и файлы ниже. Для новой базы Postgres берите логический `pg_dump`: его и восстанавливают в новый том.

## Копия файлов

Данные MinIO лежат в томе `okkey_okkey-minio`, в контейнере это `/data`. Остановите стек, чтобы копия была спокойной, и соберите архив образом `postgres:16-alpine` (в нём есть `tar`):

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env stop
docker run --rm \
  -v okkey_okkey-minio:/volume:ro \
  -v "$HOME":/backup \
  postgres:16-alpine \
  tar -C /volume -czf /backup/okkey-minio.tgz .
```

Redis, том `okkey_okkey-redis`, копируйте так же, если нужно сохранить сессии и очередь писем:

```bash
docker run --rm \
  -v okkey_okkey-redis:/volume:ro \
  -v "$HOME":/backup \
  postgres:16-alpine \
  tar -C /volume -czf /backup/okkey-redis.tgz .
```

Скопируйте `.env` и файл Compose, затем снова запустите стек:

```bash
cp ~/okkey/.env "$HOME/okkey.env"
cp ~/okkey/docker-compose.prod.yml "$HOME/okkey-docker-compose.prod.yml"
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

## Восстановление базы из дампа

Остановите API и воркер, чтобы никто не писал в базу. Затем замените базу `okkey` и загрузите дамп. Пароль роли остаётся тот, что уже в `.env`.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env stop api worker
docker compose -p okkey -f docker-compose.prod.yml --env-file .env exec -T postgres \
  psql -U okkey -d postgres -v ON_ERROR_STOP=1 \
  -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'okkey' AND pid <> pg_backend_pid();" \
  -c "DROP DATABASE IF EXISTS okkey;" \
  -c "CREATE DATABASE okkey OWNER okkey;"
```

Если `DROP DATABASE` не проходит, потому что соединение ещё открыто, выполните `pg_terminate_backend` ещё раз и повторите удаление и создание. Затем загрузите дамп:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env exec -T postgres \
  pg_restore -U okkey -d okkey --no-owner --exit-on-error < "$HOME/okkey-postgres.dump"
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

Берите `.env` из той же копии. Секреты второго фактора запечатаны `SESSION_SECRET`. Новый секрет старые секреты не откроет.

При старте API выполняет файлы миграций, которых ещё нет в `schema_migrations`.

## Восстановление томов из архива

Остановите стек, удалите старый том и дайте Compose создать новый. Том, созданный вручную через `docker volume create`, не получает метки Compose, и следующий `up` предупредит, что том уже есть. Метки пишет `docker compose create`.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env down
docker volume rm okkey_okkey-minio
docker compose -p okkey -f docker-compose.prod.yml --env-file .env create minio
docker run --rm \
  -v okkey_okkey-minio:/volume \
  -v "$HOME":/backup \
  postgres:16-alpine \
  tar -C /volume -xzf /backup/okkey-minio.tgz
```

То же для `okkey_okkey-postgres` (`docker compose … create postgres`) и `okkey_okkey-redis` (`docker compose … create redis`), если вы их архивировали. Восстановление тома Postgres возвращает пароль, с которым этот том когда-то создали. `POSTGRES_PASSWORD` в `.env` должен быть от той же установки. Затем:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

## Переезд на новый сервер

1. На старом сервере снимите дамп, архив MinIO и, если нужен, архив Redis. Заберите `.env` и `docker-compose.prod.yml`.
2. На новом сервере поставьте Docker Engine 28 или новее, плагин Compose и cosign. См. [Требования](../install/requirements.md).
3. Создайте каталог, например `~/okkey`. Положите туда сохранённые `.env` и `docker-compose.prod.yml`. Установщик на пустой машине создаст новые секреты. Для переезда он не нужен: секреты уже в сохранённом `.env`.
4. Скачайте образы того же `OKKEY_IMAGE_TAG` и проверьте подписи, как на странице [Обновление](./upgrade.md).
5. Поднимите Postgres, восстановите дамп командами выше. Восстановите том MinIO из архива. Верните Redis, если копировали его.
6. Запустите стек: `docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d`.

Имя проекта должно совпасть с именами томов в командах. Для каталога `~/okkey` это `okkey`.

## Как проверить

На той же машине откройте `http://127.0.0.1:4000/health`. В ответе `"status": "ok"`. Откройте веб по `PUBLIC_APP_URL` из `.env` (по умолчанию `http://localhost:8080`) и разблокируйте хранилище прежним мастер-паролем.

Пробное восстановление: повторите шаги на запасной машине или во втором каталоге с копией файлов. Вход и открытие записи подтверждают, что дамп и архив файлов сошлись с `.env`.

## Дальше

- [Обновление](./upgrade.md)
- [Откат](./rollback.md)
- [Этапы установки](../install/free.md)
- [Почта](../install/email.md)
