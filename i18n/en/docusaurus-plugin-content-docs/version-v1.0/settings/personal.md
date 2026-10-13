---
title: Personal settings
sidebar_position: 2
plans: [free, enterprise]
---

# Personal settings

"My settings" in the account menu. This is the profile, the master password, and ways to get access back.

The "General" page shows the "Account security" block at the top.

## General

Name, email, language, and region of the profile.

| Setting | How to change it |
| --- | --- |
| "First name", "Last name" | Profile fields. |
| "Change email" | Opens "Change email". |
| "Language" | Russian and English are available in the interface. |
| "Region of residence" | A list with search "Search region...". |

Theme and browser color are set in [device personalization](./devices#personalization).

## Master password

The master password opens the vault. The server does not store it.

The page shows when the password was set. "Change" opens "Change master password": the current password and the new password twice.

"Require master password" marks zones where access must be confirmed again.

- Sections: "Items", "Capsules", "Monitoring", "Tools", "Vault settings", "My settings".
- Windows: "Items", "Capsules", "Vaults", "Folders".
- Actions: "Deletion".

Until a zone is confirmed, the screen is "Confirm access".

Idle time, lock on sleep, clipboard, biometrics, and PIN are set in [device settings](./devices). They stay on this device.

## Sign-in methods

The "Sign-in methods" item is not shown in the menu. Sign-in uses email and a code from the message. You can also turn on [two-factor authentication](#two-factor-authentication).

## Two-factor authentication

A second factor means the email code alone is not enough to sign in. Available on Free and on Enterprise.

| Setting | What it does |
| --- | --- |
| "Authenticator app" | One-time codes from an app, for example Google Authenticator. |
| "Backup codes" | One-time codes for when the app is not at hand. |
| "Disable 2FA" | Asks for a code from the authenticator app. |

## Recovery

Set up a recovery method in advance. If the master password is forgotten, the server cannot guess it.

| Method | Plan | How to turn it on |
| --- | --- | --- |
| "Recovery key" | Free and Enterprise | Turn the key on or issue a new one. The same key is offered at registration. |
| "Trusted devices" | Enterprise | You need at least two trusted devices, and one of them must be the current device. Otherwise you are asked to add another device. |
| "Trusted contacts" | Enterprise | At least 3 confirmed contacts. A contact must already be an Okkey user. |
| "I am a trusted contact" | Enterprise | Accounts you can help. You can leave that list. |

On Free, "Trusted devices" and "Trusted contacts" are unavailable. To get Enterprise, contact the Okkey team. See [Plans](../plans).

While the vault is open, shares for confirmed contacts are prepared automatically. The threshold is 3 contacts. A recovery request lasts 1 hour.

:::warning
A recovery request lasts 1 hour. After that you create it again.
:::

### Trusted devices

Page "Forgot master password?", option "Use another device that already trusts this account".

1. Click "Request recovery from trusted device".
2. On another trusted device with the vault open, confirm "Account recovery request". The window cannot be closed without a decision.
3. The card shows the device name, client, OS, date, IP, and country. Confirm only a device you recognize.
4. "Confirm" or "Reject". Extra actions include "Block device".
5. After confirmation, set "New master password" and click "Restore access".

If the request was rejected or expired, start again. If the device was blocked, you can no longer sign in from that browser.

### Trusted contacts

Option "Ask your confirmed trusted contacts for help".

1. Click "Request help from trusted contacts".
2. A contact with an open vault clicks "Release share" in "Help a contact restore access".
3. When enough shares have arrived, set a new master password and click "Restore access".
4. The request can be revoked with "Revoke request".

If you open the vault while a contact request is still waiting, the request is cancelled. After the master password changes, shares are prepared again the next time the vault is opened.

## Next steps

- [Devices](./devices)
- [Plans](../plans)
- [First-time setup](../install/first-setup)
