---
title: Upgrade
sidebar_position: 3
plans: [free, enterprise]
---

# Upgrade

An upgrade is the same on Free and on Enterprise. You pin a new image tag, pull the signed images, and start the stack again.

Keep `~/okkey/.env` and the Docker volumes. Running the installer again does not change `OKKEY_IMAGE_TAG` in an existing `.env`. Edit the tag yourself.

The commands below assume the directory `~/okkey` and the project `okkey`. For another directory, `cd` there and use its lowercase name in `-p`.

## Steps

1. Back up the database, the MinIO volume, and `.env`. See [Backup and restore](./backup-restore.md).
2. In `~/okkey/.env`, set `OKKEY_IMAGE_TAG` to `<tag>`.
3. Refresh the Compose file from git tag `v<tag>`, then pull.

```bash
cd ~/okkey
curl -fsSL -o docker-compose.prod.yml \
  "https://raw.githubusercontent.com/okkeyapp/okkey/v<tag>/deploy/docker/docker-compose.prod.yml"
docker compose -p okkey -f docker-compose.prod.yml --env-file .env pull
```

Verify `api`, `worker`, and `web` with the cosign command in [Versions and releases](#versions-and-releases). Then start:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

On this machine, open `http://127.0.0.1:4000/health`.

`OKKEY_RESET_VOLUMES=1` deletes Postgres, Redis, and MinIO data. Do not set it during an upgrade.

For the release this install page is pinned to, `<tag>` is `1.0.0-beta.2` and the git tag is `v1.0.0-beta.2`.

## What the API does on start

On start, the API and the worker apply the SQL files in `services/api/migrations` in order and record each filename in `schema_migrations`. The two processes take the same Postgres advisory lock, so a start together does not apply one file twice.

A database created by v1.0.0-beta.1 has no `schema_migrations` table. That release applied files `0001`–`0034` with `psql`. On the first start with the migrator, the API recognizes that schema, records `0001`–`0034` as already applied, and runs only the files after `0034`. It does not mark every file applied. A database that matches no known checkpoint is refused. The process does not skip the SQL.

This start path has no scripts that undo a migration already recorded. Take a [backup](./backup-restore.md) before you upgrade. Returning to the old data is on [Rollback](./rollback.md).

## The window in the app

The owner may see "Update available" and the window "System update". The window says: "Review what will change. Nothing is installed until you choose Update." The lines are "Okkey" and "Enterprise". The buttons are "Update", "Ignore", and "Close".

If no feed is configured, the window says: "No feed is configured. You can still apply a package file." The file label is "Offline package". A package with no signature, or with an invalid signature, is not applied. If apply fails, the text says this instance is still on the previous version.

The image-tag path above is the one described for Docker Compose. The window does not replace a database backup before you change versions.

## Versions and releases {#versions-and-releases}

Okkey versions follow SemVer: `X.Y.Z`. Pre-releases add a suffix, for example `1.0.0-beta.2` or `1.0.0-rc.1`.

| What is published | Image tags |
| --- | --- |
| Git tag `vX.Y.Z` with no suffix | `:X.Y.Z`, `:X.Y`, and `:X` |
| A pre-release git tag, for example `v1.0.0-beta.2` | `:1.0.0-beta.2` only |

An install pins both the git ref and the image tag. For the commands on the install pages that pin is `OKKEY_REF=v1.0.0-beta.2` and `OKKEY_IMAGE_TAG=1.0.0-beta.2`. Installs do not use the floating tag `latest`.

Images: `ghcr.io/okkeyapp/api`, `ghcr.io/okkeyapp/web`, and `ghcr.io/okkeyapp/worker`. You can pull them without signing in to the registry.

Check the signature after `docker compose pull`. Replace `1.0.0-beta.2` with your tag:

```bash
digest="$(docker image inspect --format '{{index .RepoDigests 0}}' ghcr.io/okkeyapp/api:1.0.0-beta.2)"
cosign verify \
  --certificate-identity-regexp '^https://github\.com/okkeyapp/okkey/\.github/workflows/publish-images\.yml@refs/(?:heads/dev|tags/v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  "$digest"
```

Repeat for `worker` and `web`. Postgres, Redis, and MinIO are not covered by this signature.

Release notes are on the GitHub releases page: [github.com/okkeyapp/okkey/releases](https://github.com/okkeyapp/okkey/releases). A pre-release note says the version is not final yet.

## How to check

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

`api`, `web`, and `worker` are running, and `api` is healthy. The `/health` body contains `"status": "ok"`. Open the web app and sign in.

## Common errors

| What you see | What to do |
| --- | --- |
| `docker compose pull` cannot find the tag | The tag is not in GHCR yet. Keep the previous `OKKEY_IMAGE_TAG` and the previous Compose file. |
| `cosign verify failed` | The image did not match the signature. Do not start it. Put back the previous tag from the `.env` copy. |
| `password authentication failed for user "okkey"` | `POSTGRES_PASSWORD` is not the one for this volume. Put back `.env` from the backup. |
| The installer says the tag in `.env` was left as it was | That is what happens when `.env` already exists. Edit the tag in the file yourself. |
| `OKKEY_RESET_VOLUMES=1` is set in `.env` | Remove it before `up`. Otherwise the database, Redis, and MinIO are wiped. |

## Next steps

- [Backup and restore](./backup-restore.md)
- [Rollback](./rollback.md)
- [Install steps](../install/free.md)
- [Enterprise](../install/enterprise.md)
