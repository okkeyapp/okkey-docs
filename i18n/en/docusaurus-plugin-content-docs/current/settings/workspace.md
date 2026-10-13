---
title: Workspace settings
sidebar_position: 4
plans: [free, enterprise]
---

# Workspace settings

The sidebar item "Settings" sets the workspace rules: the name, trash retention, capsules, who can see settings, and who can see items.

The page opens on "General". "Items" and "Capsules" sit inside "General" and use the same permissions.

A role opens settings sections. A profile opens items, fields, and actions inside a vault.

:::tip
A role and a profile do different jobs. A role covers workspace settings. A profile covers items in a vault.
:::

## General

Name, logo, and tile color of the workspace.

| Setting | How to change it |
| --- | --- |
| "Workspace name" | The name members see. |
| "Upload logo", "Remove logo" | The logo file is stored in the personal vault. Without a personal vault, upload is unavailable. |
| "Change color", "Custom color" | One of ten preset colors, or your own color from 3 or 6 hex digits. |

## Items

Trash retention and the rules for files in items. Learn more in [Items](../items).

| Setting | What it does | How to set it |
| --- | --- | --- |
| "Deleted items retention" | After this period, deleted items are removed from the server. | 1, 3, 7, 14, or 30 days. |
| "Allow files in items" | Allows the "File" field and the "Secure files" category. | A switch. The setting is on Free and on Enterprise. |
| "Allowed upload file formats" | A list of extensions, for example `jpg, png, pdf`. | An empty field does not limit formats in the interface. |
| "Maximum file size" | The size limit of one file in an item. | A number from 1 to 1024 MB. |

The same limits apply to files from a ZIP during [import](../tools).

## Capsules

Who in the workspace can create capsules, and which limits are required. How a capsule looks to the recipient is in [Capsules](../capsules).

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

## Roles

A role grants access to workspace settings sections. Access to items is set in [profiles](#profiles).

Built-in roles cannot be changed or deleted:

| Role | Access |
| --- | --- |
| "Owner" | Unique permissions. The owner cannot be invited, given another role, or removed from members. |
| "Admin" | Every settings section. |
| "User" | No access to workspace settings. |

Sections in the permissions table: "General", "Items", "Capsules", "Roles", "Profiles", "Members", "Vaults".

"Custom roles" exist on Enterprise. On Free the editor is replaced by a note that the feature is unavailable. To get Enterprise, contact the Okkey team.

In the role editor you set "Name" and "Description". A new role starts with no permissions.

Access level: "All" covers every object, "Own" covers only objects this member created, "None" grants nothing. Create is turned on separately.

If you clear view, the other actions on that section are cleared too. Deleting a custom role moves its members to the "User" role.

## Profiles

A profile grants access to items in a vault: which categories and fields are visible, and which actions are allowed.

Built-in profiles cannot be changed or deleted:

| Profile | Access |
| --- | --- |
| "Extended" | Full access. The owner and admin receive it. |
| "Simple" | Reading items, favorites, capsules, and copy. Archive is not part of this profile. |

"Custom profiles" exist on Enterprise. On Free there is no editor.

In the editor you set "Name" and "Description". You can limit "Categories", "Fields", and "Functions": "Move to archive", "Add to favorites", "Create capsules", "Copy record". Scope: "All", "Selected", "All except".

"Date/Time" limits when the profile applies: "All time", selected days, or a repeat by time, week, or month.

For items, view, create, edit, and delete are available. "Own" refers to items this member created.

A new profile starts with full view and without the right to create, edit, or delete items. Deleting a profile removes access to vaults where it was assigned.

On a new shared vault, the owner, admin, and creator get "Extended". Everyone else starts at "No access". The creator cannot leave themselves without access.

## Members

Invitations and member access to vaults. On Free you cannot invite additional members. On Enterprise an invitation is available.

To get Enterprise, contact the Okkey team. See [Plans](../plans).

On self-hosted, an owner has one workspace on Enterprise too.

### How to invite

1. Click "Invite".
2. Enter an email and a role. The default role is "User". "Owner" is not in the list.
3. "Send invitations". The member receives an email with a link.

The profile and vaults are not chosen in this window. Vault access is set later on the "Member card" or in the vault settings.

The link lasts 14 days. You can send at most 50 addresses at once. A duplicate email of a member or of an invitation already sent is rejected.

On the "Workspace invitation" page, unlock the vault and click "Continue".

### Member card

Here you change the role and the profile on each shared vault. The owner's role and vault access are locked. A member can be removed, and an invitation can be revoked. The owner cannot be removed.

To save vault access, the vault must be open.

## Vaults

The personal vault and shared vaults. Learn more about how a vault stores items in [Vaults](../vaults).

### Personal vault

One per workspace. Only you can see it. You cannot grant access to it or delete it.

On Free, "Edit vault" changes the icon, name, and description.

### Shared vaults

Available on Enterprise. On Free this section is absent.

"Create" opens a shared vault: icon, name, description, and member access. On create, the owner, admin, and creator get the "Extended" profile. Everyone else gets "No access".

Deleting a shared vault also deletes the items in it. While the vault is locked, the vault cannot be saved.

## Next steps

- [Vaults](../vaults)
- [Capsules](../capsules)
- [Plans](../plans)
- [Items](../items)
