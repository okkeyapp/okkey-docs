---
title: If the install stops
sidebar_position: 7
plans: [free, enterprise]
---

# If the install stops

This page is for Free and for Enterprise. The commands assume the directory `~/okkey` and the Compose project `okkey`. If the directory is different, use its path and its lowercase name.

## No address for plan requests

The script stops and says that `OKKEY_SALES_EMAIL` is required. That happens when you pipe the install and there is no terminal and no variable on the right of `|`.

Run it again and pass the address on the right:

```bash
curl -fsSL https://raw.githubusercontent.com/okkeyapp/okkey/v1.0.0-beta.2/deploy/docker/install.sh \
  | OKKEY_REF=v1.0.0-beta.2 OKKEY_IMAGE_TAG=1.0.0-beta.2 OKKEY_SALES_EMAIL=you@example.com bash
```

An address with a space, with no `@`, or with no dot in the domain is rejected. The check runs before files are written: a bad address does not rewrite an install that is already in place.

If the API does not start and the log contains `OKKEY_SALES_EMAIL is required`, the field in `.env` is empty. Write the address and start the stack again.

## Variables did not reach the script

`OKKEY_REF=v1.0.0-beta.2 curl … | bash` does not pass the variable into `bash`. Put them on the right of `|`, as in the command above. Otherwise the script can download files from the wrong ref.

## No Docker Compose or no cosign

`docker compose plugin is required` — install the Compose plugin and check `docker compose version`.

`cosign is not installed` — install [cosign](https://docs.sigstore.dev/cosign/system_config/installation/) and run the script again. The install does not continue without the signature check.

`cosign verify failed` — the signature of the pulled image did not match. Check that `OKKEY_IMAGE_TAG` is published, and pull the images again. The manual check is on [Install steps](./free.md).

`docker compose pull failed` — the tag is not in GHCR (`ghcr.io/okkeyapp/api`, `web`, `worker`). The tag on this page is `1.0.0-beta.2`.

## The API does not become healthy

The script waits until the `api` container is healthy, and then prints the tail of its log. A common cause is a database password that does not match the volume.

Postgres applies `POSTGRES_PASSWORD` only when the volume is first created. If you deleted `.env` and the installer would write a new password while the volume `okkey_okkey-postgres` still exists, the script stops before it writes that password. With a password that is already wrong, the API log can show `password authentication failed for user "okkey"`.

Put back the previous `.env` with the same `POSTGRES_PASSWORD`. Wiping the volumes deletes the data:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env down -v
```

After `down -v` you can run the install again. The database, sessions, and files are gone.

## The web app opens, but not from another machine

The API listens on `127.0.0.1` only. `http://<server>:4000` from another machine does not answer. For access by name, set up a [domain and TLS](./domain-tls.md). Do not publish the API on `0.0.0.0` when `TRUSTED_PROXY_HOPS` is greater than zero.

If the proxy says `/etc/nginx/certs/fullchain.pem` or `privkey.pem` is missing, put both files in `~/okkey/proxy/certs/`.

## Registration talks about the encryption profile

`.env` must keep `DEPLOY_ENV=dev`, `CRYPTO_ALLOWED_PROFILE_VERSIONS=2`, and `CRYPTO_ROLLOUT_MODE=compat`. Profile `1` is refused at startup. Refresh `docker-compose.prod.yml` from tag `v1.0.0-beta.2` if the file is old and hardcodes another environment, then recreate `api` and `worker`:

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env up -d --force-recreate api worker
```

## The sign-in code is not in the mailbox

Until SMTP is set, the code is in the worker log, in `plainText` on the line `email sent`. The command is on [Email](./email.md). If the worker is stopped, the message waits in the queue. Check `docker compose ps`: `worker` must be running.

## How to check that it is up again

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps
curl -fsS http://127.0.0.1:4000/health
```

The body contains `"status": "ok"`. The web app opens at `PUBLIC_APP_URL` from `.env`.

## Next steps

- [Install steps](./free.md)
- [Requirements](./requirements.md)
- [Domain and TLS](./domain-tls.md)
- [Email](./email.md)
- [Backup and restore](../admin/backup-restore.md)
