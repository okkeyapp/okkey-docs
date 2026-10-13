---
title: Devices
sidebar_position: 3
plans: [free, enterprise]
---

# Devices

These are two different lists, and they are easy to mix up. “My devices” is the account’s trusted devices and is synced. “Device settings” is this browser only. The subtitle says: “These preferences apply only to the current browser on this device and are not carried over to other devices.”

The legacy menu id `deviceSettings` opens “Personalization”.

## My devices

Item “My devices”. Text: “Devices that can unlock your vault. They can also help restore access if the master password is lost.”

An unconfirmed device is shown as “New device”. It must be approved before it is trusted. Per-device actions use “Device actions”, including “Rename device”.

The new device itself waits on a separate page until approval arrives.

:::note
A new device cannot open the vault until you approve it on a device that is already trusted.
:::

## Personalization

Item “Personalization” in the “Device settings” group. These settings stay on this browser.

| Setting | Values |
| --- | --- |
| “Theme” | “Light”, “Dark”, “System”. |
| “Accent color” | Accent palette. The button label includes the color id. |
| “Accent tint” | “Tint neutral surfaces with the selected accent.” |

The workspace tile color is a different setting, under [workspace general](./workspace#general).

## Security

Item “Security”. The same local prefs that the master-password strings also describe. They lock the vault when you step away.

| Setting | Label | Values in code |
| --- | --- | --- |
| Idle | “Device idle timeout”. “After this time the vault locks automatically”. | 60, 300, 900, 1800, 3600, 14400 seconds. The UI renders seconds, minutes, or “N hour”. Until the user sets a value, `idleLockSeconds` may be absent. |
| Sleep | “Lock vault when the device locks”. “The vault locks automatically if the device sleeps or becomes inactive”. | On by default (`lockOnDeviceSleep: true`). |
| Clipboard | “Clear clipboard”. “After this time the clipboard is cleared of copied passwords”. | 0 (“Never”, the default), 10, 30, 60, 120, 300 seconds. Zero means the clipboard is not cleared automatically. |

## Unlock

Item “Unlock”. A PIN and biometrics do not replace the master password on other devices. They live only here.

| Setting | Label | Behavior |
| --- | --- | --- |
| Biometrics | “Biometric unlock”. “Unlock the vault with your device biometrics instead of the master password”. | A switch, then setup / reconfigure. If the vault is locked, the text asks you to unlock it first. `biometricEnabled` is local to this device. If the platform cannot provide biometrics, the switch is disabled. |
| PIN | “PIN code”. “Unlock the vault with a short PIN on this device”. | 6 digits (`PIN_LENGTH`). PIN material is not copied to other devices. |

The “Confirm access” screen for locked zones tries biometrics, then PIN, then the master password, in that order, when they are enabled. Otherwise only the master password remains.

## Next steps

- [Personal settings](./personal)
- [Recovery](./personal#recovery)
- [Browser extension](../apps/extension)
