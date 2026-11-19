---
title: Email
sidebar_position: 5
plans: [free, enterprise]
---

# Email

Mail is used for sign-in codes, invitations by email, and the plan request. Invite links do not need mail. This page is for Free and for Enterprise on your machine.

The first account on an empty database does not need a message. See [first-time setup](../getting-started/first-setup.md).

Mail is active only after a test message succeeds. Until then, sign-in codes are not sent by email.

## Until mail is active

The installer writes `EMAIL_PROVIDER=logger` in `.env`. That value alone does not turn mail on.

The first time you open "Mail", the fields may be filled from `.env`: `EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM`, and `PUBLIC_APP_URL`. The status stays inactive. After the first save, empty fields are not filled from `.env` again.

The next sign-in, while mail is inactive, uses the master password. After the email address, "Welcome to Okkey" opens. The text is: "Because SMTP is not configured or not active, sign in with your master password. It stays on this device." The field is "Master password", the button is "Sign in". "Sign in with an email code" opens the code screen. "Enter a different email" returns to the address.

A wrong password says: "Could not sign in. Check your email and master password, or use an email code." Too many attempts: "Too many attempts. Wait a bit and try again." When mail is already active, this screen says: "This server requires an email code."

If the second factor is not on yet, a successful master-password sign-in opens "Add an authenticator app?". The text is: "Email is not set up on this server. An authenticator app is a second step if someone learns your master password." The buttons are "Set up authenticator" and "Not now". If the second factor is already on, [two-factor authentication](../account/two-factor.md) opens immediately.

On the code screen, while mail is inactive, a notice says: "Mail is not configured on this server. The confirmation code is in the worker logs." Under it: "Run:" and the command `docker compose logs worker`, and the link "sign in with your master password".

An invitation is not saved when the public app address is missing. While mail is inactive, an email invitation is saved with the status "Pending delivery", and the message is not sent over SMTP. Above the form on the "Email" tab, a notice says: "Mail is not configured. Invitations will be sent when mail is working. You can still create invite links." The notice links to "Configure mail". After a successful test message, pending invitations that have not expired are sent on their own. The list has "Resend" and "Copy invite link". Each press of "Copy invite link" creates a new link; the previous one, including the one from the email, stops working. The invitation expiry is not extended. "Resend" also issues a new link. The link gives access to accepting the invitation. Pass it only to the recipient, in person. The link lasts 14 days. Invite by link does not need mail - see [Members](../workspace/members.md). A plan request while mail is inactive opens a prepared message in the mail program, addressed to `OKKEY_SALES_EMAIL` from `.env`. That address is not a field in "Mail". See [Change plan](../workspace/plan.md).

## Mail in settings

The section is shown on self-hosted only. Open "Settings", then "Mail". In the menu it sits between "General" and "Items".

The item is visible when the role allows the "Mail" row. "Owner" and "Admin" have it on. "User" has no workspace settings. On Enterprise the same row can be granted to a custom role. If the role can only view, the fields are visible but cannot be edited, and the test button is absent.

The heading is "Mail". The caption is "Configure outgoing email for sign-in codes, workspace invitations, and other notifications."

Above the fields is the status. Active mail: "Mail is active: sign-in codes and notifications are sent over SMTP." Inactive: "Mail is inactive: SMTP is unverified or the test failed." While settings load: "Loading server mail settings…". If they do not load: "Could not load server mail settings".

| Field | Label |
| --- | --- |
| "SMTP host" | "Hostname or IP of the SMTP server used to send mail." |
| "Port" | "SMTP port (1-65535). Common values are 587 or 465." A value that is not an integer in that range: "Port must be an integer from 1 to 65535". |
| "Encryption" | "None", "STARTTLS", or "TLS". The caption is "How the connection to the SMTP server is encrypted." |
| "Username" | "SMTP authentication username, if the server requires one." |
| "Password" | "SMTP password for authenticating with the mail server." If a password is already saved, the field is replaced by the "Change password" button and the "Clear saved password" icon. A new password uses "Enter a new password". |
| "Sender address" | "From address used for system emails." |
| "Public app URL" | "Public base URL used in email links." |

There is no separate "Save" button. "Send test email" both checks the server and stores the fields. While the message is sending, the label counts down: "Sending… {'{seconds}'}", from 30. Success: the toast "Test email sent; mail is active". The message goes to the email of the person who clicked the button. The subject is "Okkey SMTP test". The status becomes active.

If the message does not go out, the alert is "Test failed". The text is: "The message was not sent. You can save the settings without activating mail - email sign-in codes stay off until a test succeeds." "Save anyway" appears beside it. The toast is "Server mail settings saved". Mail stays inactive. A failed save says "Could not save server mail settings". A failed send says "Could not send the test email". No answer within 30 seconds: "Could not connect to SMTP within 30 seconds. Check the host, port, and encryption."

The test needs a host and a sender address. The password in the database is sealed with `SESSION_SECRET`. The server response does not return the password itself.

## If the SMTP password can no longer be read

The password in settings is opened with a key from `SESSION_SECRET`. After you change that secret, the old value does not open. Above the fields you see: "The saved SMTP password can't be read after a server secret change. Please enter it again."

Enter the password again and send the test email once more. The "Clear saved password" icon removes the saved password on the next test, or when you choose "Save anyway".

## Invitations and the worker

An invitation needs the public app address. The link in the message lasts 14 days. While mail is inactive, an email invitation waits with the status "Pending delivery". After a successful test message, those invitations are sent on their own if they have not expired. The message is sent over SMTP when mail is active. Invite by link does not use mail, but the public app URL is still required. See [Members](../workspace/members.md).

While mail is inactive, the workspace owner on self-hosted may see the sidebar tip "Configure server email" - it opens this section. See [First-time setup](../getting-started/first-setup.md).

The API puts messages on a Redis queue. The worker sends them. If the worker is stopped, messages wait in the queue.

The same worker removes what has expired:

- once an hour it deletes items that have stayed in the trash longer than the workspace retention, and their files;
- once a minute it deletes capsules whose removal time has passed, and the related files.

Trash retention is set in "Settings", "Items". See [Workspace settings](../workspace/index.md).

## How to check

1. Sign in as "Owner" or "Admin". "Settings" shows "Mail" between "General" and "Items". "User" has no "Settings" item.
2. Until a test has succeeded, the status says "Mail is inactive: SMTP is unverified or the test failed." The next sign-in opens the master password. The confirmation code is in the worker logs: `docker compose logs worker`.
3. Fill in the host, port, encryption, and sender. Choose "Send test email". The mailbox of the person who clicked receives "Okkey SMTP test". The toast is "Test email sent; mail is active". The next sign-in asks for 6 digits.
4. `docker compose -p okkey -f docker-compose.prod.yml --env-file .env ps` shows `worker` as running.

## Next steps

- [Install steps](./free.md)
- [Members](../workspace/members.md)
- [Change plan](../workspace/plan.md)
- [First-time setup](../getting-started/first-setup.md)
- [If the install stops](./troubleshooting.md)
