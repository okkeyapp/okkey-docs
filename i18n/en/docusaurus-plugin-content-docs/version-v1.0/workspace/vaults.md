---
title: Vaults
sidebar_position: 5
plans: [free, enterprise]
---

# Vaults

A vault stores items under its own key. Whoever opens the vault sees the items. A member sees only the vaults their profile allows.

Sidebar section "Vaults". Button "Create vault".

## Personal vault

Each workspace has one personal vault. It is created with the workspace and named "Personal vault". On Free there are no other vaults.

Folders inside a vault stay personal: only the folder owner sees the folder. See [Folders](../items/folders.md).

On Free you change the name, icon, and description of the personal vault. A second personal vault cannot be created, and access cannot be granted to other members. The window fields are in [vault settings](#vault-settings). Enterprise is required for shared vaults.

## Shared vaults

On Enterprise you can create vaults for members. In settings this is the "Shared vaults" section and the "Create" button.

The window sets the icon, name, description, and each member's profile. On create, the owner, admin, and creator get "Extended". Everyone else gets "No access".

A member can open the vault after the vault key has been encrypted for them. What they see inside is decided by the profile: categories, fields, and the actions "Move to archive", "Add to favorites", "Create capsules", "Copy record". The role does not affect vault contents.

Window details are in [vault settings](#vault-settings).

:::note
On Free there is no "Shared vaults" section. To get Enterprise, contact the Okkey team.
:::

In monitoring, the "Shared" scope counts passwords only from these vaults. In the item list, the "Vaults" filter picks one vault.

## Sidebar

"All items" clears the selected vault, folder, search, and filter. A vault in the sidebar keeps only its own items in the list.

## Vault settings {#vault-settings}

### Personal vault {#personal-vault-settings}

One per workspace. Only you can see it. You cannot grant access to it or delete it.

On Free, "Edit vault" changes the icon, name, and description.

### Shared vaults {#shared-vault-settings}

Available on Enterprise. On Free this section is absent.

"Create" opens a shared vault: icon, name, description, and member access. On create, the owner, admin, and creator get the "Extended" profile. Everyone else gets "No access".

Deleting a shared vault also deletes the items in it. While the vault is locked, the vault cannot be saved.

## Next steps

- [Vault settings](#vault-settings)
- [Folders](../items/folders.md)
- [Item lists](../items/lists.md)
- [Plans](../plans.md)
