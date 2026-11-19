---
title: Upgrade
sidebar_position: 3
plans: [free, enterprise]
---

# Upgrade

An upgrade is the same on Free and on Enterprise. For Okkey (core) you can use the System update window, an offline package, or a manual image-tag change in Docker Compose. For the Enterprise module in this release, the main path is Compose as described below.

Keep `~/okkey/.env` and the Docker volumes. Running the installer again does not change `OKKEY_IMAGE_TAG` in an existing `.env`. Edit the tag yourself.

The commands below assume the directory `~/okkey` and the project `okkey`. For another directory, `cd` there and use its lowercase name in `-p`.

## Update feeds {#update-feeds}

**Okkey (core).** The feed is published in GitHub Releases of the public [okkeyapp/okkey](https://github.com/okkeyapp/okkey/releases) repository. A public release includes `feed.json` and the `okkey-<version>.okpkg` package. By default the window reads `https://github.com/okkeyapp/okkey/releases/latest/download/feed.json`. An empty `OKKEY_UPDATE_CORE_FEED_URL` means that feed. The previous name of the same setting is `OKKEY_UPDATE_FEED_URL`.

**Enterprise.** A separate Enterprise online feed will arrive in a later release and will require a license key. In this release Enterprise modules are enabled with `ENTERPRISE_MODULES`. A license key is not needed for the modules right now. Update Enterprise with [Compose](#steps) or with an offline package issued to Enterprise customers with the Enterprise release.

In the System update window the row is named "Okkey". An "Enterprise" row appears when the module is installed. The full screen is in [The window in the app](#the-window-in-the-app).

## Steps with Docker Compose {#steps}

### Okkey (core)

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

For the release this install page is pinned to, `<tag>` is `1.0.0-beta.3` and the git tag is `v1.0.0-beta.3`.

### Enterprise

In this release the main Enterprise upgrade path is Docker Compose.

The public `docker-compose.prod.yml` from okkey keeps the same `api`, `web`, `worker`, and `update-agent` services. The Enterprise module replaces the `api`, `web`, and `worker` images through `OKKEY_API_IMAGE`, `OKKEY_WEB_IMAGE`, and `OKKEY_WORKER_IMAGE`. The `update-agent` service also takes its image from `OKKEY_API_IMAGE`. The tag comes from `OKKEY_ENTERPRISE_IMAGE_TAG`, or from `OKKEY_IMAGE_TAG` when that is empty. The names `enterprise-api`, `enterprise-web`, and `enterprise-worker` appear only as keys inside an Enterprise offline package; there are no separate Compose services with those names.

When the module is already installed:

1. Take a [backup](./backup-restore.md).
2. In `.env`, set the new `OKKEY_ENTERPRISE_IMAGE_TAG` and, if needed, the image names left by the Okkey employee who enabled the plan (`OKKEY_API_IMAGE`, `OKKEY_WEB_IMAGE`, `OKKEY_WORKER_IMAGE`).
3. Refresh the Compose file from git tag `v<tag>`, pull the images, verify the cosign signature, then restart the stack:

```bash
cd ~/okkey
curl -fsSL -o docker-compose.prod.yml \
  "https://raw.githubusercontent.com/okkeyapp/okkey/v<tag>/deploy/docker/docker-compose.prod.yml"
docker compose -p okkey -f docker-compose.prod.yml --env-file .env pull
```

Verify the Enterprise images with cosign using the command in [Versions and releases](#versions-and-releases). Then start:

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

An Enterprise package or image needs a new enough Okkey. Update core first when the installation says so.

## What the API does on start

On start, the API and the worker apply the SQL files in `services/api/migrations` in order and record each filename in `schema_migrations`. The two processes take the same Postgres advisory lock, so a start together does not apply one file twice.

A database created by v1.0.0-beta.1 has no `schema_migrations` table. That release applied files `0001`-`0034` with `psql`. On the first start with the migrator, the API recognizes that schema, records `0001`-`0034` as already applied, and runs only the files after `0034`. It does not mark every file applied. A database that matches no known checkpoint is refused. The process does not skip the SQL.

This start path has no scripts that undo a migration already recorded. Take a [backup](./backup-restore.md) before you upgrade. Returning to the old data is on [Rollback](./rollback.md).

## The window in the app {#the-window-in-the-app}

The window exists only on self-hosted, on Free and on Enterprise. Anyone who is signed in can open it. The bottom of the sidebar shows the version, for example `v1.0.0-beta.3`. When the server knows the commit the core was built from, the first 8 characters of its SHA follow in parentheses: `v1.0.0-beta.3 (2bf668f3)`. The full SHA is only in the `data-commit-sha` attribute. When the version is a bare commit SHA, the sidebar shows `v0.0.0-dev` followed by the short SHA in parentheses, for example `v0.0.0-dev (2bf668f3)`. The address is `?popup=systemUpdate`.

While the feed has a version newer than the one already opened in this window, the version icon changes. A screen reader also hears "Update available". In the collapsed sidebar the icon stays and the version text is hidden. Opening the window clears that state for the versions it shows.

The title is "System update". The text is: "Review online feed updates, or upload an offline package to apply it after a successful check." "Close" cannot be used while an update is running.

The window is split into online update and offline package upload. After a successful local check, an offline package starts applying automatically. The Okkey row and, when the module is installed, the Enterprise row show the current version and, when the install reports a commit, a short SHA in parentheses, for example `1.0.0-beta.3 (6e6ee86)`.

For Okkey in this release the window covers the core online feed and a core offline package. For Enterprise the main upgrade path is [Compose](#steps).

### Online update

The block is "Online update".

If network checks are off (`OKKEY_UPDATE_ISOLATED=true`), the lines are replaced by: "Online updates are disabled by the server administrator. Use an offline package below." Details are in [Isolated mode](#isolated-mode).

Otherwise the window shows an "Okkey" row. An "Enterprise" row is present when the Enterprise module is installed: it shows the current version and a short SHA when the install reports one. The Enterprise online feed will arrive in a later release.

For Okkey a row says "Current version {'{version}'}". When the API knows the commit, a short SHA is appended to the version. When the core feed has something newer, it also says "New version {'{version}'}", a short release summary, and a "Release notes" link when the release has an `http` or `https` address. When nothing is newer: "Up to date". When the core feed could not be read: "Okkey could not be checked."

An empty list with a core feed configured says: "This instance is up to date." With no feed: "No feed is configured. You can still upload an offline package below." A feed that could not be read says: "The update feed could not be read. Nothing was applied."

How the core feed is set is in [Update feeds](#update-feeds).

Only a workspace owner can apply a core feed update. Everyone else sees: "Only a workspace owner can apply an update." They have no "Update" buttons.

When the core feed has something to install, the owner sees "Ignore" and "Update" on the right. The Okkey row has its own "Update Okkey" button.

"Ignore" hides these versions until the feed offers a newer one. For the owner, the hide applies to the installation. For everyone else, it stays in this browser.

While the package downloads: "Downloading package…". Then "Verifying package signature…" and "Applying update…". The result:

- Okkey only: "Update applied. Okkey is restarting on {'{version}'}."
- Enterprise only: "Update applied. Enterprise {'{version}'} installed."
- Both: "Okkey {'{core}'} and Enterprise {'{enterprise}'} were applied."
- Partial package (Okkey applied, Enterprise not): "Okkey {'{core}'} was applied. Enterprise stayed on the previous version. Retry the Enterprise update." Under it: "Okkey was applied. Enterprise was not applied and was rolled back." The button is "Retry Enterprise update".
- A complete failure: "Update failed. This instance is still on the previous version."

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
| "Okkey was applied. Enterprise was not applied and was rolled back." | The combined archive installed Okkey, and Enterprise rolled back. |
| "The enterprise license has expired." | The Enterprise license has expired. |
| "The offline package is larger than the allowed size." | A package whose zip archive is larger than 1,000,000 bytes. |
| "Update failed. This instance is still on the previous version." | Apply stopped. |

The image-tag path above is the one described for Docker Compose. The window does not replace a database backup before you change versions.

### Offline package

The block is "Offline package". The text is: "Upload a signed package (.okpkg / .json with payload+signature) or a combined archive (.okbundle, .zip). After a successful local check the package starts applying automatically." The button is "Upload offline package". Several files can be chosen. A chosen file has "Remove file".

After a successful local check the package starts applying automatically. That covers a signed file (`.okpkg` / `.json`) and a combined archive (`.okbundle`, `.zip`). There is no second "Update" click for this. A package whose zip archive is larger than 1,000,000 bytes says: "The offline package is larger than the allowed size." An unrecognized file says: "The file is not an Okkey offline package." A recognized file with nothing to install right now says: "The package was recognized, but nothing can be applied from it right now."

Someone who is not the owner, when choosing a file, sees: "Only a workspace owner can apply an update." The upload button is disabled for them.

Take the core package `okkey-<version>.okpkg` from [public okkey releases](https://github.com/okkeyapp/okkey/releases). A combined `.okbundle` archive is not part of public okkey Releases: it is issued to Enterprise customers with the Enterprise release. For Enterprise upgrades in this release, the main path is [Compose](#steps).

## Isolated mode {#isolated-mode}

`OKKEY_UPDATE_ISOLATED=true` turns off online checks, including the default core feed. Updates then go through an offline package or Compose.

### What to download

- Okkey only: from the [okkey releases page](https://github.com/okkeyapp/okkey/releases), the `okkey-<version>.okpkg` file for the tag you need. The same public release also has `feed.json`. There is no combined `.okbundle` in public okkey Releases.
- Okkey and Enterprise together: a combined `.okbundle` archive is issued to Enterprise customers with the Enterprise release. A `.sha256` checksum file may ship next to it. The archive holds both packages.

The window also accepts a combined archive as `.zip` with the same packages.

### How to verify

If a `.sha256` file was issued with the combined archive, check the checksum:

```bash
echo "$(cat okkey-offline-<version>.okbundle.sha256)  okkey-offline-<version>.okbundle" | sha256sum -c -
```

Or compare the hash of the downloaded file with the single line in `.sha256`. After upload, the window checks the package signature again with the trusted keys in `.env`. For a core package, `OKKEY_UPDATE_TRUSTED_PUBLIC_KEY` is enough. For an Enterprise package and for a combined `.okbundle` archive, `OKKEY_UPDATE_ENTERPRISE_TRUSTED_PUBLIC_KEY` is also required. Without the needed key the package is not applied.

In isolated mode images are not downloaded from the network. The required images must already be on the machine, or apply stops.

### How to upload

1. Open System update from the version in the sidebar.
2. In Offline package, click "Upload offline package" and choose a `.okbundle` package file (it contains both core and Enterprise) or a separate `.okpkg`.
3. After a successful local check the package starts applying automatically. There is no second "Update" click.

Only a workspace owner can apply. Take a [backup](./backup-restore.md) first. For Enterprise on an isolated install, use [Compose](#steps) and the packages issued with the Enterprise release.

## Versions and releases {#versions-and-releases}

Okkey versions follow SemVer: `X.Y.Z`. Pre-releases add a suffix, for example `1.0.0-beta.3` or `1.0.0-rc.1`.

| What is published | Image tags |
| --- | --- |
| Git tag `vX.Y.Z` with no suffix | `:X.Y.Z`, `:X.Y`, and `:X` |
| A pre-release git tag, for example `v1.0.0-beta.3` | `:1.0.0-beta.3` only |

An install pins both the git ref and the image tag. For the commands on the install pages that pin is `OKKEY_REF=v1.0.0-beta.3` and `OKKEY_IMAGE_TAG=1.0.0-beta.3`. Installs do not use the floating tag `latest`.

Okkey images: `ghcr.io/okkeyapp/api`, `ghcr.io/okkeyapp/web`, and `ghcr.io/okkeyapp/worker`. You can pull them without signing in to the registry.

Public okkey Releases publish `feed.json` and `okkey-<version>.okpkg`. A combined `.okbundle` archive is not included there.

`docker compose pull` does not verify image signatures. The `install.sh` installer checks them after `pull` and before `up`. For a manual upgrade the administrator runs cosign.

The command below verifies core images only (`ghcr.io/okkeyapp/api`, `web`, `worker`). Replace `1.0.0-beta.3` with your tag:

```bash
digest="$(docker image inspect --format '{{index .RepoDigests 0}}' ghcr.io/okkeyapp/api:1.0.0-beta.3)"
cosign verify \
  --certificate-identity-regexp '^https://github\.com/okkeyapp/okkey/\.github/workflows/publish-images\.yml@refs/(?:heads/dev|tags/v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  "$digest"
```

Repeat for `worker` and `web`. Postgres, Redis, and MinIO are not covered by this signature.

Enterprise images are `ghcr.io/okkeyapp/okkey-enterprise/api`, `ghcr.io/okkeyapp/okkey-enterprise/worker`, and `ghcr.io/okkeyapp/okkey-enterprise/web`. They are signed by the `okkey-enterprise` repository (GitHub Actions workflow `publish-images.yml`, same OIDC issuer `https://token.actions.githubusercontent.com`). Trusted refs are release tags `v*`, branches `release/*` and `hotfix/*` (not `dev`). Verification needs that repository's signature identity, not the core command above. The images are private: run `docker login ghcr.io` before pull and verify. Set your tag in `OKKEY_ENTERPRISE_IMAGE_TAG`:

```bash
identity_regexp='^https://github\.com/okkeyapp/okkey-enterprise/\.github/workflows/publish-images\.yml@refs/(?:tags/v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?|heads/release/[0-9A-Za-z._-]+|heads/hotfix/[0-9A-Za-z._-]+)$'

for image in \
  ghcr.io/okkeyapp/okkey-enterprise/api \
  ghcr.io/okkeyapp/okkey-enterprise/web \
  ghcr.io/okkeyapp/okkey-enterprise/worker
do
  digest_ref="$(docker image inspect --format '{{index .RepoDigests 0}}' "${image}:${OKKEY_ENTERPRISE_IMAGE_TAG}")"
  cosign verify \
    --certificate-identity-regexp "${identity_regexp}" \
    --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
    "${digest_ref}"
done
```

Release notes are on the GitHub releases page: [github.com/okkeyapp/okkey/releases](https://github.com/okkeyapp/okkey/releases). A pre-release note says the version is not final yet.

## How to check

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

`api`, `web`, and `worker` are running, and `api` is healthy. The `/health` body contains `"status": "ok"`. Open the web app and sign in. In System update, the current Okkey version matches the release you installed.

## Common errors

| What you see | What to do |
| --- | --- |
| `docker compose pull` cannot find the tag | The tag is not in GHCR yet. Keep the previous `OKKEY_IMAGE_TAG` and the previous Compose file. |
| `cosign verify failed` | The image did not match the signature. Do not start it. Put back the previous tag from the `.env` copy. |
| `password authentication failed for user "okkey"` | `POSTGRES_PASSWORD` is not the one for this volume. Put back `.env` from the backup. |
| The installer says the tag in `.env` was left as it was | That is what happens when `.env` already exists. Edit the tag in the file yourself. |
| `OKKEY_RESET_VOLUMES=1` is set in `.env` | Remove it before `up`. Otherwise the database, Redis, and MinIO are wiped. |
| Online rows in the window are empty with `OKKEY_UPDATE_ISOLATED=true` | Use a core [offline package](#isolated-mode) or Compose. |

## Next steps

- [Backup and restore](./backup-restore.md)
- [Rollback](./rollback.md)
- [Install steps](../install/free.md)
- [Enterprise](../install/enterprise.md)
