---
title: Этапы установки
sidebar_position: 3
plans: [free, enterprise]
---

# Этапы установки

Поставьте Okkey одной командой. Репозиторий клонировать не нужно.

Рабочая установка берёт файлы из ветки `main`. Установка для разработки берёт файлы из ветки `dev`.

## Рабочая установка

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/main/deploy/docker/install.sh | OKKEY_REF=main bash
```

## Установка для разработки

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/install.sh | OKKEY_REF=dev bash
```

Каталог установки - `~/okkey`.

Скрипт делает четыре шага:

1. Создаёт каталог установки.
2. Скачивает файлы установки.
3. Записывает секреты и пароли базы в `.env`.
4. Запускает Okkey.

После старта веб открывается на `http://localhost:8080`, если вы не задали другой адрес. Проверка API: `http://localhost:4000/health`.

Установка работает на Free. Чтобы получить Enterprise, напишите команде Okkey. Сравнение тарифов - на странице [Тарифы](../plans).

:::warning
Пароль базы применяется при первом создании данных. Если удалить `.env`, создать новые секреты и поднять старые данные, API не сможет войти в базу.
:::

Полезные переменные установщика:

| Переменная | Смысл |
| --- | --- |
| `OKKEY_REF` | Ветка файлов установки: `main` для рабочей установки, `dev` для разработки. |
| `OKKEY_INSTALL_DIR` | Каталог. По умолчанию `~/okkey`. |
| `OKKEY_RESET_VOLUMES=1` | Удалить данные базы, сессий и файлов перед стартом. |

## Ручная установка

1. Скачайте файлы установки.

Для рабочей установки в адресе стоит `main`. Для разработки замените `main` на `dev`.

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/main/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/main/deploy/docker/.env.example"
cp .env.example .env
```

2. В `.env` замените пароли. Для сайта с HTTPS задайте адрес приложения, адрес API, разрешённый источник и параметры входа по ключу устройства: `PUBLIC_APP_URL`, `OKKEY_API_PUBLIC_URL`, `CORS_ORIGIN`, `WEBAUTHN_ORIGINS`, `WEBAUTHN_RP_ID`.
3. Запустите контейнеры.

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

Перед вебом и API поставьте свой reverse proxy. Сама установка HTTPS не включает.

Не меняйте параметры шифрования, которые установщик записал в `.env`. Иначе регистрация может не пройти.

## Почта

По умолчанию коды подтверждения пишутся в логи фоновых задач. Для настоящей почты задайте SMTP в `.env`: сервер, порт, защищённое соединение, логин, пароль и адрес отправителя (`EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`).

:::note
Первому аккаунту письмо не нужно. SMTP понадобится со второго входа. См. [первую настройку](./first-setup).
:::

## Обновление

```bash
docker compose -f docker-compose.prod.yml --env-file .env pull
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

При старте база обновляется сама.

## Дальше

- [Первая настройка](./first-setup)
- [Тарифы](../plans)
- [Q-Day ready](../features/qday)
