---
title: Q-Day ready
sidebar_position: 2
plans: [free, enterprise]
---

# Q-Day ready

New items are encrypted with a hybrid of a classical scheme and a post-quantum scheme. A weaker profile is not used for new items. The Enterprise plan does not change this encryption.

The item stays protected even if one of the schemes weakens over time.

## What encrypts the data

- The master password becomes a key through Argon2id.
- Item contents, attachments, and capsules are encrypted with XChaCha20-Poly1305.
- The hybrid protection uses X25519 and ML-KEM-768.
- Important vault-access actions are signed with Ed25519 together with a post-quantum binding.

Encryption runs on your device.

## Next steps

- [Protection](./security)
- [Zero-knowledge](./zero-knowledge)
- [Install steps](../install/self-hosted)
