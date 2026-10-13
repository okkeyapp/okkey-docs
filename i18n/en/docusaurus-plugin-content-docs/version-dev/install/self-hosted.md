---
title: Install steps
sidebar_position: 3
plans:
  selfhosted: [free, enterprise]
  cloud: []
---

# Install steps

The preferred path from the `dev` root README is one command, with no monorepo clone:

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/install.sh | bash
```

`OKKEY_REF` defaults to `dev`. The install directory is `~/okkey` (`OKKEY_INSTALL_DIR`).

The script:

1. Creates the install directory.
2. Downloads `docker-compose.prod.yml` and `.env.example` from the selected ref.
3. Generates `JWT_SECRET`, `SESSION_SECRET`, and the Postgres and MinIO passwords into `.env`.
4. Runs `docker compose pull` and `up -d`.

After start, the web UI is at `PUBLIC_APP_URL` or `http://localhost:$WEB_PORT` (default `http://localhost:8080`). API check: `http://localhost:4000/health`.

## What is still true on dev

`deploy/docker/README.md` on the same branch still describes a temporary ref `cursor/self-host-docker-2ea1` and tag `0.0.0-pr19.4`, while GHCR packages may be private. If `docker compose pull` from `dev` cannot find images, follow that README and `OKKEY_IMAGE_TAG`. Do not invent a tag. **TODO:** `dev` does not name a stable release tag. Images are published from git tags `v*` plus `latest`.

Installer variables:

| Variable | Meaning |
| --- | --- |
| `OKKEY_REF` | Branch, tag, or SHA used to download `deploy/docker/*`. Default `dev`. |
| `OKKEY_INSTALL_DIR` | Directory. Default `~/okkey`. |
| `OKKEY_SKIP_PULL=1` | Do not pull images (local build). |
| `OKKEY_RESET_VOLUMES=1` | `docker compose down -v` before start. Wipes Postgres, Redis, and MinIO data. |

Postgres applies `POSTGRES_PASSWORD` only when the volume is first created. If you delete `.env`, generate new secrets, and reuse the old `okkey_okkey-postgres` volume, the API crash-loops on Postgres authentication.

## Manual install

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/dev/deploy/docker/.env.example"
cp .env.example .env
```

In `.env`, replace the passwords. For a domain with TLS set:

- `PUBLIC_APP_URL`
- `OKKEY_API_PUBLIC_URL`
- `CORS_ORIGIN`
- `WEBAUTHN_ORIGINS`
- `WEBAUTHN_RP_ID`

Then:

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

Put your own reverse proxy in front of `web` and `api` (core docs name Caddy, Traefik, and nginx). This compose file does not terminate TLS.

## Email

The default is `EMAIL_PROVIDER=logger` and `EMAIL_DELIVERY_MODE=queue`. Confirmation codes show up in **worker** logs, not API logs: the API only enqueues mail in Redis (`okkey:email:queue`, `okkey:email:delayed`, `okkey:email:dead`). For real mail set SMTP in `.env` (`EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`).

## Enterprise modules

Paid self-hosted screens (custom roles, invitations, shared vaults, advanced recovery) turn on with two flags, and both are required.

- API: `ENTERPRISE_MODULES=true`. Optional `ENTERPRISE_MODULES_PATH` is the path to the `okkey-enterprise` directory.
- Web: `VITE_ENTERPRISE_MODULES=true`.

While the flag is off, the API serves only built-in roles and profiles. There are no custom roles, invitations, shared-vault creation, or `POST /workspaces`.

Deployment mode is read from the enterprise env once the modules are on. Those files are not in the public core `.env` examples.

- API, `okkey-enterprise/backend/.env`: `OKKEY_DEPLOYMENT_MODE=self_hosted` or `saas`. The value in that file overrides the same name in the process. `saas` registers `POST /workspaces`. On `self_hosted` an owner still has at most one workspace.
- Web, `okkey-enterprise/web/.env`: `VITE_DEPLOYMENT_MODE=self_hosted` or `saas`. `saas` turns on the plan catalog, creating more than one workspace, the delete danger zone, and the full SaaS policy text.
- Optional: `VITE_OKKEY_LICENSE_EXPIRES_AT`, an ISO-8601 date. It is shown on self-hosted when the plan is not `FREE`.

With `ENTERPRISE_MODULES=true`, registering a new workspace sets `plan_tier` to `ENTERPRISE`. An additional SaaS workspace is created as `FREE`. Self-hosted has no self-serve checkout: Free shows “License request”, any other tier shows “Лицензия активна”. A license validator is not implemented in the repository; the architecture note marks it as future work.

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
