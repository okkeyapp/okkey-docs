---
title: Capsules
sidebar_position: 7
plans: [free, enterprise]
---

# Capsules

Sidebar item "Capsules". List intro: "Capsules are encrypted records for secure sharing via email or chat."

A capsule exists on Free and on Enterprise. On Free it is a link without access settings: `capsuleAccessSettings` is off. On Enterprise the "Advanced settings" block is on. While the block is closed, the UI says: "Advanced settings are available on the Enterprise plan." Next to each disabled row: "Not available on your current plan".

Workspace policies can force some of these settings. They are set in [capsule settings](./settings/workspace#capsules). If a member is not allowed to create capsules, the item does not work for them.

## List

Empty list: "No capsules yet". Button "Create capsule". Search: "Search by name…". If nothing matches: "No results found for \"…\"".

"Columns": "Name", "Type", "Created", "Updated", "Active", "Views", "Password protected".

Type: "Text", "File", "Item". Password column: "Yes" or "No". Dates relative to today: "Today", "Yesterday". Activity: "From …", "Until …".

A row can be selected. The counter is the number of capsules. Bulk actions from toasts: deactivate ("Capsule deactivated"), activate, delete, copy link ("Link copied"). Creating and copying the link: "Capsule created, link copied".

Deletion asks "Delete capsule?" or "Delete capsules?". Copy: the capsule is permanently deleted and the link stops working. This is not the item trash.

## New capsule

Window "New capsule" or "Edit capsule". Field "Name".

Contents:

- text — "Enter the text you want to share";
- file — "Upload file" / "Remove file", subject to the workspace file limits;
- item — "Search items", "Enter text to search". Search looks at non-secret preset section fields, not at secrets. Empty: "No items found". Item field scope: "All", "All except", "Selected", label "Available fields:".

The "Advanced settings" button shows how many blocks are on.

| Block | Title | What it sets |
| --- | --- | --- |
| Views | "Views". "Limit views and choose what happens when the limit is reached". | "View limit:". "Then:" — "Deactivate" or "Delete capsule". |
| Time | "Time". "Activate, deactivate, and delete the capsule on a schedule". | "Activate:", "Deactivate at:", "Delete at:". Presets: "Never", "Immediately", "In 15 minutes", "In 1 hour", "In 6 hours", "In 12 hours", "In 24 hours", "After activation", or a date and time ("Hr", "Min", "Today", "Done"). Deactivation before activation: "Deactivation time cannot be earlier than activation time". Deletion before activation is the same kind of error. |
| Access | "Access". "Allow viewing only for specific users". | "Select users", search "First name, last name, or email…". A foreign email can be added ("Add …"). Invalid address: "Invalid email". |
| Password | "Password". "Require a password to view". | "Set password:". While editing, an empty field is "Leave blank to keep unchanged". "Failed attempt limit:". |
| Approval | "Approval". "Require owner approval before showing". | The owner sees "Approve capsule access". Text: "… wants to view capsule \"…\"." Request fields: "Device", "Platform", "Country", "City", "Time". Buttons: "Approve", "Deny access". "More deny actions" → "Add to blacklist" ("This email or IP will no longer be able to request access to this capsule"). A guest with no name is "Guest" or "Unknown user". |

"Use these settings as my default" remembers advanced settings for this user's next capsules.

If a workspace policy already turned a block on, it cannot be turned off on the card.

## Recipient link

The public capsule page opens without signing in to the vault. The recipient sees only what the card allowed: a password, waiting for approval, a view limit, or an expiry. Request geolocation, when GeoIP is enabled on the server, is resolved locally from MMDB. Self-host compose leaves GeoIP off by default, so country and city can stay "Unknown".

Capsule contents are encrypted with client-side XChaCha20-Poly1305, the same as other core envelopes. The server stores ciphertext and access rules, not plaintext.
