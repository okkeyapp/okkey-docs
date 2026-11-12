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
| Device share | The key that opens it stays on the device. Since 1.0.0-beta.3 the server stores this share only in sealed form. |
| Password share | Derived from the master password. The password itself is not stored on the server. |

To open the vault, the client fetches the server share, reads the device share, derives the password share, and only then decrypts the vault keys.

Since 1.0.0-beta.3, a leak of the server database or a server backup does not allow anyone to brute-force the master password offline. See [Server database leak](./server-db-leak.md).

## Vault keys and items

Each vault has its own key. Items inside the vault are encrypted with that key. Files are encrypted separately and stored already encrypted.

When access changes, the vault key is rotated.

## What else limits access

- A new device will not open the vault until you confirm it on a device you already trust.
- Email sign-in uses a one-time code. The very first account does not need a code.
- Second factor: "Authenticator app" and "Backup codes".
- The vault opens with the master password. On this device you can turn on a 6-digit PIN and biometrics. They are not copied to other devices.
- For some zones you can ask for confirmation again: the "Capsules", "Monitoring" (on Enterprise), "Tools", and "Vault settings" sections; the "My settings", "Items", "Capsules", "Vaults", and "Folders" windows; and the "Deletion" action.
- A profile decides which items a member sees. A role decides which workspace settings they can open.

Password checks in monitoring run on the device. Only a SHA-1 prefix is sent to the breach service. The device does not send the password itself. Monitoring is on Enterprise. See [Monitoring](../monitoring.md).

## Next steps

- [Server database leak](./server-db-leak.md)
- [Zero-knowledge](./zero-knowledge.md)
- [Q-Day ready](./qday.md)
- [Profile](../account/profile.md)
- [Monitoring](../monitoring.md)
