---
title: Vaults
sidebar_position: 10
plans: [free, enterprise]
---

# Vaults

A vault is a container of items with its own key. Items are encrypted with that key, so access to the vault is access to the items. A member sees only the vaults their profile grants.

Sidebar section "Vaults". Sidebar button: "Create vault".

## Personal vault

Each workspace has one personal vault. It is created together with the workspace. In settings it is called "Personal vault", caption "Available only to you". On Free there are no other vaults: the `sharedVaults` flag is off.

Items, folders, and favorites inside the personal vault belong to you. Folders stay personal even when an item lives in a shared vault: only the folder owner sees the folder. See [Folders](./folders).

The personal vault name is set when it is created. The “Edit vault” popup is `workspace-shared-vaults`: “Icon”, “Name”, “Description”, and a note that only the owner can see the vault. This popup does not create a second personal vault. The fields and the ban on granting access are in [vault settings](./settings/workspace#vaults).

## Shared vaults

On Enterprise (`sharedVaults` is on and the modules are loaded with `ENTERPRISE_MODULES=true`) you can create vaults for members. In settings the section is "Shared vaults", caption "Vaults with shared access for workspace members", button "Create".

Creating, deleting, and granting access are the `workspace-shared-vaults` plugin. The core stores the list, reads it, and serves `GET …/key`. Wrap and rotate are done by `VaultSharingService`. A recipient cannot open the vault until its key is wrapped to their public key (hybrid v2 envelope). The popup has an icon, a name, a description, and a profile select for each member. On create, the owner, admin, and creator get “Extended”. Everyone else gets “No access”. Popup details are in [vault settings](./settings/workspace#vaults).

What a member sees inside a shared vault is decided by the profile: categories, fields, and the functions "Move to archive", "Add to favorites", "Create capsules", "Copy record". The role does not affect that.

In monitoring, the "Shared" scope counts passwords from these vaults only. In the item list, the "Vaults" filter picks one vault.

:::note
Free has no "Shared vaults" section. A new workspace gets them when the install sets `ENTERPRISE_MODULES=true`.
:::

## Sidebar

"All items" clears the vault, folder, search, and list filter. A vault in the sidebar narrows the list to its items. While the vault name is loading, the filter can briefly show the identifier.

## Next steps

- [Vault settings](./settings/workspace#vaults)
- [Folders](./folders)
- [Item lists](./lists)
- [Plans](./plans)
