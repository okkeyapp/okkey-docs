---
title: Rollback
sidebar_position: 4
plans: [free, enterprise]
---

# Rollback

A rollback returns the server to the data and images from before an upgrade. It is the same on Free and on Enterprise.

Setting `OKKEY_IMAGE_TAG` back to an older tag does not undo migrations the new API already recorded in `schema_migrations`. This start path has no scripts that roll those SQL files back. The way back is the backup you took before the upgrade: the Postgres dump, the MinIO archive, `.env`, and `docker-compose.prod.yml` from that version.

Vault contents still open with the master password on the device. A server copy without the previous `.env` cannot open sealed secrets.

## Steps

1. Confirm you have the dump, the MinIO archive, and `.env` from before the upgrade. See [Backup and restore](./backup-restore.md).
2. Stop the stack.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env down
```

3. Put back `.env` and `docker-compose.prod.yml` from that backup. `.env` must have the previous `OKKEY_IMAGE_TAG`, the same `POSTGRES_PASSWORD`, and the same `SESSION_SECRET`.
4. Pull the images for that tag and check the signatures of `api`, `web`, and `worker`, as in [Versions and releases](./upgrade.md#versions-and-releases).
5. Start Postgres and restore the dump. Restore the MinIO volume from the archive. Restore Redis only when the backup includes it and you need the old sessions and mail queue. The restore commands are on [Backup and restore](./backup-restore.md).
6. Start the stack without `OKKEY_RESET_VOLUMES`:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

`OKKEY_RESET_VOLUMES=1` deletes the volumes. It does not belong in a rollback.

If the directory is not `~/okkey`, the project name in `-p` is the lowercase directory name. Volume names start with that same name.

## How to check

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

The body contains `"status": "ok"`. Open the web app at `PUBLIC_APP_URL` and unlock the vault. An item from before the upgrade is there. With mail unset, the sign-in code is in the worker log again. See [Email](../install/email.md).

If you changed `SESSION_SECRET` before the upgrade, the SMTP password in "Server mail" may be unreadable. Enter it again, or choose "Clear saved password". See [Email](../install/email.md).

## Common errors

| What you see | What to do |
| --- | --- |
| The API does not become healthy, and the log says `password authentication failed` | `.env` is not the one for this Postgres volume. Use the password from the backup that matches the volume or the dump. |
| The second factor or the SMTP password does not open | `SESSION_SECRET` is new. Put back the secret from the same backup as the database. |
| `DROP DATABASE` does not run | A connection still holds the database. Run `pg_terminate_backend` again from the backup page, then drop the database again. |
| `up` warns that the volume already exists and has no Compose labels | The volume was created with `docker volume create`. Remove it and create it with `docker compose … create`, as on the backup page. |
| The old image did not match the signature | Do not start it. Check the tag and the digest with the cosign command. |
| After the old tag, the API still refuses to update the schema | The database matches no known migration checkpoint. Restore the whole dump. Do not mix a new volume with the old image. |

## Next steps

- [Backup and restore](./backup-restore.md)
- [Upgrade](./upgrade.md)
- [If the install stops](../install/troubleshooting.md)
