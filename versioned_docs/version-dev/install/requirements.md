---
title: Требования
sidebar_position: 2
plans: [free, enterprise]
---

# Требования к серверу

Прод-установка - Docker Compose, без клонирования монорепозитория. Kubernetes в ядре помечен как planned и в этот compose не входит.

## Что поднимает compose

| Сервис | Образ | Зачем |
| --- | --- | --- |
| `web` | `ghcr.io/okkeyapp/web` | Веб-интерфейс, nginx. В браузер отдаёт `OKKEY_API_PUBLIC_URL` через `/config.js`. |
| `api` | `ghcr.io/okkeyapp/api` | HTTP API. На старте накатывает SQL-миграции. Письма кладёт в Redis. Фоновые задачи выключены: `RUN_BACKGROUND_JOBS=false`. |
| `worker` | `ghcr.io/okkeyapp/worker` | Очистка удалённых записей, очистка капсул, разбор очереди почты. |
| `postgres` | `postgres:16-alpine` | Пользователи, устройства, метаданные, события. |
| `redis` | `redis:7-alpine` | Сессии, кэш, блокировки, очередь почты (`appendonly yes`). |
| `minio` | `pgsty/minio` | S3-совместимые вложения. Официальные образы MinIO с Hub в комментарии compose названы недоступными. |
| `minio-init` | `amazon/aws-cli:2.17.0` | Один раз создаёт бакет. |

Порты по умолчанию из `.env.example`: веб `8080`, API `4000`.

Нужны Docker и Docker Compose, исходящий доступ к GHCR, чтобы скачать образы, и место под тома Postgres, Redis и MinIO. Число ядер и объём RAM в репозитории не заданы. **TODO:** аппаратный минимум не указан.

Пакеты `ghcr.io/okkeyapp/{api,web,worker}` должны быть публичными, либо Docker должен быть залогинен в GHCR (`read:packages`). Анонимный pull закрытого пакета возвращает 401/403.

В `.env.example` на ветке `dev` тег образов - `OKKEY_IMAGE_TAG=0.0.0-pr19.4`. Корневой README при этом предлагает установщик с `dev`. Расхождение описано в [этапах установки](./self-hosted).

Отдельно: корневой `docker-compose.yml` репозитория - только инфраструктура для разработки (`yarn infra:up`: Postgres, Redis, MinIO). Это не прод-установка приложения.
