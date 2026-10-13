---
title: Vaults
sidebar_position: 10
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Vaults

Sidebar section "Vaults". A vault is a container of items with its own key. Items are encrypted with the vault key. A member sees only the vaults their profile grants.

Sidebar button: "Create vault".

## Personal vault

Each workspace has one personal vault. It is created together with the workspace. In settings it is called "Personal vault", caption "Available only to you". On Free and Pro there are no other vaults: the `sharedVaults` flag is off, and the shared-vault quota is 0.

Items, folders, and favorites inside the personal vault belong to you. Folders stay personal even when an item lives in a shared vault: only the folder owner sees the folder. See [Folders](./folders).

The personal vault name is set when it is created. The metadata popup is not wired in the open build. **TODO:** personal vault popup fields (icon, name) are described only as the `workspace-shared-vaults` plugin.

## Shared vaults

From Family (and on self-hosted enterprise, when the license includes shared vaults) you can create vaults for members. In settings the section is "Shared vaults", caption "Vaults with shared access for workspace members", button "Create".

Catalog limits: Family — 5, Team — 50, Enterprise — no limit.

Creating, deleting, and granting access are a plugin. The core stores the list, reads it, and serves `GET …/key`. Wrap and rotate are done by `VaultSharingService`. A recipient cannot open the vault until its key is wrapped to their public key (hybrid v2 envelope).

What a member sees inside a shared vault is decided by the profile: categories, fields, and the functions "Move to archive", "Add to favorites", "Create capsules", "Copy record". The role does not affect that.

In monitoring, the "Shared" scope counts passwords from these vaults only. In the item list, the "Vaults" filter picks one vault.

## Sidebar

"All items" clears the vault, folder, search, and list filter. A vault in the sidebar narrows the list to its items. While the vault name is loading, the filter can briefly show the identifier.
