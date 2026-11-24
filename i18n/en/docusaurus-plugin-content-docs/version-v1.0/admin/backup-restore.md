---
title: Backup and restore
sidebar_position: 2
plans: [free, enterprise]
---

# Backup and restore

You need a copy on Free and on Enterprise. Metadata lives in Postgres. Encrypted files live in MinIO. Redis holds sessions and the mail queue. Vault items live in Postgres and in MinIO.

Copy `.env` every time. It contains `POSTGRES_PASSWORD`, `SESSION_SECRET`, `JWT_SECRET`, `EMAIL_DEAD_LETTER_SEAL_KEY`, and `MINIO_ROOT_PASSWORD`. Also keep `docker-compose.prod.yml` from the version that is running now: an upgrade downloads that file again.

The commands below assume the directory `~/okkey` and the project `okkey`. For another directory, `cd` there and use its lowercase name instead of `okkey` in the project name and in the volume names.

`pg_dump` comes from the `postgres:16-alpine` image, the same image named in `docker-compose.prod.yml`.

## How often

The delivery requirements suggest a daily Postgres copy, kept for a retention period you choose, plus a copy of the files or storage replication when you have it. On a schedule you choose, restore a copy on a spare machine and check that you can sign in. A copy you have never restored may be empty.

## Back up the database

The stack must be up. From the install directory:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env exec -T postgres \
  sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom --no-owner --no-acl' \
  > "$HOME/okkey-postgres.dump"
```

`POSTGRES_USER` and `POSTGRES_DB` default to `okkey`.

You can archive the volume `okkey_okkey-postgres` with the same `tar` command as the files below. When you restore into a new Postgres volume, use the logical `pg_dump`.

## Back up stored files

MinIO keeps object data in the volume `okkey_okkey-minio`, mounted at `/data` in the container. Stop the stack so the copy is quiet, then archive the volume with `postgres:16-alpine` (that image includes `tar`):

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env stop
docker run --rm \
  -v okkey_okkey-minio:/volume:ro \
  -v "$HOME":/backup \
  postgres:16-alpine \
  tar -C /volume -czf /backup/okkey-minio.tgz .
```

Redis data is the volume `okkey_okkey-redis`. Archive it the same way when you want to keep sessions and queued mail:

```bash
docker run --rm \
  -v okkey_okkey-redis:/volume:ro \
  -v "$HOME":/backup \
  postgres:16-alpine \
  tar -C /volume -czf /backup/okkey-redis.tgz .
```

Copy `.env` and the Compose file, then start the stack again:

```bash
cp ~/okkey/.env "$HOME/okkey.env"
cp ~/okkey/docker-compose.prod.yml "$HOME/okkey-docker-compose.prod.yml"
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

## Restore a database dump

Stop the API and the worker so nothing is writing. Then replace the `okkey` database and load the dump. The role password stays the one already in `.env`.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env stop api worker
docker compose -p okkey -f docker-compose.prod.yml --env-file .env exec -T postgres \
  psql -U okkey -d postgres -v ON_ERROR_STOP=1 \
  -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'okkey' AND pid <> pg_backend_pid();" \
  -c "DROP DATABASE IF EXISTS okkey;" \
  -c "CREATE DATABASE okkey OWNER okkey;"
```

If `DROP DATABASE` fails because a connection is still open, run the `pg_terminate_backend` statement again and retry the drop and create. Then load the dump:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env exec -T postgres \
  pg_restore -U okkey -d okkey --no-owner --exit-on-error < "$HOME/okkey-postgres.dump"
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

Use the `.env` from the same backup. Authenticator secrets are sealed with `SESSION_SECRET`. A new secret cannot open secrets sealed with the old one.

On startup the API runs any migration files that are not yet listed in `schema_migrations`.

## Restore volume archives

Stop the stack, delete the old volume, and let Compose create a new one. A volume made with `docker volume create` has no Compose labels, and the next `up` warns that the volume already exists. `docker compose create` writes those labels.

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

Repeat for `okkey_okkey-postgres` (`docker compose … create postgres`) and `okkey_okkey-redis` (`docker compose … create redis`) if you archived them. Restoring the Postgres volume restores the password that was initialized with that volume. The `POSTGRES_PASSWORD` in `.env` must be the one from that same install. Then:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

## Move to a new server

1. On the old server, take the dump, the MinIO archive, and the Redis archive if you need it. Take `.env` and `docker-compose.prod.yml`.
2. On the new server, install Docker Engine 28 or newer, the Compose plugin, and cosign. See [Requirements](../install/requirements.md).
3. Create a directory, for example `~/okkey`. Put the saved `.env` and `docker-compose.prod.yml` there. On an empty machine the installer would generate new secrets. You do not need it for a move: the secrets are already in the saved `.env`.
4. Pull the images for the same `OKKEY_IMAGE_TAG` and check the signatures, as on [Upgrade](./upgrade.md).
5. Start Postgres and restore the dump with the commands above. Restore the MinIO volume from the archive. Restore Redis if you copied it.
6. Start the stack: `docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d`.

The project name must match the volume names in the commands. For the directory `~/okkey` that name is `okkey`.

## How to check

On the same machine, open `http://127.0.0.1:4000/health`. The body contains `"status": "ok"`. Open the web URL from `.env` (`PUBLIC_APP_URL`, default `http://localhost:8080`) and unlock the vault with the same master password.

A test restore repeats these steps on a spare machine, or in a second directory with a copy of the files. Signing in and opening an item shows that the dump and the file archive match `.env`.

## Next steps

- [Upgrade](./upgrade.md)
- [Rollback](./rollback.md)
- [Install steps](../install/free.md)
- [Email](../install/email.md)
