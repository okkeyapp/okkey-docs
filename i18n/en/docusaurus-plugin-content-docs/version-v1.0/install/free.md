---
title: Install steps
sidebar_position: 3
plans: [free, enterprise]
---

# Install steps

Install Okkey with one command. You do not need to clone the repository.

Only Docker Compose is supported. Kubernetes and Helm are planned and are not part of v1.0.0.

Install files come from release `v1.0.0-beta.2`, and images use the tag `1.0.0-beta.2`. The script checks image signatures with cosign. The check is on by default.

The commands below stay pinned to `v1.0.0-beta.2`. That is how this install page is written today.

The install runs on Free. An Okkey employee turns on Enterprise. See [Enterprise](./enterprise.md) and [Plans](../plans.md).

## Before you start

You need the programs from [Requirements](./requirements.md): Docker Engine 28 or newer, the Compose plugin, `curl`, `bash`, and cosign.

`OKKEY_SALES_EMAIL` is required. Okkey sends plan-change requests to that address. There is no built-in address.

- If the script has a terminal, it asks `OKKEY_SALES_EMAIL:` and waits until the address looks like mail: one `@`, a dot in the domain, no spaces.
- If you pipe the script and there is no terminal, the install stops. Pass the address on the right of `|`.

Put variables on the right of `|`. `OKKEY_SALES_EMAIL=… curl … | bash` does not pass the variable into the script.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/install.sh \
  | OKKEY_REF=v1.0.0-beta.2 OKKEY_IMAGE_TAG=1.0.0-beta.2 OKKEY_SALES_EMAIL=you@example.com bash
```

Replace `you@example.com` with your address. If a terminal is attached and you omit the variable, the script asks for it.

The install directory is `~/okkey`. The Compose project name is the directory name in lowercase. For `~/okkey` that name is `okkey`.

The script does four steps:

1. Checks `OKKEY_SALES_EMAIL` before it rewrites any files.
2. Creates the directory and downloads `docker-compose.prod.yml` and `.env.example`.
3. On a first run, writes secrets and passwords into `.env`, then stores the request address.
4. Pulls the images, checks the signatures of `api`, `web`, and `worker`, and starts the stack.

After start, the script prints the web address. The default is `http://localhost:8080`. The API check on the same machine is `http://127.0.0.1:4000/health`. The body contains `"status": "ok"`. That API port is not open from another machine.

## What is in `.env`, and what to keep

`~/okkey/.env` is created once. A later run of the script does not overwrite it and does not change `OKKEY_IMAGE_TAG` inside it.

On a first install the script writes:

| Variable | Why you keep it |
| --- | --- |
| `POSTGRES_PASSWORD` | The database password. Postgres applies it only when the volume is first created. A new password does not open the old data. |
| `SESSION_SECRET` | Sessions and the second-factor secret. A new secret cannot open values sealed with the old one. |
| `JWT_SECRET` | Accepted as another name for the same session secret. |
| `EMAIL_DEAD_LETTER_SEAL_KEY` | Seals mail that carried a code and could not be sent. If the key is missing, `SESSION_SECRET` is used. |
| `MINIO_ROOT_PASSWORD` | The file-storage password. |
| `OKKEY_SALES_EMAIL` | Where a plan request is sent. Without it the API does not start. |
| `OKKEY_UPDATE_AGENT_TOKEN` | The script creates it when the field is empty. |

The file also keeps `OKKEY_IMAGE_TAG=1.0.0-beta.2`, `PUBLIC_APP_URL`, `OKKEY_API_PUBLIC_URL`, device-key sign-in settings, and the encryption policy. Leave that policy as written. Only profile 2 is allowed:

```text
DEPLOY_ENV=dev
CRYPTO_ALLOWED_PROFILE_VERSIONS=2
CRYPTO_ROLLOUT_MODE=compat
```

New registrations use KDF v2. Another profile can make registration fail.

Copy `.env` to a safe place together with the data copy. How to do that is on [Backup and restore](../admin/backup-restore.md).

:::warning
The database password is applied when the data is first created. If you delete `.env` and run the installer again while the Postgres volume still exists, the script stops and does not write a new password. Put the old `.env` back. Wiping volumes (`OKKEY_RESET_VOLUMES=1`) deletes the database, sessions, and files.
:::

