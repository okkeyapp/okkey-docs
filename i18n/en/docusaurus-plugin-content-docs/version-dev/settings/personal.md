---
title: Personal settings
sidebar_position: 2
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Personal settings

The “My settings” popup from the account menu. The items below exist on every plan unless a row says otherwise. Paid recovery pieces are called out separately.

The “General” page shows an “Account security” block at the top.

## General

Page title: “General settings”.

| Setting | Label | What it does |
| --- | --- | --- |
| First name | “First name” / “Your first name” | Profile first name. |
| Last name | “Last name” / “Your last name” | Profile last name. |
| Email | “Change email” | Opens “Change email”. |
| Language | “Language” / “Choose your language” | Group “Language and region”. Web string locales in core are `ru` and `en`. |
| Region | “Region of residence” | A select with search “Search region...”. Empty result: “No region”. |

Theme, accent, and tint are not on this popup. They live in [device personalization](./devices#personalization).

## Master password

Menu item: “Master password”.

The “Master password” section shows when the password was set: today, yesterday, “N ago”, or an unknown date. “Change” opens “Change master password”: the current master password and the new password twice.

“Require master password” — “Extra confidential sections that require the master password”. You can mark zones. Group “Sections”: “Items”, “Capsules”, “Monitoring”, “Tools”, “Vault settings”, “My settings”. Group “Popups”: “Items”, “Capsules”, “Vaults”, “Folders”. Group “Actions”: “Deletion”. Until a zone is confirmed, the UI shows “Confirm access” and “Section “…” requires re-authentication”.

Idle time, lock on sleep, clipboard, biometrics, and PIN are described by strings next to the master password, but the current web UI puts them in [device settings](./devices). They are stored on the device and are not copied between devices.

## Sign-in methods

The “Sign-in methods” item is built into the popup, but `ACCOUNT_LOGIN_METHODS_UI_ENABLED` is `false`. While the flag is off, opening that item returns to “General”. Actual core sign-in is email plus a code, plus 2FA. **TODO:** do not document the “Sign-in methods” screen (password, passkey, other providers) until the flag is on. The screen is not shown.

## Two-factor authentication

Item “2FA authentication”, title “Two-factor authentication”. Available on every core plan.

| Setting | Label | Behavior |
| --- | --- | --- |
| App | “Authenticator app” | “A third-party authenticator app (for example, Google Authenticator) that generates one-time codes”. |
| Codes | “Backup codes” | “One-time codes you can use to sign in when you do not have your phone or authenticator app”. |
| Disable | “Disable 2FA” | Asks for a code from the authenticator app. |

This core screen has no SMS and no hardware keys.

## Recovery

Item “Recovery”, title “Access recovery”.

| Block | Label | Plan |
| --- | --- | --- |
| Key | “Recovery key”. “This key helps restore access to your account if you forget your master password”. | Every plan. The key can be enrolled and rotated. Registration offers the same key immediately. |
| Devices | “Trusted devices”. “Helps restore your account through your other trusted devices if you are signed in on them”. | Flag `accountRecovery` — Pro and above on cloud, self-hosted enterprise. The devices panel is the `@okkey-enterprise/account-recovery` module. The open build leaves the panel empty. **TODO:** the exact device-recovery flow in the private repository was not reviewed. |
| Contacts | “Trusted contacts”. “Add at least 3 trusted contacts who can help restore access”. | Flag `trustedContacts`, same plans. The status minimum of confirmed contacts is 3. Invite: “Trusted contact invitation”. Remove: “Remove trusted contact?”. |
| Reverse role | “I am a trusted contact”. “Accounts that listed you to help restore access if they lose their master password”. Leave: “Leave trusted contacts?”. | The same contacts module. |

If the paid parts are unavailable, a “Note” points at changing the plan. The Enterprise stub does not render the device and contact panels even if the stored tier is already paid: both the flag and the module are required.
