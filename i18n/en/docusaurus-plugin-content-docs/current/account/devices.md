---
title: Devices
sidebar_position: 5
plans: [free, enterprise]
---

import HashRedirect from '@site/src/components/HashRedirect';

# Devices

"My devices" is the list of trusted devices on the account. It is synced. "Device settings" apply only in this browser. The list address is `?popup=settings|devices`.

<HashRedirect map={{"security": "account/unlock#security", "unlock": "account/unlock#unlock"}} />

## My devices {#my-devices}

The section text says these are devices that can open the vault. On Enterprise they can also restore access if the master password is lost. See [Recovery](./recovery.md#trusted-devices).

A "New device" has to be confirmed. Until it is, it does not open the vault. Signing in again from the same device while approval is still pending replaces the previous request and does not add a duplicate row.

On a trusted device with the vault unlocked, a "New device" window opens on its own. The text is: "Someone signed in to your account from an unrecognized device. If this wasn’t you, tap “Not now”." The card shows the device name, the system, the date, "IP", "Country", and "City". An empty country or city says "Unknown location". The button is "Trust device". The toast is "Device trusted". "Not now" rejects the request. The toast on the trusted device is "This device was denied". On the new device the heading is "This device was denied", and "Request approval again" is available.

Next to "Not now" is the "Block options" menu: "Block for 1 hour", "Block for 1 day", "Block forever". The toast is "Device blocked". The "Blocked devices" list shows the deadline or "Blocked permanently". From there: "Unblock" and "Trust". The same request is in "My devices" if the window was closed, or if the vault on the trusted device is still locked.

A device can be renamed from "Device actions": "Rename", the window "Rename device", "Save". "Revoke" removes trust. The current device, marked "Current device", cannot be revoked: "You can't revoke the device you're currently using."

### Waiting for approval

On the new device the heading is "Confirm this device". The text is: "To unlock your vault, approve this sign-in from one of your trusted devices listed below." The account profile is shown above that. Then "Waiting for approval…" and the heading "Approve from". Under it is the list of devices you already trust: name and system. If the list is empty: "No trusted devices are available yet. Open Okkey on a device you already trust."

The button is "Approve with passkey". While the key is being asked for: "Waiting for the passkey…". If this passkey cannot confirm the device in this browser, the screen asks you to confirm from a trusted device or restore access with the recovery key. If no passkey is set up for a new device: "No passkey is set up to approve a new device. On a device you already trust, unlock Okkey and allow a passkey to approve devices." Cancelled: "Passkey confirmation was cancelled." Too many attempts: "Too many attempts. Wait a few minutes and try again." A confirmation that was already used: "That passkey confirmation was already used. Try again." Any other failure: "Passkey approval failed. Try again, or use a trusted device or your recovery key."

Next to that is the link "Restore with recovery key".

If this sign-in has to be approved again, the text changes to: "This sign-in has to be approved again. Ask someone on a trusted device to approve it." If the browser no longer has the key it uses to sign the device, the text is: "This browser no longer has its device signing key. Restore access with your recovery key - another trusted device is required to approve a key change."

If the sign-in was rejected, the heading is "This device was denied". The text is: "A trusted device rejected this sign-in. You can request approval again." The button is "Request approval again". If the device was blocked, the heading is "This device is blocked". The text is: "A trusted device blocked this sign-in. You can’t request approval again until the block ends." The deadline is "Blocked until: {'{date}'}". A permanent block says "This device is blocked permanently."

After "Trust device", the new device goes to "Vault is locked".

## Personalization {#personalization}

Theme and color of this browser. The address is `?popup=settings|devicePersonalization`. The group caption says the preferences apply only to the current browser.

| Setting | Values |
| --- | --- |
| "Theme" | "Light", "Dark", "System". |
| "Accent color" | The accent palette. |
| "Accent tint" | "Tint neutral surfaces with the selected accent." |

The workspace tile color is set separately, in [general workspace settings](../workspace/index.md#general).

## How to check

1. Sign in in a new browser. "Confirm this device" opens, with the list "Approve from". On a trusted device with the vault unlocked, "New device" opens on its own.
2. "Trust device" sends the new browser to "Vault is locked". "Not now" rejects the request: the trusted device shows the toast "This device was denied", and the new device shows the same heading and "Request approval again".
3. "Rename" changes the name. "Revoke" removes a device from the list, except the current one.
4. "Personalization": "Dark" changes the theme only in this browser.

## Next steps

- [Unlock](./unlock.md)
- [Recovery](./recovery.md)
- [Profile](./profile.md)
