---
title: Administration
sidebar_position: 1
plans: [free, enterprise]
---

# Administration

This section is for the person who runs the Okkey server. It is the same on Free and on Enterprise. The server administrator cannot read vault contents: encryption stays on the user's device.

The commands assume the directory `~/okkey` and the Compose project `okkey`. If you set `OKKEY_INSTALL_DIR`, `cd` there. The project name is the directory name in lowercase. Volume names are `<project>_okkey-postgres`, `<project>_okkey-redis`, and `<project>_okkey-minio`.

## What lives where

| What | Where |
| --- | --- |
| Compose file and `.env` | The install directory, `~/okkey` by default. |
| Metadata, users, devices | Postgres volume `okkey_okkey-postgres`. |
| Encrypted files | MinIO volume `okkey_okkey-minio`, path `/data` inside the container. |
| Sessions and the mail queue | Redis volume `okkey_okkey-redis`. Vault items live in Postgres and in MinIO. |
| Web | Port `8080`, unless you changed `WEB_PORT`. |
| API | `127.0.0.1:4000`, unless you changed `API_PORT`. |

`.env` holds `POSTGRES_PASSWORD`, `SESSION_SECRET`, `JWT_SECRET`, `EMAIL_DEAD_LETTER_SEAL_KEY`, and `MINIO_ROOT_PASSWORD`. A copy without this file cannot bring the old data back.

## What to do next

1. Take a [backup](./backup-restore.md) and restore it once as a test.
2. Upgrade using [Upgrade](./upgrade.md). Take another backup first.
3. A return to the previous data is on [Rollback](./rollback.md). Changing the image tag does not undo database migrations that have already been applied.

## How to check

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

`"status": "ok"` means the API answers on this machine.

## Next steps

- [Backup and restore](./backup-restore.md)
- [Upgrade](./upgrade.md)
- [Rollback](./rollback.md)
- [Install steps](../install/free.md)
