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

The request card shows "IP", "Country", "City", or "Unknown location". The buttons are "Trust device" and "Not now". "Block options": "Block for 1 hour", "Block for 1 day", "Block for 1 week", "Block forever". The "Blocked devices" list shows the deadline or "Blocked permanently". From there: "Unblock" and "Trust".

A device can be renamed from "Device actions": "Rename", the window "Rename device", "Save". "Revoke" removes trust. The current device, marked "Current device", cannot be revoked: "You can't revoke the device you're currently using."

### Waiting for approval

The new device shows "Confirm this device" and "Waiting for approval…". Confirm the sign-in on a trusted device. If the sign-in was rejected, the heading is "This device was denied": you can "Request approval again" or restore access with the recovery key. If the device was blocked, the heading is "This device is blocked": another request is not available until the block ends. A permanent block says "This device is blocked permanently."

## Personalization {#personalization}

Theme and color of this browser. The address is `?popup=settings|devicePersonalization`. The group caption says the preferences apply only to the current browser.

| Setting | Values |
| --- | --- |
| "Theme" | "Light", "Dark", "System". |
| "Accent color" | The accent palette. |
| "Accent tint" | "Tint neutral surfaces with the selected accent." |

The workspace tile color is set separately, in [general workspace settings](../workspace/index.md#general).

## How to check

1. Sign in in a new browser. "Confirm this device" opens. On a device you already trust, "My devices" shows the "New device" request.
2. "Trust device" lets the new browser open the vault. "Not now" leaves "This device was denied".
3. "Rename" changes the name. "Revoke" removes a device from the list, except the current one.
4. "Personalization": "Dark" changes the theme only in this browser.

## Next steps

- [Unlock](./unlock.md)
- [Recovery](./recovery.md)
- [Profile](./profile.md)
