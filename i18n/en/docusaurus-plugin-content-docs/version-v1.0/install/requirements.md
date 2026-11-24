---
title: Requirements
sidebar_position: 2
plans: [free, enterprise]
---

# Server requirements

Only Docker Compose is supported. Kubernetes and Helm are planned and are not part of v1.0.0. You do not need to clone the repository for a normal install.

Free and Enterprise share these requirements. An Okkey employee turns on Enterprise after the install. See [Enterprise](./enterprise.md).

## Programs

| Program | Why |
| --- | --- |
| Docker Engine 28.0 or newer | Publishes the API port on `127.0.0.1` only. On an older Engine, other machines on the same network could still reach that address. |
| Docker Compose plugin | `docker compose version` must succeed. |
| `curl` and `bash` | Download and run the install script. |
| [cosign](https://docs.sigstore.dev/cosign/system_config/installation/) | Checks the signatures of the `api`, `web`, and `worker` images. Without cosign the install stops. |

## Resources

The installer does not set a CPU count or a disk size. The requirements for the first stable release, for one machine and a small team, say:

- 2 vCPU;
- 4 GB RAM;
- 20 GB SSD for the database and files, not counting copies.

This is a baseline. More people and more files need more room.

Dependency versions tested in this delivery: Postgres 16, Redis 7, and S3-compatible file storage (Compose uses MinIO).

## What starts

| Part | Purpose |
| --- | --- |
| Web | The browser interface. Default port `8080` (`WEB_PORT`). |
| API | Accepts requests and updates the database on start. Default port `4000` (`API_PORT`), on `127.0.0.1` only. |
| Background jobs | Sends mail, and deletes expired items and capsules. |
| Postgres | Users, devices, and metadata. |
| Redis | Sessions and the mail queue. |
| File storage | Encrypted attachments. |

Another machine cannot open the API port directly. Network access needs a [domain and TLS](./domain-tls.md).

## How to check

On the machine that will run Okkey:

```bash
docker --version
docker compose version
command -v curl
command -v bash
command -v cosign
```

The Docker line must show version 28 or higher. Each of the other commands must print something too.

## Next steps

- [Install steps](./free.md)
- [Domain and TLS](./domain-tls.md)
- [If the install stops](./troubleshooting.md)
