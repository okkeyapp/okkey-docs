---
title: Workspace settings
sidebar_position: 1
plans: [free, enterprise]
---

import HashRedirect from '@site/src/components/HashRedirect';

# Workspace settings

The sidebar item "Settings" sets the workspace rules: the name, trash retention, capsules, who can see settings, and who can see items.

The page opens on "General". "Items" and "Capsules" sit inside "General" and use the same permissions.

A role opens settings sections. A profile opens items, fields, and actions inside a vault.

:::tip
A role and a profile do different jobs. A role covers workspace settings. A profile covers items in a vault.
:::

<HashRedirect map={{"roles": "workspace/roles", "profiles": "workspace/profiles", "members": "workspace/members", "how-to-invite": "workspace/members#how-to-invite", "member-card": "workspace/members#member-card", "vaults": "workspace/vaults#vault-settings", "personal-vault": "workspace/vaults#personal-vault-settings", "shared-vaults": "workspace/vaults#shared-vault-settings"}} />

## Settings sections {#settings-sections}

| Section | Page |
| --- | --- |
| "General", with "Items" and "Capsules" inside it | [General](#general) |
| "Roles" | [Roles](./roles.md) |
| "Profiles" | [Profiles](./profiles.md) |
| "Members" | [Members](./members.md) |
| "Vaults" | [Vaults](./vaults.md#vault-settings) |

Who can see a workspace settings section is decided by the role. Built-in roles: "Owner", "Admin", "User". "User" has no access to workspace settings.

## General

Name, logo, and tile color of the workspace.

| Setting | How to change it |
| --- | --- |
| "Workspace name" | The name members see. |
| "Upload logo", "Remove logo" | The logo file is stored in the personal vault. Without a personal vault, upload is unavailable. |
| "Change color", "Custom color" | One of ten preset colors, or your own color from 3 or 6 hex digits. |

## Items

Trash retention and the rules for files in items. Learn more in [Items](../items/index.md).

| Setting | What it does | How to set it |
| --- | --- | --- |
| "Deleted items retention" | After this period, deleted items are removed from the server. | 1, 3, 7, 14, or 30 days. |
| "Allow files in items" | Allows the "File" field and the "Secure files" category. | A switch. The setting is on Free and on Enterprise. |
| "Allowed upload file formats" | A list of extensions, for example `jpg, png, pdf`. | An empty field does not limit formats in the interface. |
| "Maximum file size" | The size limit of one file in an item. | A number from 1 to 1024 MB. |

The same limits apply to files from a ZIP during [import](../tools/import.md).

## Capsules

Who in the workspace can create capsules, and which limits are required. How a capsule looks to the recipient is in [Capsules](../capsules.md).

Capsules themselves exist on Free and on Enterprise. Advanced access settings on a capsule exist on Enterprise. On Free the creator cannot turn them on.

| Setting | What it does |
| --- | --- |
| "Allow capsules" | Who creates capsules: "Nobody", "Everyone", "Selected", "Everyone except". |
| "Limit views" | A view count. 0 removes the limit. A number above zero turns the "Views" block on, and it cannot be turned off on the card. |
| "Require time-based deactivation" | A deactivation time is required. The "Never" option disappears. |
| "Require access settings" | The "Access" block is always on. |
| "User access" | "Anyone" or "Members only". |
| "Require password" | The capsule password is always on. |
| "Password attempt limit" | The number of failed attempts. 0 removes the limit. |
| "Require approval" | Showing the capsule waits for the owner's decision, and this cannot be turned off on the card. |

:::note
Policies can be saved on Free too. Advanced settings on the capsule itself cannot be turned on while the plan is Free. That needs Enterprise.
:::

## Next steps

- [Vaults](./vaults.md)
- [Capsules](../capsules.md)
- [Plans](../plans.md)
- [Items](../items/index.md)
