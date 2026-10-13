---
title: About
sidebar_position: 1
slug: /
plans: [free, enterprise]
---

# About

Okkey is a password manager you install yourself. Items are encrypted on your device. The server stores ciphertext and cannot read the vaults.

These pages are about self-hosted Okkey. You install it yourself and get the Free plan. An Okkey employee sets up Enterprise. See [Plans](./plans).

:::note
This is the v1.0 docs line. It currently covers release [1.0.0-beta.1](https://github.com/okkeyapp/okkey/releases/tag/v1.0.0-beta.1). Later 1.0.x betas and patches update these same pages.
:::

Clients: web, mobile app, desktop, and a browser extension. The open source is in [okkeyapp/okkey](https://github.com/okkeyapp/okkey).

## How the product is put together

- **User** - an account.
- **Device** - a trusted sign-in device. A new device must be confirmed explicitly.
- **Workspace** - a group of vaults and members. On self-hosted, an owner has one workspace.
- **Vault** - a container of items with its own key.
- **Item** - a login, a card, a note, and other categories.
- **Folder** - your own grouping of items. Only the folder owner sees it.
- **Capsule** - an encrypted share of text, a file, or an item by link.

The sidebar has "All items", "Capsules", "Monitoring", "Tools", "Settings", and the "Vaults" and "Folders" sections.

## Main properties

| Property | What it means |
| --- | --- |
| [Q-Day ready](./features/qday) | New items use hybrid encryption: a classical scheme and a post-quantum one. |
| [Protection](./features/security) | The vault key is assembled from three shares. The server does not store the whole key and does not see item plaintext. |
| [Zero-knowledge](./features/zero-knowledge) | Encryption and decryption run on your device. |
| [Open source encryption](./features/open-source) | The encryption is published in the public Okkey repository. |

## Plan badges

Every page shows which plans include what that page describes. The comparison is on [Plans](./plans).

## Next steps

- [Plans](./plans)
- [Self-hosted install](./install)
- [Features](./features)
- [First-time setup](./install/first-setup)
