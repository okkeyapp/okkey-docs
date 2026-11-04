---
title: Devices
sidebar_position: 3
plans: [free, enterprise]
---

# Devices

"My devices" is the list of trusted devices on the account. It is synced. "Device settings" apply only in this browser and are not carried to other devices.

## My devices

These are the devices that can open the vault. You can also use them to restore access if the master password is forgotten. Recovery through another device is available on Enterprise. See [Recovery](./personal#recovery).

A "New device" must be confirmed. Until it is confirmed, it does not open the vault. You can rename a device in the "Device actions" menu.

:::note
A new device will not open the vault until you confirm it on a device you already trust.
:::

If you sign in again from the same device before it is approved, the new request replaces the previous one, so no duplicate appears in the list.

### Waiting for approval screen

The new device shows "Confirm this device" and "Waiting for approval…". Approve the sign-in on a trusted device. If a trusted device rejects the sign-in or the device is revoked, you see "This device was denied". You can request approval again or restore access with your recovery key.

If you see an error that too many devices are waiting for approval, reject the extra requests on a trusted device.

## Personalization

Theme and color for this browser.

| Setting | Values |
| --- | --- |
| "Theme" | "Light", "Dark", "System". |
| "Accent color" | Accent palette. |
| "Accent tint" | "Tint neutral surfaces with the selected accent." |

The workspace tile color is set separately, in [workspace general](./workspace#general).

## Security

These settings lock the vault on this device.

| Setting | What it does | Values |
| --- | --- | --- |
| "Device idle timeout" | After a pause the vault locks. | 60, 300, 900, 1800, 3600, or 14400 seconds. The interface shows seconds, minutes, or hours. |
| "Lock vault when the device locks" | The vault locks when the device sleeps. | On by default. |
| "Clear clipboard" | A copied password is cleared from the clipboard. | "Never" (the default), 10, 30, 60, 120, or 300 seconds. "Never" leaves the password in the clipboard. |

## Unlock

PIN and biometrics work only on this device. Other devices still need the master password.

| Setting | What it does |
| --- | --- |
| "Biometric unlock" | Opens the vault with the device biometrics. If the system does not provide biometrics, the switch is unavailable. |
| "PIN code" | 6 digits. The code is stored only on this device. |

The "Confirm access" screen tries biometrics, then PIN, then the master password, when they are enabled.

## Next steps

- [Personal settings](./personal)
- [Recovery](./personal#recovery)
- [Browser extension](../apps/extension)
