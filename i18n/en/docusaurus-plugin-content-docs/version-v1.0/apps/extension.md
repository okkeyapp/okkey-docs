---
title: Browser extension
sidebar_position: 2
plans: [free, enterprise]
---

# Browser extension

The extension fills the login and password on a site while the vault is unlocked. It is named "Okkey" and works in Chromium (Chrome, Edge, Opera, Yandex) and in Firefox.

It is not in the Chrome Web Store or Firefox Add-ons yet.

"Change server" is in the extension. Language switches here and in the web app.

## Sign-in

1. In the extension window, enter the address of your Okkey.
2. Sign-in opens the web app and returns the session to the extension.
3. A new device waits for confirmation on a device you already trust.
4. "Unlock" asks for the master password. If a PIN is on for this device, the 6-digit PIN is asked first.

"Log out" and "Change server" clear the extension session and keep only the last server address.

Sign-in screens have a "Language" switch. In the account menu the item is "Language: …".

## Extension window

After unlock, search, "Lock", and "Create item" are available. Editing an item opens the web app: "Edit in web".

The menu has the workspace switch, vaults, folders, and sign-out. The "Folder settings" button opens the "Folders" window: create, edit, order, and nesting. See [Folders](../folders).

"Archive" and "Delete" run inside the extension. After archive the extension shows "Moved to archive". After delete it shows "Deleted".

## Device settings

"Device settings" in the extension menu. The settings apply in this browser. The sections match the web app: "Personalization", "Security", "Unlock". The values match the [devices page](../settings/devices).

### Personalization

| Setting | Values |
| --- | --- |
| "Theme" | "Light", "Dark", "System". |
| "Accent color" | Accent palette. |
| "Accent tint" | "Tint neutral surfaces with the selected accent." |

### Security

| Setting | What it does | Values |
| --- | --- | --- |
| "Device idle timeout" | After a pause the vault locks. | 60, 300, 900, 1800, 3600, or 14400 seconds. |
| "Lock vault when the device locks" | The vault locks when the device sleeps. | A switch. |
| "Clear clipboard" | A copied password is cleared from the clipboard. | "Never", 10, 30, 60, 120, or 300 seconds. |

### Unlock

| Setting | What it does |
| --- | --- |
| "Biometric unlock" | Opens the vault with the device biometrics. Button "Set up biometrics", then "Reconfigure biometrics". |
| "PIN code" | 6 digits. Window "Set PIN code": entry, "Confirm PIN", "Save". The code is stored only on this device. |

## Save a login

On a site the extension offers to save the login you typed.

| Window | Button |
| --- | --- |
| "Save this login?" | "Save". The window offers to store the username and password for this site. |
| "Update account" | "Update", when an item for the site already exists. |

If the vault is locked, the extension asks "Unlock the vault to save this login". Button "Unlock".

## Generator

The three generators match [Tools](../tools): "Password", "Passphrase", "Username". They work in the extension window and on the website page, on a login or password field. On the website page the username generator is labeled "Username generator".

## Autofill

On a page, the extension fills the login, password, and one-time code for the "Login / Password" category. The "Website URL" field has three modes:

- "Fill on entire site"
- "Fill only on this URL"
- "No autofill"

If the vault is locked, the page has "Unlock". Copying a login or password on a site that is not among the item's addresses asks for confirmation: "Unfamiliar URL".

## Next steps

- [Tools](../tools)
- [Folders](../folders)
- [Devices](../settings/devices)
- [Item actions](../items/actions)