Useful installer variables:

| Variable | Meaning |
| --- | --- |
| `OKKEY_REF` | Git ref of the install files. For this release: `v1.0.0-beta.2`. |
| `OKKEY_IMAGE_TAG` | Image tag written on a fresh `.env`. For this release: `1.0.0-beta.2`. |
| `OKKEY_SALES_EMAIL` | Inbox for plan requests. Required. |
| `OKKEY_INSTALL_DIR` | Directory. Default `~/okkey`. |
| `WEB_PORT` / `API_PORT` | Host ports. Defaults `8080` and `4000`. If you set only these, the script writes the same ports into the public URLs. |
| `OKKEY_RESET_VOLUMES=1` | Delete database, session, and file data before start. |

## Images and the cosign check

Images: `ghcr.io/okkeyapp/api`, `ghcr.io/okkeyapp/web`, and `ghcr.io/okkeyapp/worker`. You can pull them without signing in to the registry. The tag for this release is `1.0.0-beta.2`. Installs do not use the floating tag `latest`.

Before start, the script checks the cosign signature of the pulled digest of `api`, `worker`, and `web`. The signature is keyless, from GitHub Actions, issuer `https://token.actions.githubusercontent.com`. Postgres, Redis, and MinIO are not covered by that check.

To check one image after it has been pulled:

```bash
digest="$(docker image inspect --format '{{index .RepoDigests 0}}' ghcr.io/okkeyapp/api:1.0.0-beta.2)"
cosign verify \
  --certificate-identity-regexp '^https://github\.com/okkeyapp/okkey/\.github/workflows/publish-images\.yml@refs/(?:heads/dev|tags/v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  "$digest"
```

Repeat for `ghcr.io/okkeyapp/worker:1.0.0-beta.2` and `ghcr.io/okkeyapp/web:1.0.0-beta.2`.

## Manual install

1. Download the files for release `v1.0.0-beta.2`.

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/.env.example"
cp .env.example .env
```

2. In `.env`, replace the passwords and secrets. Leave `OKKEY_IMAGE_TAG=1.0.0-beta.2`. Set a real `OKKEY_SALES_EMAIL`. For an HTTPS site, set `PUBLIC_APP_URL`, `OKKEY_API_PUBLIC_URL`, `CORS_ORIGIN`, `WEBAUTHN_ORIGINS`, and `WEBAUTHN_RP_ID`. Leave the encryption profile as in the example: `2` only.
3. Pull the images and check the signatures with the command above. Then start the containers.

```bash
docker compose -p okkey -f docker-compose.prod.yml --env-file .env pull
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d
```

For access from other machines, put the [proxy](./domain-tls.md) in front. The install itself does not enable HTTPS. The API port stays on `127.0.0.1`.

## First sign-in without mail

While the database has no users, the first account is created without a message. Open the address the installer printed.

1. On "Welcome to Okkey", enter an email and choose "Sign in".
2. That first account does not need a code. "Register with Okkey" opens.
3. Continue with [first-time setup](../getting-started/first-setup.md).

The next sign-in and the next account ask for a 6-digit code. Until mail is configured, the worker writes the code to its log. The installer defaults to `EMAIL_PROVIDER=logger` and `DEPLOY_ENV=dev`, so the message text is in the log.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env logs -f worker
```

Look for the line `email sent`. The code is in the `plainText` field. Digits in the subject are hidden. If the directory is not `~/okkey`, use its lowercase name instead of `okkey`.

How to send real mail is on [Email](./email.md).

## How to check

On the same machine:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

In `ps`, `api`, `web`, and `worker` are running, and `api` is healthy. The `/health` body contains `"status": "ok"` and `"service": "okkey-api"`. A browser on this machine opens `http://localhost:8080`, unless you changed the port.

## Next steps

- [Domain and TLS](./domain-tls.md)
- [Email](./email.md)
- [First-time setup](../getting-started/first-setup.md)
- [If the install stops](./troubleshooting.md)
- [Backup and restore](../admin/backup-restore.md)
- [Plans](../plans.md)
