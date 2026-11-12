---
title: Unlock
sidebar_position: 6
plans: [free, enterprise]
---

# Unlock

The vault locks on this device. It opens with the master password. On this same device you can turn on a PIN and biometrics. Other devices still need the master password. The settings below are on Free and on Enterprise.

## The "Vault is locked" screen

The heading is "Vault is locked", and the text is "Enter your master password to unlock". The field is "Master password", the button is "Unlock", the link is "Forgot master password?", and there is "Sign out".

If biometrics are on, the screen starts with them: "Waiting for biometrics…". If that fails: "Biometrics failed. Use another unlock method". If there are no biometrics and a PIN is on, the screen opens on "PIN code". From the master password, "Use PIN code" switches to the PIN, and "Use master password" switches back.

A wrong password: "Incorrect master password". A wrong PIN: "Incorrect PIN". Too many PIN attempts: "Too many attempts. Try again later or use your master password." Too many password attempts: "Too many attempts. Try again later."

The master password does not open the vault without a connection to the server: "Master password unlock needs a connection to your Okkey server." PIN and biometrics still work offline if you turned them on.

While the password is shorter than 12 characters, a hint after sign-in can say you may keep using it. "Change master password" goes to the change, and "Dismiss" hides the hint.

## Security {#security}

The "Security" item in "Device settings". The address is `?popup=settings|deviceSecurity`. The caption says the preferences apply only to the current browser.

| Setting | What it does | Values |
| --- | --- | --- |
| "Device idle timeout" | After a pause the vault locks. Until you pick a duration yourself, the pause is 15 minutes. | 1, 5, 15, and 30 minutes, 1 hour, and 4 hours. |
| "Lock vault when the device locks" | The vault locks when the device sleeps. | On by default. |
| "Clear clipboard" | A copied password is wiped from the clipboard. | "Never" (the default), 10 and 30 seconds, 1, 2, and 5 minutes. "Never" leaves the password in the clipboard. |

The "Confirm access" screen for zones from the [master password](./profile.md#master-password) tries biometrics, then the PIN, then the master password, when those are turned on.

## Unlock on this device {#unlock}

The "Unlock" item. The address is `?popup=settings|deviceUnlock`.

| Setting | What it does |
| --- | --- |
| "Biometric unlock" | Opens the vault with the device biometrics. If the system does not provide biometrics, the switch is unavailable. "Set up biometrics" turns it on, and "Reconfigure biometrics" sets it again. |
| "PIN code" | The "Set PIN code" window: 6 digits and "Confirm PIN". The code is stored only on this device. The buttons are "Next", "Back", and "Save". |

Biometrics need a secure context, HTTPS or localhost. If the device has none: "No biometrics on this device (Touch ID, Face ID, or Windows Hello)".

## Recovery key required {#recovery-key-required}

If the recovery key was not created, or was never saved, the vault does not open for work until the key is saved. The screen is "Save your recovery key". The text is "Create a recovery key before you can use the vault." The button is "Create recovery key".

The key is then shown once: "Copy" or "Download PDF", then "Continue". "Continue" works after you copy or download the key. The warning is "We cannot recover this key for you. After you continue, it will not be shown again." If the key status could not be read: "Could not check the recovery key status. Try again." and "Try again".

## How to check

1. Lock the vault by idle time or open the lock screen. "Vault is locked" lets you in with the master password.
2. In "Security" set "Device idle timeout" to "1 minutes" and wait. The vault locks on its own.
3. In "Unlock" set a 6-digit PIN. The next "Vault is locked" screen opens on the PIN. "Use master password" brings back the password field.
4. Without saving a recovery key, open the vault. "Create recovery key" appears. "Continue" stays unavailable until the key is copied or downloaded.

## Next steps

- [Profile](./profile.md)
- [Recovery](./recovery.md)
- [Devices](./devices.md)
