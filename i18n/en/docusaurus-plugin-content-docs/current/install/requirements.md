---
title: Requirements
sidebar_position: 2
plans:
  selfhosted: [free, enterprise]
  cloud: []
---

# Server requirements

The production install is Docker Compose, with no monorepo clone. Kubernetes is marked planned in core and is not part of this compose file.

## What compose starts

| Service | Image | Role |
| --- | --- | --- |
| `web` | `ghcr.io/okkeyapp/web` | Web UI, nginx. The browser receives `OKKEY_API_PUBLIC_URL` through `/config.js`. |
| `api` | `ghcr.io/okkeyapp/api` | HTTP API. Applies SQL migrations on start. Enqueues mail to Redis. Background jobs are off: `RUN_BACKGROUND_JOBS=false`. |
| `worker` | `ghcr.io/okkeyapp/worker` | Purges deleted items, cleans capsules, consumes the email queue. |
| `postgres` | `postgres:16-alpine` | Users, devices, metadata, events. |
| `redis` | `redis:7-alpine` | Sessions, cache, locks, the email queue (`appendonly yes`). |
| `minio` | `pgsty/minio` | S3-compatible attachments. The compose comment says official MinIO Hub images are gone. |
| `minio-init` | `amazon/aws-cli:2.17.0` | Creates the bucket once. |

Default ports from `.env.example`: web `8080`, API `4000`.

You need Docker and Docker Compose, outbound access to GHCR to pull images, and disk for the Postgres, Redis, and MinIO volumes. CPU and RAM are not specified in the repository. **TODO:** there is no hardware minimum.

The packages `ghcr.io/okkeyapp/{api,web,worker}` must be public, or Docker must be logged in to GHCR (`read:packages`). An anonymous pull of a private package returns 401/403.

On the `dev` branch, `.env.example` sets `OKKEY_IMAGE_TAG=0.0.0-pr19.4`. The root README still offers the installer from `dev`. That mismatch is covered in [Install steps](./self-hosted).

Separately, the repository-root `docker-compose.yml` is development infrastructure only (`yarn infra:up`: Postgres, Redis, MinIO). It does not install the app.
