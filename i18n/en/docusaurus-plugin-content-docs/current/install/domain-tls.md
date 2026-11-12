---
title: Domain and TLS
sidebar_position: 4
plans: [free, enterprise]
---

# Domain and TLS

This page is for Free and for Enterprise. Both run on your machine with the same Compose file.

The API port is published on `127.0.0.1` only. A browser on that same machine opens the web app at `http://localhost:8080`. Another machine cannot reach the API directly. A name on the network needs the reverse proxy in `deploy/docker/proxy`.

The proxy is nginx with OpenSSL 3.5 or newer. The default listener accepts TLS 1.3 only and negotiates the hybrid group `X25519MLKEM768`. That is the post-quantum key exchange on the path between the browser and the proxy. A client without this group does not connect to the main name. A separate name for older clients is off. You turn it on explicitly, on different names, and with an end date. The classical group is not added to the main name.

The commands below stay on release `v1.0.0-beta.2`, the same pin as [Install steps](./free.md).

## What to prepare

1. Two DNS names for this machine, for example `app.example.com` and `api.example.com`.
2. A certificate that includes both names. Files: `fullchain.pem` and `privkey.pem`.
3. The whole `proxy` directory next to `docker-compose.prod.yml`. The Compose overlay alone is not enough: the build uses `proxy/nginx` and the certificate directory.

Copy the directory from the release:

```bash
git clone --depth 1 --branch v1.0.0-beta.2 https://github.com/okkeyapp/okkey.git /tmp/okkey-src
cp -a /tmp/okkey-src/deploy/docker/proxy ~/okkey/proxy
```

Put the certificate at `~/okkey/proxy/certs/fullchain.pem` and the key at `~/okkey/proxy/certs/privkey.pem`.

`proxy/scripts/gen-self-signed.sh` writes a self-signed certificate into the same directory. Use it to try the proxy on your own machine. People who open the site from other machines need a normal certificate.

## Variables

In `~/okkey/.env`, set the names and addresses. Example:

```bash
PUBLIC_APP_URL=https://app.example.com
OKKEY_API_PUBLIC_URL=https://api.example.com
CORS_ORIGIN=https://app.example.com
WEBAUTHN_ORIGINS=https://app.example.com
WEBAUTHN_RP_ID=example.com
OKKEY_WEB_HOST=app.example.com
OKKEY_API_HOST=api.example.com
TRUSTED_PROXY_HOPS=1
```

`TRUSTED_PROXY_HOPS=1` is required because nginx adds one hop to `X-Forwarded-For`. Leave the API host port on `127.0.0.1`. Publishing `0.0.0.0` while `TRUSTED_PROXY_HOPS` is greater than zero lets clients skip the proxy.

The proxy reaches the API on the Compose network at `api:4000`. From outside, the web app listens on 443, and the API listens on 443 on its own name.

## Start

From the install directory:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml -f proxy/docker-compose.proxy.yml \
  --env-file .env up -d --build proxy
```

The proxy image is built on the machine. It is not a `ghcr.io/okkeyapp/*` image, and cosign does not sign it. The signatures of `api`, `web`, and `worker` are still checked at install time.

If the project name is not `okkey`, use the lowercase directory name.

## How to check

On a machine with OpenSSL 3.5 or newer that lists the group `X25519MLKEM768`:

```bash
cd ~/okkey
./proxy/verify-tls.sh app.example.com 443
curl -fsSI https://app.example.com/
curl -fsS https://api.example.com/health
```

The script expects the group `X25519MLKEM768` and a TLS 1.2 rejection on the main name. `/health` answers `"status": "ok"`. A browser opens `https://app.example.com`.

The API port on the server itself is still `http://127.0.0.1:4000/health`.

## Next steps

- [Install steps](./free.md)
- [Email](./email.md)
- [If the install stops](./troubleshooting.md)
- [Upgrade](../admin/upgrade.md)
