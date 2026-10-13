---
title: About
sidebar_position: 1
slug: /
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# About

Okkey is a password manager that encrypts on the client. The public `okkey` repository is the core and must run without Enterprise code. Core clients are the web app, the mobile app, the desktop app, and the browser extension. Deployment is designed for both SaaS and self-hosting.

This documentation was checked against the `dev` branch of the public repository [okkeyapp/okkey](https://github.com/okkeyapp/okkey). The private `okkey-enterprise` repository was not available while the site was written, so Enterprise-module behavior is described only where core records it (stubs, the plan matrix, architecture notes). Those places are marked **TODO**.

## How the product is put together

In core terms:

- A **user** is an account.
- A **device** is a trusted sign-in device. A new device must be confirmed explicitly.
- A **workspace** is a group of vaults and members. On self-hosted, an owner may have at most one workspace.
- A **vault** is a container of items with its own key.
- An **item** is a login, a card, a note, or another category.
- A **folder** is a personal grouping of items. Only the owner can see their folders.
- A **capsule** is an encrypted share of text, a file, or an item by link.

The web sidebar labels are “All items”, “Capsules”, “Monitoring”, “Tools”, “Settings”, and the sections “Vaults” and “Folders”.

## Main properties

| Property | What the code actually does |
| --- | --- |
| [Q-Day ready](./features/qday) | Production writes use crypto profile v2: hybrid X25519 and ML-KEM-768, AEAD XChaCha20-Poly1305. |
| [Protection](./features/security) | The vault key is assembled from three shares. The server does not store the whole key and does not see item plaintext. |
| [Zero-knowledge](./features/zero-knowledge) | Encryption and decryption run on the client. The engine is Rust and reaches clients as WASM. |
| [Open crypto source](./features/open-source) | Cryptography, vaults, and clients live in public `okkey`. Enterprise attaches as plugins and cannot replace the crypto policy. |

## Plan badges

Every page shows which plans include what that page describes. How badge names map to `plan_tier` is on [Plans](./plans).
