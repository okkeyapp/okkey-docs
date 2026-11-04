---
title: Requirements
sidebar_position: 2
plans: [free, enterprise]
---

# Server requirements

Only Docker Compose is supported. Kubernetes and Helm are planned and are not part of v1.0.0. You do not need to clone the repository.

You need Docker, Docker Compose, cosign, and disk for the database, the queue, and files. The installer does not set a CPU or RAM number.

## What starts

| Part | Purpose |
| --- | --- |
| Web | The browser interface. |
| API | Accepts requests and updates the database on start. |
| Background jobs | Deletes expired items and capsules, and sends mail. |
| Postgres | Users, devices, and metadata. |
| Redis | Sessions and the mail queue. |
| File storage | Encrypted attachments. |

Default ports: web `8080`, API `4000`.

## Next steps

- [Install steps](./self-hosted)
- [First-time setup](./first-setup)
- [Plans](../plans)
