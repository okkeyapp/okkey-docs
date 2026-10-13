---
title: Protection
sidebar_position: 3
plans: [free, enterprise]
---

# Protection

Okkey protects data on the client. The server authenticates, syncs events, and stores ciphertext. It is not given item plaintext or the whole vault key.

## Split key

The access key is assembled from three shares. In v1 transport, “addition” is a 32-byte XOR: `VaultKey = A ⊕ B ⊕ C`.

| Share | Where it lives |
| --- | --- |
| A, server share | In the database, the user’s `server_key_share`. This is not the full key. |
| B, device share | On the device. The architecture names iOS Keychain, Android Keystore, desktop OS secure storage, and web IndexedDB plus WebCrypto. |
| C, password share | `Argon2id` of the master password. The server stores the salt and the KDF version next to the user, not the password. |

Unlock: fetch the server share, read the device share, derive the password share, rebuild the key, decrypt the user private key, then decrypt vault keys.

Each user has a key pair. The private key is stored encrypted under the vault key. That is what sharing, device approval, and invites use.

## Vault keys and items

Each vault has its own key. Items inside a vault are encrypted with that key (XChaCha20-Poly1305: nonce plus ciphertext and tag). Attachments use a separate key and are stored in object storage already encrypted.

Key rotation is mandatory when access changes. Active recipients are rewrapped with the hybrid envelope.

## What else limits access

- A new device does not become trusted until it is confirmed.
- Email sign-in uses a one-time code. On an empty self-hosted database the code is skipped for the first account.
- Core two-factor authentication is “Authenticator app” and “Backup codes”.
- Vault unlock is the master password. A device can enable a 6-digit PIN and biometrics; those secrets are not synced.
- Selected zones can ask for the master password again. The zones are “Items”, “Capsules”, “Monitoring”, “Tools”, “Vault settings”, “My settings”, the item, capsule, vault, and folder popups, and the “Deletion” action.
- Workspace profiles cut which categories, fields, and item actions a member can use. Roles cut settings sections.

Password monitoring is computed on the device. The breach check sends only a SHA-1 prefix to Have I Been Pwned. The full password never leaves the device. See [Monitoring](../monitoring).
