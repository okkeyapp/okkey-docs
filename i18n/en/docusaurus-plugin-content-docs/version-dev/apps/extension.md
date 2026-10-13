---
title: Browser extension
sidebar_position: 2
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Browser extension

The extension name is “Okkey”. The manifest description is `Okkey password manager extension`, version `0.0.1`. It is Manifest V3, one source tree for Chromium (Chrome, Edge, Opera, Yandex) and Firefox. The Firefox id is `extension@okkey.io`, minimum Firefox `121.0`.

There is no store listing in the repository. You load an unpacked build. **TODO:** Chrome Web Store and Firefox Add-ons publishing is not described.

## Build

You need Node `>=25 <26` (the monorepo `.tool-versions`) and Yarn 1.22 from the `okkey` root.

```bash
yarn build:extension:chromium   # apps/extension/output/chrome-mv3
yarn build:extension:firefox    # apps/extension/output/firefox-mv3
```

Chromium: `chrome://extensions` or `edge://extensions`, developer mode, “Load unpacked”, folder `apps/extension/output/chrome-mv3`.

Firefox: `about:debugging#/runtime/this-firefox`, “Load Temporary Add-on…”, file `apps/extension/output/firefox-mv3/manifest.json`. A temporary Firefox add-on disappears when the browser restarts. The repository does not ship a permanent package.

Permissions: `storage`, `tabs`, `idle`, and host access `<all_urls>` for autofill.

## Sign-in

1. In the popup, enter the server URL. For local development the web app is `http://localhost:5173`, with API and web running beside it.
2. Sign-in opens the web app and PKCE. The web route does not drop the user into the vault while the session handoff is pending.
3. A new device waits for approval on an already trusted device.
4. Unlock uses the same master password as the web app.

“Log out” and “Change server” wipe the extension session, device, and vault cache and keep only the last server URL.

## What the popup does

After unlock:

- header: menu, search as you type, lock, “+” (opens web `/items?popup=newItem`);
- menu: workspace switcher, vaults without a create button, folders without folder settings, profile with “Log out” and “Change server”. There is no “My settings”, “Documentation”, or “Help” in this menu;
- a list on the left and an item card. Edit, capsule, favorite, and archive deep-link to the web app. Field copy follows the clipboard-clear preference.

Extension device settings persist theme and PIN. Biometric unlock exists in the extension client (`extensionBiometricUnlock`). **TODO:** this page does not line-check every web “Unlock” switch against the extension popup.

## Autofill

The page script fills username, password, and TOTP for the “Login / Password” category. The gear on a “Website URL” field in the websites section has three modes:

- “Fill on entire site”
- “Fill only on this URL”
- “No autofill”

If the extension vault is locked, the overlay shows “Unlock”. Copying a username or password on a tab that matches none of the item’s URLs asks for confirmation. A save-password prompt from the page exists in code. The extension README treats an on-page password generator as not done yet. **TODO:** do not treat the on-page generator as available.
