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

## The window in the app {#the-window-in-the-app}

The window exists only on self-hosted, on Free and on Enterprise. Anyone who is signed in can open it. The bottom of the sidebar shows the version, for example `v1.0.0-beta.3`. A build without a release tag shows `v0.0.0-dev`. The address is `?popup=systemUpdate`.

While the feed has a version newer than the one already opened in this window, the version icon changes. A screen reader also hears "Update available". In the collapsed sidebar the icon stays and the version text is hidden. Opening the window clears that state for the versions it shows.

The title is "System update". The text is: "Review online feed updates, or upload an offline package to apply it after a successful check." "Close" cannot be used while an update is running.

### Online update

The block is "Online update".

If network checks are off (`OKKEY_UPDATE_ISOLATED=true`), the lines are replaced by: "Online updates are disabled in settings. Use an offline package below."

Otherwise the window shows an "Okkey" row. An "Enterprise" row is present when the Enterprise module is installed. A row says "Current version {'{version}'}". When the feed has something newer, it also says "New version {'{version}'}", a short release summary, and a "Release notes" link when the release has an `http` or `https` address. When nothing is newer: "Up to date". When that row's feed could not be read: "{'{component}'} could not be checked."

An empty list with a feed configured says: "This instance is up to date." With no feed: "No feed is configured. You can still upload an offline package below." A feed that could not be read says: "The update feed could not be read. Nothing was applied."

An empty `OKKEY_UPDATE_CORE_FEED_URL` means the core feed at `https://github.com/okkeyapp/okkey/releases/latest/download/feed.json`. The previous name of that setting is `OKKEY_UPDATE_FEED_URL`. A separate Enterprise feed is `OKKEY_UPDATE_ENTERPRISE_FEED_URL`. It is read only when the Enterprise module is installed. An empty value skips that check.

If an Enterprise package needs a newer Okkey and that Okkey is in the same update, the window says: "Enterprise needs Okkey {'{min}'} or newer. Okkey updates first." If that Okkey is not in the update: "Enterprise needs Okkey {'{min}'} or newer, so that package is not included." The button on that row is then disabled.

Only a workspace owner can apply an update. Everyone else sees: "Only a workspace owner can apply an update." They have no "Update" buttons.

When there is something to install, the owner sees "Ignore" and "Update" on the right. A row has its own "Update {'{component}'}" button. "Update" installs Okkey before Enterprise. Before Enterprise, the window waits until the restarted Okkey reports the needed version: "Waiting for Okkey {'{version}'} to come up before Enterprise." If that version never appears: "Okkey did not report {'{version}'} in time. Enterprise was not started."

"Ignore" hides these versions until the feed offers a newer one. For the owner, the hide applies to the installation. For everyone else, it stays in this browser.

While the package downloads: "Downloading package…". Then "Verifying package signature…" and "Applying update…". The result:

- Okkey only: "Update applied. Okkey is restarting on {'{version}'}."
- Enterprise only: "Update applied. Enterprise {'{version}'} is installed."
- Both: "Okkey {'{core}'} and Enterprise {'{enterprise}'} were applied."
- Okkey applied and Enterprise rolled back: "Okkey was applied. Enterprise was not applied." The Enterprise update can be run again.
- A complete failure: "This instance is still on the previous version."

Under a failure message, the same sentence or a more specific one:

| What you see | What it means |
| --- | --- |
| "The package has no signature, so it was not applied." | The package has no signature. |
| "The package signature is invalid, so it was not applied." | The signature did not match. |
| "Signature verification was interrupted, so the package was not applied." | The check stopped. |
| "No trusted public key is configured, so the package was not applied." | `.env` has no key the window uses to check the package. For Okkey that is `OKKEY_UPDATE_TRUSTED_PUBLIC_KEY`. For Enterprise it is `OKKEY_UPDATE_ENTERPRISE_TRUSTED_PUBLIC_KEY`. |
| "The update agent is not available. Nothing was applied." | The service that installs the package did not answer. |
| "The enterprise package signature was checked, but this installation cannot apply the enterprise module. Okkey was not changed." | There is nowhere to install the Enterprise package on this instance. |
| "Update core first. This enterprise package needs a newer core, so nothing was changed." | The Enterprise package is newer than the installed Okkey. |
| "This instance is still on the previous version." | Apply stopped. |

The image-tag path above is the one described for Docker Compose. The window does not replace a database backup before you change versions.

### Offline package

The block is "Offline package". The text is: "Upload a signed package (.okpkg / .json with payload+signature) or a combined archive (.okbundle, .zip). After a successful local check the package starts applying automatically." The button is "Upload offline package". Several files can be chosen. A chosen file has "Remove file".

After a successful local check the package starts applying automatically. That covers a signed file (`.okpkg` / `.json`) and a combined archive (`.okbundle`, `.zip`). There is no second "Update" click for this. A file larger than 1024 MB says: "The offline package is larger than the allowed size." An unrecognized file says: "The file is not an Okkey offline package." A recognized file with nothing to install right now says: "The package was recognized, but nothing can be applied from it right now."

Someone who is not the owner, when choosing a file, sees: "Only a workspace owner can apply an update." The upload button is disabled for them.

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
