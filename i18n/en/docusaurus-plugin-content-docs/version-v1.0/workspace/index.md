---
title: Workspace settings
sidebar_position: 1
plans: [free, enterprise]
---

import HashRedirect from '@site/src/components/HashRedirect';

# Workspace settings

The sidebar item "Settings" sets the workspace rules: the name, trash retention, files, capsules, who can see settings, and who can see items.

On self-hosted, an owner has one workspace. That is true on Free and on Enterprise.

The page opens on "General". The settings menu has separate items: "Items", "Capsules", "Roles", "Profiles", "Members", "Vaults", and "Change plan". "Billing & invoices" is not in the menu.

A role opens settings sections. A profile opens items, fields, and actions inside a vault.

:::tip
A role and a profile do different jobs. A role covers workspace settings. A profile covers items in a vault.
:::

<HashRedirect map={{"roles": "workspace/roles", "profiles": "workspace/profiles", "members": "workspace/members", "how-to-invite": "workspace/members#how-to-invite", "member-card": "workspace/members#member-card", "vaults": "workspace/vaults#vault-settings", "personal-vault": "workspace/vaults#personal-vault-settings", "shared-vaults": "workspace/vaults#shared-vault-settings"}} />

## Settings sections {#settings-sections}

| Section | Page |
| --- | --- |
| "General" | [General](#general) |
| "Items" | [Items](#items) |
| "Capsules" | [Capsules](#capsules) |
| "Roles" | [Roles](./roles.md) |
| "Profiles" | [Profiles](./profiles.md) |
| "Members" | [Members](./members.md) |
| "Vaults" | [Vaults](./vaults.md) |
| "Change plan" | [Change plan](./plan.md) |

Who can see a section is decided by the role. Built-in roles: "Owner", "Admin", "User". "User" has no access to workspace settings.

## General {#general}

Name, logo, and tile color of the workspace.

| Setting | How to change it |
| --- | --- |
| "Workspace name" | The name members see. It is saved when you leave the field. |
| "Upload logo", "Remove logo" | The logo file is stored in the personal vault. Without a personal vault, upload is unavailable: "Logo upload is unavailable: personal vault not found." While there is no logo, "or" and "Change color" sit next to the upload button. When a logo is uploaded, the color control is replaced by "Remove logo", and uploading again is still labeled "Upload logo". |
| "Change color", "Custom color" | One of ten preset colors, or your own color from 3 or 6 hex digits. |

Deleting the workspace is not shown in this section on Free.

## Items {#items}

Trash retention and the rules for files in items. Learn more in [Items](../items/index.md).

| Setting | What it does | How to set it |
| --- | --- | --- |
| "Deleted items retention" | After this period, deleted items are removed from the server. The default is 30 days. | A list: "1 day", "3 days", "7 days", "14 days", "30 days". |
| "Allow files in items" | Allows the "File" field and the "Secure files" category. On by default. | A switch. On self-hosted the setting is on Free and on Enterprise. |
| "Allowed upload file formats" | A list of extensions. The default is `jpg`, `png`, `pdf`, `zip`, `rar`. | Shown while the files switch is on. An empty list does not limit extensions. |
| "Maximum file size" | The size limit of one file in an item. The default is 2. | A number from 1 to 1024. The field text is "Maximum file size in an item from 1 to 1024 MB". |

The same limits apply to files from a ZIP during [import](../tools/import.md). Self-hosted has no ceiling on the total size of the vault.

## Capsules {#capsules}

Who in the workspace can create capsules, and which limits are required. How a capsule looks to the recipient is in [Capsules](../capsules.md).

Capsules themselves, including a file, exist on Free and on Enterprise. On Free this page has three settings. The other policy switches exist on Enterprise.

| Setting | What it does | Plan |
| --- | --- | --- |
| "Allow capsules" | Who creates capsules: "Nobody", "Everyone", "Selected", "Everyone except". "Selected" and "Everyone except" show "Select members". The default is "Everyone". | Free and Enterprise |
| "Allow capsule types" | Which kinds can be created: "Text", "File", "Item". "All" means all three. An empty selection blocks creation. | Free and Enterprise |
| "Limit views" | A view count. 0 removes the limit. A number above zero turns the "Views" block on in the card, and it cannot be turned off there. On Free the action after the limit is fixed: "Deactivate". | Free and Enterprise |
| "Require time-based deactivation" | A deactivation time is required. The "Never" option disappears. | Enterprise |
| "Require access settings" | The "Access" block is always on. | Enterprise |
| "User access" | "Anyone" or "Members only". | Enterprise |
| "Require password" | The capsule password is always on. | Enterprise |
| "Password attempt limit" | The number of failed attempts. 0 removes the forced limit. | Enterprise |
| "Require approval" | Showing the capsule waits for the owner's decision, and this cannot be turned off on the card. | Enterprise |

On Free, advanced settings on the capsule itself cannot be turned on. If a view limit is already set here, the card shows only a locked "Views" block.

## How to check

1. Open "Settings". "General" is first, with separate "Items" and "Capsules" next to it.
2. In "Items", the "Allow files in items" switch is available on Free. An empty formats field does not cut extensions, and the file size number stays between 1 and 1024.
3. In "Capsules" on Free you see "Allow capsules", "Allow capsule types", and "Limit views". The password, expiry, and approval switches are absent.
4. Set "Limit views" above zero and open "Create capsule". The "Views" block is on, and it cannot be turned off.

## Next steps

- [Members](./members.md)
- [Vaults](./vaults.md)
- [Capsules](../capsules.md)
- [Plans](../plans.md)
