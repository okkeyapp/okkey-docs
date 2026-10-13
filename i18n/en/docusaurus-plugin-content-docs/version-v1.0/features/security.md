---
title: Protection
sidebar_position: 3
plans: [free, enterprise]
---

# Protection

Items are encrypted on your device. The server checks sign-in, syncs changes, and stores ciphertext. Item plaintext and the whole vault key do not reach the server.

## Split key

The access key is assembled from three shares:

| Share | Where it lives |
| --- | --- |
| Server share | On the server. This share alone cannot open the vault. |
| Device share | On the device, in the protected storage of the system or the browser. |
| Password share | Derived from the master password. The password itself is not stored on the server. |

To open the vault, the client fetches the server share, reads the device share, derives the password share, and only then decrypts the vault keys.

## Vault keys and items

Each vault has its own key. Items inside the vault are encrypted with that key. Files are encrypted separately and stored already encrypted.

When access changes, the vault key is rotated.

## What else limits access

- A new device will not open the vault until you confirm it on a device you already trust.
- Email sign-in uses a one-time code. The very first account does not need a code.
- Second factor: "Authenticator app" and "Backup codes".
- The vault opens with the master password. On this device you can turn on a 6-digit PIN and biometrics. They are not copied to other devices.
- For some zones you can ask for confirmation again: "Items", "Capsules", "Monitoring", "Tools", "Vault settings", "My settings", the item, capsule, vault, and folder windows, and the "Deletion" action.
- A profile decides which items a member sees. A role decides which workspace settings they can open.

On Enterprise, password checks in monitoring run on the device. Only the start of a hash is sent to the breach service. The device does not send the password itself. See [Monitoring](../monitoring).

## Next steps

- [Zero-knowledge](./zero-knowledge)
- [Q-Day ready](./qday)
- [Personal settings](../settings/personal)
- [Monitoring](../monitoring)
