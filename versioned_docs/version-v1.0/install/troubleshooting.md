---
title: Если установка не пошла
sidebar_position: 7
plans: [free, enterprise]
---

# Если установка не пошла

Страница для тарифа «Бесплатный» и тарифа «Предприятие». Команды рассчитаны на каталог `~/okkey` и проект Compose `okkey`. Если каталог другой, подставьте его путь и имя каталога в нижнем регистре.

## Нет адреса для заявок

Скрипт останавливается с текстом, что `OKKEY_SALES_EMAIL` обязателен. Так бывает, когда установку запустили через пайп без терминала и без переменной справа от `|`.

Запустите ещё раз и передайте адрес справа:

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/install.sh \
  | OKKEY_REF=v1.0.0-beta.2 OKKEY_IMAGE_TAG=1.0.0-beta.2 OKKEY_SALES_EMAIL=you@example.com bash
```

Адрес с пробелом, без `@` или без точки в домене скрипт не примет. Проверка идёт до записи файлов: неудачный адрес уже стоящую установку не переписывает.

Если API не стартует и в логе есть `OKKEY_SALES_EMAIL is required`, в `.env` пустое поле. Впишите адрес и поднимите стек снова.

## Переменные не попали в скрипт

`OKKEY_REF=v1.0.0-beta.2 curl … | bash` не передаёт переменную в `bash`. Ставьте их справа от `|`, как в команде выше. Иначе скрипт может скачать файлы не с того ref.

## Нет Docker Compose или cosign

`docker compose plugin is required` — поставьте плагин Compose и проверьте `docker compose version`.

`cosign is not installed` — поставьте [cosign](https://docs.sigstore.dev/cosign/system_config/installation/) и запустите скрипт снова. Без проверки подписи установка не продолжается.

`cosign verify failed` — подпись скачанного образа не сошлась. Проверьте, что тег `OKKEY_IMAGE_TAG` опубликован, и скачайте образы ещё раз. Команда ручной проверки — на странице [Этапы установки](./free.md).

`docker compose pull failed` — тега нет в GHCR (`ghcr.io/okkeyapp/api`, `web`, `worker`). Для этой страницы тег `1.0.0-beta.2`.

## API не становится healthy

Скрипт ждёт, пока контейнер `api` станет healthy, и в конце печатает хвост его лога. Частая причина — пароль базы не совпадает с томом.

Postgres применяет `POSTGRES_PASSWORD` только при первом создании тома. Если `.env` удалили и попытались создать новый, пока том `okkey_okkey-postgres` ещё есть, скрипт останавливается до записи нового пароля. В логе API при уже испорченном пароле бывает `password authentication failed for user "okkey"`.

Верните прежний `.env` с тем же `POSTGRES_PASSWORD`. Стирание томов удаляет данные:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env down -v
```

После `down -v` установку можно пройти заново. База, сессии и файлы при этом пропадают.

## Веб открывается, а с другой машины нет

Порт API слушает только `127.0.0.1`. Адрес `http://<сервер>:4000` с другой машины не ответит. Для доступа по имени настройте [домен и TLS](./domain-tls.md). Не публикуйте API на `0.0.0.0`, если `TRUSTED_PROXY_HOPS` больше нуля.

Если прокси пишет, что нет `/etc/nginx/certs/fullchain.pem` или `privkey.pem`, положите оба файла в `~/okkey/proxy/certs/`.

## Регистрация пишет про профиль шифрования

В `.env` должны остаться `DEPLOY_ENV=dev`, `CRYPTO_ALLOWED_PROFILE_VERSIONS=2`, `CRYPTO_ROLLOUT_MODE=compat`. Профиль `1` процесс не примет. Обновите `docker-compose.prod.yml` с тега `v1.0.0-beta.2`, если файл старый и жёстко задаёт другое окружение, затем пересоздайте `api` и `worker`:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d --force-recreate api worker
```

## Кода входа нет в почте

Пока SMTP не задан, код в логе воркера, поле `plainText` у строки `email sent`. Команда — на странице [Почта](./email.md). Если воркер остановлен, письмо ждёт в очереди. Проверьте `docker compose ps`: сервис `worker` должен быть running.

## Как проверить, что всё снова живое

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

В ответе `"status": "ok"`. Веб открывается по `PUBLIC_APP_URL` из `.env`.

## Дальше

- [Этапы установки](./free.md)
- [Требования](./requirements.md)
- [Домен и TLS](./domain-tls.md)
- [Почта](./email.md)
- [Копирование и восстановление](../admin/backup-restore.md)
