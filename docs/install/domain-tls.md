---
title: Домен и TLS
sidebar_position: 4
plans: [free, enterprise]
---

# Домен и TLS

Страница для тарифа «Бесплатный» и тарифа «Предприятие». Оба ставятся на вашу машину одним и тем же Compose.

Порт API опубликован только на `127.0.0.1`. Браузер на этой же машине открывает веб по `http://localhost:8080`. Другая машина до API напрямую не достучится. Для имени в сети нужен обратный прокси из каталога `deploy/docker/proxy`.

Прокси — nginx с OpenSSL 3.5 или новее. Слушатель по умолчанию принимает только TLS 1.3 и договаривается о гибридной группе `X25519MLKEM768`. Это постквантовый обмен ключами на линии между браузером и прокси. Клиент без этой группы на основной адрес не попадает. Отдельный адрес для старых клиентов выключен. Его включают явно, на других именах и со сроком окончания. На основной адрес классическую группу не переносят.

Команды ниже закреплены на релиз `v1.0.0-beta.2`, как и [этапы установки](./free.md).

## Что подготовить

1. Два имени DNS на эту машину, например `app.example.com` и `api.example.com`.
2. Сертификат, в котором есть оба имени. Файлы: `fullchain.pem` и `privkey.pem`.
3. Каталог `proxy` целиком рядом с `docker-compose.prod.yml`. Одного файла Compose мало: сборка берёт `proxy/nginx` и каталог сертификатов.

Скопируйте каталог из релиза:

```bash
git clone --depth 1 --branch v1.0.0-beta.2 https://github.com/okkeyapp/okkey.git /tmp/okkey-src
cp -a /tmp/okkey-src/deploy/docker/proxy ~/okkey/proxy
```

Положите сертификат в `~/okkey/proxy/certs/fullchain.pem` и ключ в `~/okkey/proxy/certs/privkey.pem`.

Скрипт `proxy/scripts/gen-self-signed.sh` пишет самоподписанный сертификат в тот же каталог. Он годится, чтобы проверить прокси у себя. Для людей, которые открывают сайт с других машин, нужен обычный сертификат.

## Переменные

В `~/okkey/.env` задайте имена и адреса. Пример:

```bash
PUBLIC_APP_URL=https://app.example.com
OKKEY_API_PUBLIC_URL=https://api.example.com
CORS_ORIGIN=https://app.example.com
WEBAUTHN_ORIGINS=https://app.example.com
WEBAUTHN_RP_ID=example.com
OKKEY_WEB_HOST=app.example.com
OKKEY_API_HOST=api.example.com
TRUSTED_PROXY_HOPS=1
```

`TRUSTED_PROXY_HOPS=1` нужен, потому что nginx добавляет один переход в `X-Forwarded-For`. Порт API на хосте оставьте на `127.0.0.1`. Публикация `0.0.0.0` при `TRUSTED_PROXY_HOPS` больше нуля позволяет обойти прокси.

Прокси смотрит на API по сети Compose, адрес `api:4000`. Снаружи веб слушает 443, API — тоже 443, но на своём имени.

## Запуск

Из каталога установки:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml -f proxy/docker-compose.proxy.yml \
  --env-file .env up -d --build proxy
```

Образ прокси собирается на месте. Это не образ `ghcr.io/okkeyapp/*`, и cosign его не подписывает. Подписи `api`, `web` и `worker` по-прежнему проверяются при установке.

Если имя проекта не `okkey`, подставьте имя каталога в нижнем регистре.

## Как проверить

На машине, где OpenSSL 3.5 или новее и в списке групп есть `X25519MLKEM768`:

```bash
cd ~/okkey
./proxy/verify-tls.sh app.example.com 443
curl -fsSI https://app.example.com/
curl -fsS https://api.example.com/health
```

Скрипт ждёт группу `X25519MLKEM768` и отказ TLS 1.2 на основном адресе. `/health` отвечает `"status": "ok"`. В браузере открывается `https://app.example.com`.

Порт API на самой машине по-прежнему `http://127.0.0.1:4000/health`.

## Дальше

- [Этапы установки](./free.md)
- [Почта](./email.md)
- [Если установка не пошла](./troubleshooting.md)
- [Обновление](../admin/upgrade.md)
