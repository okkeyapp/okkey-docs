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
| Devices | “Trusted devices”. “Helps restore your account through your other trusted devices if you are signed in on them”. | Flag `accountRecovery` — Pro and above on cloud, self-hosted enterprise. The wizard is `@okkey-enterprise/account-recovery` (plugin `account-recovery-advanced`). Without the module, core says remote recovery is unavailable in the web client. The method can be turned on when there are at least two trusted devices and one of them is the current device. Otherwise: “Add another trusted device before enabling this recovery method”. |
| Contacts | “Trusted contacts”. “Add at least 3 trusted contacts who can help restore access”. | Flag `trustedContacts`, same plans. The confirmed minimum is 3. Status: “Need … more confirmed contacts”, “Ready”. Invite: “Trusted contact invitation”, “Enter contact email”. The contact must already be an Okkey user. Remove: “Remove trusted contact?”. |
| Reverse role | “I am a trusted contact”. “Accounts that listed you to help restore access if they lose their master password”. Leave: “Leave trusted contacts?”. | The same contacts module. |

If the paid parts are unavailable, a “Note” points at changing the plan. Both the flag and the module are required. The right is counted on the account: any workspace where the user is an owner or a member and the plan grants the flag is enough. The wizards are web screens. This repository has no separate mobile or desktop wizard.

While the vault is unlocked and contacts are on, the module prepares shares for confirmed contacts by itself. There is no separate “write shares” button. The threshold is 3. The UI does not offer another number. A device request and a contact request last 1 hour.

Page “Forgot master password?”.

**Trusted devices** (“Use another device that already trusts this account”):

1. “Start a recovery request, then approve it on another trusted device where your vault is unlocked.”
2. “Request recovery from trusted device”.
3. “Device recovery”, “Waiting for approval on a trusted device…”.
4. On another trusted device with an open vault, popup “Account recovery request”. It cannot be closed with the cross; the close label is “Resolve request”. The text asks you to confirm only a device you recognize. The card shows the device name, client and OS, date, “IP: …”, “Country: …”. If there is no place: “Unknown location”. If the vault is locked: “Unlock the vault on this device to approve recovery.”
5. “Confirm”, “Reject”, and under “More actions” — “Block device”. Toasts: “Recovery approved”, “Recovery request rejected”, “Device blocked”.
6. After approval: “Approved. Set a new master password to finish.” Fields “New master password”, “Repeat new master password”, “Restore access”.
7. Rejection: “Recovery request rejected” and “Start again”. Expired: “Recovery request expired”. Blocked: “This device is blocked” — “A trusted device permanently blocked this browser. Sign-in from this device is no longer allowed.” There is no “Start again” button in that state.

If the local session is gone: “Missing local recovery session. Start the request again in this browser.”

**Trusted contacts** (“Ask your confirmed trusted contacts for help”):

1. “Ask your trusted contacts to release their recovery shares, then set a new master password.”
2. “Request help from trusted contacts”.
3. “Contacts recovery”, “Waiting for enough contacts to release their shares…”, counter “Shares released: … / …”.
4. The contact sees “Help a contact restore access”. The card shows the owner’s name and email, “Requested: …”, “Expires: …”. “Release share”. Toast: “Share released”. The contact’s vault must be open.
5. When enough shares arrive, the same new-master-password fields and “Restore access”.
6. The owner can “Revoke request”.

Unlocking the vault revokes a contact request that is still open. After the master password changes, shares are prepared again the next time the vault is open.
