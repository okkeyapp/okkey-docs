---
title: About
sidebar_position: 1
slug: /
plans: [free, enterprise]
---

# About

Okkey is a password manager you run yourself. Items are encrypted on your device. The server stores ciphertext and cannot see what is inside a vault.

These pages cover self-hosted installs only. There is no cloud product here.

:::note
This is the v1.0 docs line. The current release in this line is [1.0.0-beta.1](https://github.com/okkeyapp/okkey/releases/tag/v1.0.0-beta.1). Later betas and 1.0.x patches update these same pages.
:::

The core lives in the public repository [okkeyapp/okkey](https://github.com/okkeyapp/okkey). Clients are the web app, the mobile app, the desktop app, and the browser extension. The text is checked against that repository, and against `okkey-enterprise` where that module actually exists. If a screen is missing, the page does not call the feature ready. Gaps are marked **TODO**.

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

| Property | What it means |
| --- | --- |
| [Q-Day ready](./features/qday) | Production writes use crypto profile v2: hybrid X25519 and ML-KEM-768, AEAD XChaCha20-Poly1305. |
| [Protection](./features/security) | The vault key is assembled from three shares. The server does not store the whole key and does not see item plaintext. |
| [Zero-knowledge](./features/zero-knowledge) | Encryption and decryption run on the client. The engine is Rust and reaches clients as WASM. |
| [Open crypto source](./features/open-source) | Cryptography, vaults, and clients live in public `okkey`. Enterprise attaches as plugins and cannot replace the crypto policy. |

## Plan badges

Every page shows which plans include what that page describes. How badge names map to `plan_tier` is on [Plans](./plans).

## Next steps

- [Plans](./plans)
- [Self-hosted install](./install)
- [Features](./features)
- [First-time setup](./install/first-setup)
