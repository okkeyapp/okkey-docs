---
title: Capsules
sidebar_position: 7
plans: [free, enterprise]
---

# Capsules

A capsule shares text, a file, or an item by link. The contents are encrypted on your device. The recipient sees only what the card allowed.

Sidebar item "Capsules". A capsule exists on Free and on Enterprise.

On Free it is a link without advanced access settings. On Enterprise the "Advanced settings" block is available: a view limit, an expiry, a recipient list, a password, and owner approval.

Workspace policies can make some of these settings required. They are set in [capsule settings](./settings/workspace#capsules). If a member is not allowed to create capsules, the item is closed for them.

## List

Button "Create capsule". Search looks up the name.

Columns: "Name", "Type", "Created", "Updated", "Active", "Views", "Password protected". Type: "Text", "File", "Item".

A row can be selected. Deactivate, activate, delete, and copy link are available.

Deletion is final: the capsule does not go to the item trash, and the link stops working.

## New capsule

Window "New capsule" or "Edit capsule". Field "Name".

Contents:

- text;
- a file, with the workspace file limits;
- an item. Search looks at open fields, not at secrets. You can share all fields, all except the selected ones, or only the selected ones.

"Advanced settings" shows how many blocks are on.

| Block | What it sets |
| --- | --- |
| "Views" | A view count and the action after the limit: "Deactivate" or "Delete capsule". |
| "Time" | When to turn the capsule on, off, and delete it. You can pick a preset period or a date. Deactivation earlier than activation cannot be saved. |
| "Access" | Who can open the link. A foreign email can be added. |
| "Password" | A view password and the number of failed attempts. While editing, an empty field keeps the previous password. |
| "Approval" | Showing waits for the owner's decision. The request shows the device, system, country, city, and time. Buttons: "Approve", "Deny access". An email or IP can be added to this capsule's blacklist. |

"Use these settings as my default" remembers the blocks for the next capsules.

If a workspace policy already turned a block on, it cannot be turned off on the card.

:::tip
On Free a capsule is created without "Advanced settings". Limits, a password, and a recipient list appear on Enterprise.
:::

## Recipient link

The capsule page opens without signing in to the vault. The recipient sees the password, the approval wait, the view limit, or the expiry - whichever the card turned on.

Country and city of a request appear when location lookup is on on the server. On a normal install it is off, so country and city stay unknown.

The server stores ciphertext and access rules.

## Next steps

- [Capsule settings](./settings/workspace#capsules)
- [Plans](./plans)
- [Items](./items)
