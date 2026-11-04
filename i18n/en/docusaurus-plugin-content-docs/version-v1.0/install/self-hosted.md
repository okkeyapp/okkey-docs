---
title: Install steps
sidebar_position: 3
plans: [free, enterprise]
---

# Install steps

Install Okkey with one command. You do not need to clone the repository.

Only Docker Compose is supported. Kubernetes and Helm are planned and are not part of v1.0.0.

Install files come from release `v1.0.0-beta.2`, and images use the tag `1.0.0-beta.2`. The script checks image signatures with cosign. The check is on by default.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/install.sh | OKKEY_REF=v1.0.0-beta.2 OKKEY_IMAGE_TAG=1.0.0-beta.2 bash
```

The machine needs `cosign`. Before start, the script checks the signatures of the `api`, `web`, and `worker` images.

The install directory is `~/okkey`.

The script does four steps:

1. Creates the install directory.
2. Downloads the install files.
3. Writes secrets and the database password into `.env`.
4. Starts Okkey.

After start, the web app opens at `http://localhost:8080` unless you set another address. API check: `http://localhost:4000/health`.

The install runs on Free. To get Enterprise, contact the Okkey team. When the Enterprise license expires, the installation automatically switches to the FREE plan. The plan comparison is on [Plans](../plans).

:::warning
The database password is applied when the data is first created. If you delete `.env`, create new secrets, and start the old data, the API cannot sign in to the database.
:::

Useful installer variables:

| Variable | Meaning |
| --- | --- |
| `OKKEY_REF` | Git ref of the install files. For this release: `v1.0.0-beta.2`. |
| `OKKEY_IMAGE_TAG` | Container image tag. For this release: `1.0.0-beta.2`. |
| `OKKEY_INSTALL_DIR` | Directory. Default `~/okkey`. |
| `OKKEY_RESET_VOLUMES=1` | Delete database, session, and file data before start. |

## Manual install

1. Download the files for release `v1.0.0-beta.2`.

```bash
mkdir -p ~/okkey && cd ~/okkey
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/docker-compose.prod.yml"
curl -fsSL -O "https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/.env.example"
cp .env.example .env
```

2. In `.env`, replace the passwords. Leave `OKKEY_IMAGE_TAG=1.0.0-beta.2`. For an HTTPS site, set the app address, the API address, the allowed origin, and the device-key sign-in parameters: `PUBLIC_APP_URL`, `OKKEY_API_PUBLIC_URL`, `CORS_ORIGIN`, `WEBAUTHN_ORIGINS`, `WEBAUTHN_RP_ID`.
3. Start the containers.

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

Put your own reverse proxy in front of the web app and the API. The install itself does not enable HTTPS.

Do not change the encryption settings in `.env`. Only profile 2 is allowed: `CRYPTO_ALLOWED_PROFILE_VERSIONS=2`. New registrations use KDF v2. Registration can fail if you set another value.

## Email

By default, confirmation codes are written to the background-job logs. For real mail, set SMTP in `.env`: server, port, secure connection, login, password, and the sender address (`EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`).

:::note
The first account does not need mail. SMTP is needed from the second sign-in. See [first-time setup](./first-setup).
:::

## Updates

```bash
docker compose -f docker-compose.prod.yml --env-file .env pull
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

The database updates itself on start.

## Next steps

- [First-time setup](./first-setup)
- [Plans](../plans)
- [Q-Day ready](../features/qday)
