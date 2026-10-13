---
title: Install steps
sidebar_position: 3
plans: [free, enterprise]
---

# Install steps

The shortest path is one command from the `dev` root README. You do not clone the monorepo.

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/install.sh | bash
```

`OKKEY_REF` defaults to `dev`. The install directory is `~/okkey` (`OKKEY_INSTALL_DIR`).

The script does four steps:

1. Creates the install directory.
2. Downloads `docker-compose.prod.yml` and `.env.example` from the selected ref.
3. Generates `JWT_SECRET`, `SESSION_SECRET`, and the Postgres and MinIO passwords into `.env`.
4. Runs `docker compose pull` and `up -d`.

After start, the web UI is at `PUBLIC_APP_URL` or `http://localhost:$WEB_PORT` (default `http://localhost:8080`). API check: `http://localhost:4000/health`.

## If pull cannot find images

`deploy/docker/README.md` on the same branch still describes a temporary ref `cursor/self-host-docker-2ea1` and tag `0.0.0-pr19.4`, while GHCR packages may be private. If `docker compose pull` from `dev` cannot find images, follow that README and `OKKEY_IMAGE_TAG`. Do not invent a tag. **TODO:** `dev` does not name a stable release tag. Images are published from git tags `v*` plus `latest`.

Installer variables:

| Variable | Meaning |
| --- | --- |
| `OKKEY_REF` | Branch, tag, or SHA used to download `deploy/docker/*`. Default `dev`. |
| `OKKEY_INSTALL_DIR` | Directory. Default `~/okkey`. |
| `OKKEY_SKIP_PULL=1` | Do not pull images (local build). |
| `OKKEY_RESET_VOLUMES=1` | `docker compose down -v` before start. Wipes Postgres, Redis, and MinIO data. |

:::warning
Postgres applies the password only when the volume is first created. If you delete `.env`, generate new secrets, and reuse the old `okkey_okkey-postgres` volume, the API crash-loops on Postgres authentication.
:::

## Manual install

1. Download the compose file and the env example.

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/.env.example"
cp .env.example .env
```

2. In `.env`, replace the passwords. For a domain with TLS set `PUBLIC_APP_URL`, `OKKEY_API_PUBLIC_URL`, `CORS_ORIGIN`, `WEBAUTHN_ORIGINS`, and `WEBAUTHN_RP_ID`.
3. Start the containers.

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

Put your own reverse proxy in front of `web` and `api` (core docs name Caddy, Traefik, and nginx). This compose file does not terminate TLS.

## Email

The default is `EMAIL_PROVIDER=logger` and `EMAIL_DELIVERY_MODE=queue`. Confirmation codes show up in **worker** logs, not API logs: the API only enqueues mail in Redis (`okkey:email:queue`, `okkey:email:delayed`, `okkey:email:dead`). For real mail set SMTP in `.env` (`EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`).

:::note
The first account does not need mail. SMTP matters from the second sign-in. See [first-time setup](./first-setup).
:::

## Enterprise modules

Some screens appear only when enterprise modules are on: "Custom roles", "Custom profiles", "Additional members", "Shared vaults", "Trusted devices", "Trusted contacts", and capsule "Advanced settings". "Allow files in items" and "Monitoring" are available on Free as well.

- API: `ENTERPRISE_MODULES=true`. Optional `ENTERPRISE_MODULES_PATH` is the path to the `okkey-enterprise` directory.
- Web: `VITE_ENTERPRISE_MODULES=true`.

When `ENTERPRISE_MODULES=false` or the variable is unset, registration sets `plan_tier` to `FREE`. The API serves "Built-in roles" and "Built-in profiles". "Custom roles", "Custom profiles", "Additional members", and "Shared vaults" do not appear.

With `ENTERPRISE_MODULES=true`, a new workspace is registered as `plan_tier` `ENTERPRISE`. On self-hosted, an owner has one workspace. The plan comparison is on [Plans](../plans).

An existing Free workspace is moved to Enterprise only manually, when you ask, by an Okkey specialist. Contact the Okkey team and provide SSH access to the VPS where Okkey is installed. More is in [Plans](../plans#an-existing-workspace).

## Crypto policy for this install

Keep this for the current web client:

```text
DEPLOY_ENV=dev
CRYPTO_ALLOWED_PROFILE_VERSIONS=1,2
CRYPTO_ROLLOUT_MODE=compat
```

Otherwise registration returns “Encryption profile is not allowed” (`CRYPTO_PROFILE_NOT_ALLOWED`). Details are in [Q-Day ready](../features/qday).

## Updates

```bash
docker compose -f docker-compose.prod.yml --env-file .env pull
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

SQL files from `services/api/migrations` are applied by the API (and the worker) on start and recorded in `schema_migrations`.

## Local image build

From the monorepo root:

```bash
docker build -f services/api/Dockerfile --target api -t ghcr.io/okkeyapp/api:local .
docker build -f services/api/Dockerfile --target worker -t ghcr.io/okkeyapp/worker:local .
docker build -f apps/web/Dockerfile -t ghcr.io/okkeyapp/web:local .
```

In `.env` set `OKKEY_IMAGE_TAG=local` and, if needed, `OKKEY_API_IMAGE`, `OKKEY_WEB_IMAGE`, `OKKEY_WORKER_IMAGE`. Install with `OKKEY_SKIP_PULL=1`.

## Next steps

- [First-time setup](./first-setup)
- [Plans](../plans)
- [Q-Day ready](../features/qday)
