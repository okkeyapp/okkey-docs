---
title: Q-Day ready
sidebar_position: 2
plans: [free, enterprise]
---

# Q-Day ready

Q-Day ready in Okkey is not a switch in the UI. It is the core crypto policy: from the first production release, new writes use profile v2, with no silent fallback to a weaker profile. Enterprise cannot override that policy.

## Profiles

The registry is `packages/crypto/src/config`:

| Profile | Mode | Where it is allowed |
| --- | --- | --- |
| v1 | `dev_test_legacy`, classical | `dev` and `test` only |
| v2 | `qday_default`, hybrid envelope | `dev`, `test`, `stage`, `prod` |

On `stage` and `prod`, new writes are v2 only. v1 remains for explicit dev/test fixtures. Self-host compose defaults to `DEPLOY_ENV=dev` and `CRYPTO_ALLOWED_PROFILE_VERSIONS=1,2`, because web registration still sends `password_kdf_params_version=1` while the identity blob is already v2. `DEPLOY_ENV=prod` allows only profile 2 and returns `CRYPTO_PROFILE_NOT_ALLOWED`. The process refuses to boot if `CRYPTO_ALLOWED_PROFILE_VERSIONS=1,2` is combined with `DEPLOY_ENV=prod`.

## Algorithms that are actually used

The engine is `rust/crypto-engine`, compiled to WASM for clients. Public code and the architecture notes fix these primitives:

- **Argon2id** - the master-password share (KDF).
- **XChaCha20-Poly1305** - symmetric encryption of vault items, attachments, and the hybrid-envelope payload. The nonce is 24 bytes.
- **AES-256-GCM** - declared among the engine primitives.
- **X25519** - the ephemeral ECC key in the hybrid envelope, 32 bytes.
- **ML-KEM-768** - post-quantum encapsulation. The ciphertext field in the envelope is 1088 bytes. A user keypair is decapsulation key plus encapsulation key.
- **Ed25519** - signatures. Critical sync events (`VAULT_SHARE`, `VAULT_KEY_ROTATION`, and share/revoke/rotate/update-role) are signed with the hybrid envelope `hybrid_ed25519_pq_bind_v1`: Ed25519 plus a bind to the signer’s PQ key.
- **HKDF / SHA-256** - the hybrid envelope KDF is `SHA-256(domain || ecc_shared || pq_shared || aad)`, `kdf_id = 1`.
- **OS RNG** - keys and generator output.

The v2 hybrid envelope (header version `1`, `aead_id = 1` = XChaCha20-Poly1305) combines the ECC and PQ secrets. Decryption follows verified capabilities, with no silent downgrade. There is no JS fallback for hybrid/PQ: WASM failures become `CryptoSdkError` with codes `UNSUPPORTED_ALGORITHM`, `INVALID_KEY_LENGTH`, `MALFORMED_ENVELOPE`, `DECRYPT_FAILED`, `INTERNAL`.

A v2 user identity is Ed25519 plus ML-KEM-768 (`ed25519_mlkem768_v1`). The private bundle is encrypted. The public PQ key is stored separately.

## What is not in the code

A pure post-quantum profile without ECC is reserved as v3+ and is not implemented in the config registry. **TODO:** this page does not map every call site that still uses AES-256-GCM instead of XChaCha20-Poly1305. Client wrappers for items, capsules, and vault metadata name XChaCha20-Poly1305.
