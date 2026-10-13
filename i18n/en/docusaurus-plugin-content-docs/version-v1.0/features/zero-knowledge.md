---
title: Zero-knowledge
sidebar_position: 4
plans: [free, enterprise]
---

# Zero-knowledge

The server does not see decrypted items, the master password, or the whole vault key. Encryption and decryption run on your device. A server administrator cannot read vault contents either.

How vault data moves:

1. The device encrypts the item.
2. The server stores the ciphertext.
3. The device decrypts the item when you open the vault.

## What is stored on the server

- Accounts, devices, and vault details.
- Sessions and the mail queue.
- Encrypted files.

The server creates the sign-in code and sends it by email. If mail is not configured, the code is visible in the background-job logs. The sign-in code is separate from vault contents.

For capsules, the country and city of a request are resolved on the server itself when that function is on. The requester's address is not sent to a third party. On a normal install this function is off.

A breached-password check sends only the start of a hash. The full password is not part of the request.

The Enterprise plan does not change encryption.

## Next steps

- [Protection](./security)
- [Open source](./open-source)
- [Monitoring](../monitoring)
- [Capsules](../capsules)
