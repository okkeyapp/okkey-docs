---
title: Profile
sidebar_position: 2
plans: [free, enterprise]
---

import HashRedirect from '@site/src/components/HashRedirect';

# Profile

"My settings" on Free and on Enterprise. This is your name, email, language, region, and master password. The window address is `?popup=settings`. The "Master password" item is `?popup=settings|vault`.

<HashRedirect map={{"sign-in-methods": "account/#sign-in-methods", "two-factor-authentication": "account/two-factor", "recovery": "account/recovery", "trusted-devices": "account/recovery#trusted-devices", "trusted-contacts": "account/recovery#trusted-contacts"}} />

## General {#general}

The page heading is "General settings". The "Account security" block is at the top.

| Setting | How to change it |
| --- | --- |
| "First name", "Last name" | The fields save on their own. Toast: "Saved". |
| Email | "Change email" opens "Change email". |
| "Language" | Russian and English. The same "Language" switch is in the web header. |
| "Region of residence" | A list with the search "Search region...". |

### Change email

1. Click "Change email". The window shows "Current email" and the field "New email".
2. Click "Next". A 6-digit code goes to the new address. The text is "Enter the 6-digit code sent to".
3. Click "Confirm". "Back to email" returns to the email field.

A wrong code: "Invalid code. Try again." An expired code: "The code expired. Go back and request a new code." An address already in use: "This email is already in use." The same address: "This is your current account email."

Theme and accent for this browser are set in [device personalization](./devices.md#personalization).

## Master password {#master-password}

The master password opens the vault. The server does not store it. The page shows "Last master password change" and the button "Change master password".

"Change master password" asks for "Current master password", "New master password", and "Confirm new master password". The button is "Change". The new password is at least 12 characters. Otherwise: "Master password must be at least 12 characters". A wrong current password: "Current master password is incorrect". A mismatch: "New passwords do not match".

"Require master password" marks zones where access must be confirmed again. Until the zone is confirmed, the screen is "Confirm access".

- Sections: "Capsules", "Monitoring" (when that item is in the menu), "Tools", "Vault settings".
- Popups: "My settings", "Items", "Capsules", "Vaults", "Folders".
- Actions: "Deletion".

Idle time, lock on sleep, the clipboard, biometrics, and a PIN are set in [Unlock](./unlock.md). They stay on this device.

## How to check

1. Open "My settings", "General". You see "First name", "Last name", "Change email", "Language", and "Region of residence".
2. Change the first name. "Saved" appears, and the name is still there after a reload.
3. "Change master password" with a new password shorter than 12 characters shows the minimum-length text. A password of 12 characters or more goes through.
4. In "Require master password" turn on "Deletion". Deleting an item opens "Confirm access".

## Next steps

- [Two-factor authentication](./two-factor.md)
- [Recovery](./recovery.md)
- [Unlock](./unlock.md)
- [First-time setup](../getting-started/first-setup.md)
