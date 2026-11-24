---
title: Vaults
sidebar_position: 5
plans: [free, enterprise]
---

# Vaults

A vault stores items under its own key. Whoever opens the vault sees the items. A member sees only the vaults their profile allows.

Sidebar section "Vaults". The "Create vault" button is shown when the role may create vaults. It is shown on Free and on Enterprise: shared vaults are part of both plans. On Free you can create one shared vault. The personal vault does not count toward that limit. On Enterprise there is no cap.

A second shared vault on Free does not save: the window shows an error, and the vault does not appear in the list.

## Personal vault {#personal-vault-settings}

Each workspace has one personal vault. It is created with the workspace. Until you rename it, it is called "Personal vault", the description is "Your personal vault in this workspace", and the trailing text is "Available only to you".

In the "Edit vault" window the subtitle is "Personal vault". You change "Icon", "Name", and "Description". The text at the bottom is: "Only you can see this personal vault. Other workspace members cannot open it, view its contents, or obtain an access key." You cannot grant access to it or delete it. A second personal vault cannot be created.

Folders inside a vault stay personal: only the folder owner sees the folder. See [Folders](../items/folders.md).

## Shared vaults {#shared-vault-settings}

In settings this is the "Shared vaults" section, subtitle "Vaults with shared access for workspace members", button "Create". The same window opens from "Create vault" in the sidebar. The window title is "Create vault", subtitle "Shared vault".

The window sets "Icon", "Name", "Description", and the "Vault access" block. Filters: "All (N)", "With access", "No access", and a profile name. Search: "Search...".

On create, the owner, admin, and creator get "Extended". Everyone else gets "No access". You cannot set your own row to "No access". The owner and admin profile lists are locked. A member who has not accepted is marked "Unconfirmed".

A member can open the vault after the vault key has been encrypted for them. What they see inside is decided by the profile: categories, fields, and the actions "Move to archive", "Add to favorites", "Create capsules", "Copy record". The role does not affect vault contents.

While the vault is locked, the vault cannot be saved: "Unlock your vault to save changes".

Deleting a shared vault asks "Delete vault?". The text is: "The vault and all items inside it will be deleted. This cannot be undone." Button "Delete".

## Vault settings {#vault-settings}

The personal vault and shared vaults are configured in the same "Vaults" section. Personal vault fields are described above, under [Personal vault](#personal-vault-settings). Shared vault fields are described under [Shared vaults](#shared-vault-settings).

## Sidebar

"All items" clears the selected vault, folder, category, search, and filter. A vault in the sidebar keeps only its own items in the list. In the item list, the "Vaults" filter picks one vault. The "Shared" scope keeps items from shared vaults only, and "Personal" keeps items from the personal vault only.

## How to check

1. In "Settings", "Vaults" on Free you see both the personal vault and the "Shared vaults" section with "Create".
2. Create one shared vault. It appears in the sidebar. A second create does not save.
3. In access, the owner has "Extended", and a new member has "No access". Set the member to "Simple" and open the vault as them: items can be read, and creating an item is unavailable.
4. The personal vault has no access grant and no delete.

## Next steps

- [Folders](../items/folders.md)
- [Item lists](../items/lists.md)
- [Members](./members.md)
- [Plans](../plans.md)
