---
title: Server database leak
sidebar_position: 6
plans: [free, enterprise]
---

# If the server database or a backup leaks

:::note
since 1.0.0-beta.3
:::

The vault key is assembled on your device from three shares. It is never stored whole.

- The server share is stored on the server. That share alone cannot open the vault.
- The device share is stored on the server only in sealed form. It can be opened with a key that stays on the device.
- The password share is derived from the master password on the device. The password itself and this share do not leave the device.

So a leak of the server database or a server backup does not allow anyone to brute-force the master password offline. The dump has item ciphertext and the server share, but without the device share the vault key cannot be rebuilt, and a guessed password cannot be checked against the dump.

This does not mean the vault is protected in every situation.

- If an attacker fully controls the server and substitutes the web client, they can obtain the master password or the key when you unlock the vault in the browser.
- This design does not protect against malware on your device.

This is a beta. An independent security audit has not been done.

## Next steps

- [Protection](./keys.md)
- [Zero-knowledge](./zero-knowledge.md)
- [Q-Day ready](./qday.md)
- [Open source](./open-source.md)
