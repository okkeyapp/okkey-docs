---
title: Zero-knowledge
sidebar_position: 4
plans: [free, enterprise]
---

# Zero-knowledge

The server never sees decrypted items, the master password, or the whole vault key. Encryption and decryption happen only on the client. A self-hosted administrator cannot read vault contents either: the API, worker, and web images do not change this scheme.

The path for vault data:

1. The client encrypts.
2. The server stores ciphertext, events, and metadata.
3. The client decrypts.

## What the server does store

These are not item secrets, but the database is not empty:

- PostgreSQL: users, devices, vault metadata, the event log.
- Redis: sessions, cache, locks, the email queue.
- S3-compatible storage (MinIO in compose): encrypted attachments and files.

The sign-in email is sent by the server (or written to worker logs when `EMAIL_PROVIDER=logger`). The confirmation code is not vault contents, but the server creates and delivers it.

Optional capsule GeoIP is resolved locally from an MMDB file. The requester IP is not sent to a third party. Production compose leaves GeoIP off (`GEOIP_ENABLED=false`).

The compromised-password check sends only a SHA-1 prefix to Have I Been Pwned. That is the only outbound password-related request described in the UI. The full password is not part of it.

## What the server does not do

Cryptography is not moved to the backend. Enterprise plugins cannot redefine core crypto flows, the version policy, or zeroization of vault key material.

## Next steps

- [Protection](./security)
- [Open source](./open-source)
- [Monitoring](../monitoring)
- [Capsules](../capsules)
