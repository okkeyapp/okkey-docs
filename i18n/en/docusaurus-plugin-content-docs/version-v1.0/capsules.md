---
title: Capsules
sidebar_position: 7
plans: [free, enterprise]
---

# Capsules

A capsule shares text, a file, or an item by link. The contents are encrypted on your device. The recipient page says: "Data is decrypted on your device only, the server never sees it". The server stores ciphertext and access rules.

Sidebar item "Capsules". The list text says capsules are encrypted records for secure sharing via email or chat.

A capsule exists on Free and on Enterprise. On self-hosted, a file in a capsule is on Free too. Advanced access settings (an expiry, a recipient list, a password, owner approval, and your own view limit) exist on Enterprise. A view limit set in workspace settings also applies on Free.

Workspace policies are set in [capsule settings](./workspace/index.md#capsules). If a member is not allowed to create capsules, creation is closed for them.

## List

Button "Create capsule". Search: "Search by name…". Empty list: "No capsules yet".

Columns: "Name", "Type", "Created", "Updated", "Active", "Views", "Password protected". Type: "Text", "File", "Item". "Active" and "Password protected" use "Yes" and "No".

A row can be selected. The menu has "Deactivate", "Activate", "Delete", and "Copy link". After creation the toast is "Capsule created, link copied".

Deletion asks "Delete capsule?". The text is: "The capsule will be permanently deleted. Its link will stop working." Button "Delete". The capsule does not go to the item trash.

## New capsule

Window "New capsule" or "Edit capsule". Field "Name".

Contents:

- "Text". Field "Secret text", placeholder "Enter the text you want to share".
- "File". "Upload file" and "Remove file". On self-hosted this type is available on Free. Size and extensions are the same as in [item settings](./workspace/index.md#items). If a policy turns the type off, the card says: "This capsule type is disabled in workspace settings. You can only delete the capsule."
- "Item". "Search items", placeholder "Enter text to search". Search uses the title, description, addresses, tags, and open fields in the main part of the item, not secret fields. Then the field scope: "All", "All except", or "Selected".

"Advanced settings" shows how many blocks are on.

On Free this block is absent while "Limit views" in workspace settings is 0. If the number is above zero, the block opens and contains only "Views": the number from the policy, which cannot be changed, "Then:" set to "Deactivate", and the block cannot be turned off. The switch tooltip is "Not available on your current plan".

On Enterprise the block has five settings. If a workspace policy already turned a block on, it cannot be turned off on the card.

| Block | What it sets |
| --- | --- |
| "Views" | "View limit:" and "Then:": "Deactivate" or "Delete capsule". |
| "Time" | "Activate:", "Deactivate at:", "Delete at:". Presets: "Immediately", "Never", "In 15 minutes", "In 1 hour", "In 6 hours", "In 12 hours", "In 24 hours", "After activation", or your own date. Deactivation earlier than activation cannot be saved: "Deactivation time cannot be earlier than activation time". |
| "Access" | "Select users". A foreign email is added with "Add …". A bad address: "Invalid email". |
| "Password" | "Set password:" and "Failed attempt limit:". While editing, an empty field ("Leave blank to keep unchanged") keeps the previous password. |
| "Approval" | "Require owner approval before showing". |

"Use these settings as my default" remembers the blocks for the next capsules.

:::tip
On Free, a capsule with no view policy is created without "Advanced settings". An expiry, a password, a recipient list, and approval appear on Enterprise.
:::

## Recipient link

The capsule page opens without signing in to the vault. Title: "Okkey secure capsule". The recipient sees the password ("This capsule is password-protected", button "Unlock"), the approval wait, the view limit, or the expiry. That is whatever the card turned on.

Copy the link with "Copy link" and paste the whole link. It contains a `#key=` fragment. If that part is cut off, the page says the link has no decryption key.

If the policy is "Members only", the recipient sees "Sign in to Okkey to view this capsule" and the button "Sign in".

A wrong password: "Incorrect password". Attempts used up: "Attempt limit exceeded". View limit: "This capsule's view limit has been reached". An expiry or a capsule that is off: "This capsule is unavailable, not active, or has expired".

"Approval" shows the owner the window "Approve capsule access". The request shows "Device", "Platform", "Country", "City", and "Time". Country and city may be "Unknown". Buttons: "Approve", "Deny access". "Add to blacklist" blocks that email or IP for this capsule. While waiting, the recipient sees "Waiting for owner approval…". A denial: "The owner denied access to this capsule".

## How to check

1. On Free, create a "Text" capsule with no view policy. There is no "Advanced settings" block. The toast says the link was copied. Open the link in another browser: the text is visible without signing in.
2. In "Settings", "Capsules", set "Limit views" to 1. A new capsule shows "Views" on, the number 1, "Then:" set to "Deactivate", and the switch cannot be turned off. A second view of the link says the limit has been reached.
3. Turn off the "File" type in "Allow capsule types". In a new capsule that type is unavailable.
4. On Enterprise, turn on "Password" and open the link. The page asks for "Capsule password" before showing the text.

## Next steps

- [Capsule settings](./workspace/index.md#capsules)
- [Plans](./plans.md)
- [Items](./items/index.md)
