---
title: Item actions
sidebar_position: 4
plans: [free, enterprise]
---

# Item actions

The row menu is labeled "Item actions". Use it to edit, copy, archive, and delete an item. On the card, some of the same commands are buttons, and the rest sit under "more". What is visible depends on the profile and on whether the item is archived or in the trash.

Profile functions that turn commands on:

| Profile function | Command |
| --- | --- |
| permission to edit the item | "Edit" |
| "Copy record" | "Copy" |
| "Add to favorites" | "Add to favorites" / "Remove from favorites" |
| "Create capsules" | "Create capsule" |
| "Move to archive" | "Archive" / "Unarchive" |
| permission to delete | "Delete" / "Restore" |

"Select" is always in the row menu and turns selection mode on. In selection mode, rows have circles, a counter "\{count\} item" / "\{count\} items" sits at the top, plus "Actions" and "Cancel selection". In bulk you can add to favorites, remove from favorites, archive, unarchive, delete, and restore - only for rows where the profile allows it.

## When a command is present

While the item is not archived and not deleted, edit, copy, favorite, and capsule are shown when the profile allows them. "Edit" on the card is disabled if the item is archived or deleted.

Archive and delete hide those commands: an archived item has no favorite and no capsule, and the trash has no archive either. An archived item keeps "Unarchive". A deleted item keeps "Restore".

Archiving clears the favorite. Deleting clears the favorite and the archive flag and closes the open card. Deletion is not immediate: the "Delete item" / "Delete items" window says the item will be moved to "Recently deleted" for the number of days from [retention settings](../settings/workspace#items), then permanently deleted. The confirm button is "Delete".

"Copy" opens a new item of the same category with the source data. "Create capsule" opens a capsule already bound to the item. "Edit" opens the same card in edit mode.

The "Deletion" zone can ask for the master password, PIN, or biometrics again if you turned that on in [master password](../settings/personal#master-password).

In the extension, "Archive" and "Delete" run inside the extension. Editing an item opens the web app.

:::note
Delete moves the item to "Recently deleted". How long it stays there is set in workspace settings.
:::

## Next steps

- [Item lists](../lists)
- [Item settings](../settings/workspace#items)
- [Capsules](../capsules)
