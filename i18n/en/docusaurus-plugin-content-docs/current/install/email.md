---
title: Email
sidebar_position: 5
plans: [free, enterprise]
---

# Email

Mail is used for sign-in codes, invitations, and the plan request. This page is for Free and for Enterprise on your machine.

The first account on an empty database does not need a message. From the second sign-in, the server sends a 6-digit code. See [first-time setup](../getting-started/first-setup.md).

## Until SMTP is set

The installer writes `EMAIL_PROVIDER=logger` in `.env`. Messages are not delivered. The worker prints them in its log. That is the default while `DEPLOY_ENV=dev`, which the installer leaves in place.

```bash
cd ~/okkey
docker compose -p okkey -f docker-compose.prod.yml --env-file .env logs -f worker
```

Look for the line `email sent`. The code is in the `plainText` field. Digits in the subject are hidden. If the directory is not `~/okkey`, use the lowercase directory name instead of `okkey`.

A member invitation is not saved when mail is not configured or the public app address is missing. The plan request goes to `OKKEY_SALES_EMAIL` from `.env`. You set that address at install time. It is not a field in "Server mail".

## Server mail in settings

The workspace owner sets SMTP and the public app address. The section is shown on self-hosted only, and only to the owner. Open "Settings", "General". The block is "Server mail". Its caption is "These settings apply to the whole server, not only this workspace."

| Field | Label |
| --- | --- |
| SMTP host | The server name. |
| Port | An integer from 1 to 65535. |
| Encryption | "None", "STARTTLS", or "TLS". |
| Username | The SMTP account. |
| Password | If a password is already saved, leave the field empty. The hint is "Leave blank to keep the current password". Next to it: "A password is saved". |
| Sender address | The From address. |
| Public app URL | The address people use to open Okkey. Invitation links are built from it. |

"Save" stores the block. "Send test email" sends a message to the owner's address. Success: "Test email sent". The test needs a host, a port, encryption, and a sender address.

An empty block uses the `.env` values: `EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`, and `PUBLIC_APP_URL`. Values saved in "Server mail" win for delivery. The password in the database is sealed with `SESSION_SECRET`. The server response does not return the password itself.

While the block has no SMTP host of its own and `.env` still has `EMAIL_PROVIDER=logger`, codes are still written to the worker log.

## If the SMTP password can no longer be read

The password in settings is opened with a key from `SESSION_SECRET`. After you change that secret, the old value does not open. Above the fields you see: "The saved SMTP password can't be read after a server secret change. Please enter it again."

Enter the password again and choose "Save". Or choose "Clear saved password". Delivery then uses the password from `.env` again, if one is set there.

## Invitations and the worker

An invitation needs the public app address and a mail transport. The link in the message lasts 14 days. See [Members](../workspace/members.md).

The API puts messages on a Redis queue. The worker sends them. If the worker is stopped, messages wait in the queue.

The same worker removes what has expired:

- once an hour it deletes items that have stayed in the trash longer than the workspace retention, and their files;
- once a minute it deletes capsules whose removal time has passed, and the related files.

Trash retention is set in "Settings", "Items". See [Workspace settings](../workspace/index.md).

## How to check

1. Sign in as the owner. "Settings", "General" shows the "Server mail" block. A member with the "User" role does not see it: they have no "Settings".
2. Fill in the host, port, encryption, sender, and public URL. Choose "Send test email". The owner's mailbox receives "Okkey SMTP test".
3. Without SMTP, sign in a second time and run the log command above. The code is in `plainText`.
4. `docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps` shows `worker` as running.

## Next steps

- [Install steps](./free.md)
- [Members](../workspace/members.md)
- [Change plan](../workspace/plan.md)
- [First-time setup](../getting-started/first-setup.md)
- [If the install stops](./troubleshooting.md)
