---
title: Workspace settings
sidebar_position: 4
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Workspace settings

Sidebar item “Settings”. The page opens on “General”. Nested “Items” and “Capsules” sit under “General” and use the same permission as the general section.

Who can see a section is decided by the role. The role matrix resources are “General”, “Items”, “Capsules”, “Roles”, “Profiles”, “Members”, “Vaults”, “Billing”. A role does not grant access to items. Profiles do.

## General

| Setting | Label | Behavior |
| --- | --- | --- |
| Name | “Workspace name” | The workspace name. |
| Logo | “Upload logo”, “Remove logo” | The logo file is stored in the personal vault. If there is no personal vault: “Logo upload is unavailable: personal vault not found.” Errors: “Failed to upload logo.”, “Failed to remove logo.” |
| Tile color | “Change color”, “Custom color” | A preset of 10 colors (`#171717`, `#3b82f6`, `#06b6d4`, `#059669`, `#f97316`, `#db2777`, `#7c3aed`, `#ef4444`, `#eab308`, `#14b8a6`) or a custom 3- or 6-digit hex. |
| Delete | “Danger zone”, “Delete workspace” | The text says deletion is irreversible and removes vaults and items. Button “Delete”. In the open build the block is drawn by the tenancy module; the stub does not show it. **TODO:** the confirmation flow and who besides the owner can delete a workspace were not verified in Enterprise. |

## Items

Section title “Items”. Text: “Configure how securely items can be used in this workspace: deleted-item retention and file upload limits.”

| Setting | Label | Values |
| --- | --- | --- |
| Retention | “Deleted items retention”. “After this period, deleted items are permanently removed from the server”. | 1, 3, 7, 14, 30 days. Labels: “1 day”, “3 days”, “7 days”, “14 days”, “30 days”. If the database already stores another number, it is added to the list. |
| Files | “Allow files in items”. “Enable this setting if you want to upload files in items”. | Flag `filesInItems`. Off on Free by the matrix. On from Pro upward. The “Secure files” category and the “File” field type appear only when the setting is on. |
| Formats | “Allowed upload file formats”. “Specify file extensions or leave the field empty”. Placeholder `jpg, png, pdf…`. | The UI string does not say that an empty list forbids formats. **TODO:** how an empty list is enforced by the API when a file is saved. |
| Size | “Maximum file size”. “Maximum file size in an item from 1 to 1024 MB”. | A number of megabytes in that range. |

ZIP import uses the same limits: the archive may be large, and each attachment is cut by the workspace limit when it is saved into the vault.

## Capsules

Section “Capsules”. Text: “Configure how securely capsules can be used in this workspace: who may create them and which limits are required.”

Capsules themselves exist on Free. The policies below force the creator to turn access settings on. On Free, capsule create does not let you turn those settings on (flag `capsuleAccessSettings`). Set the policies on Pro and above in cloud, and on self-hosted enterprise.

| Setting | Label | Values |
| --- | --- | --- |
| Who may create | “Allow capsules”. “Who in the workspace can create and manage capsules”. | “Nobody”, “Everyone”, “Selected”, “Everyone except”. For a selection: “Select members”, search “Search members”. |
| Views | “Limit views”. “Always limit views with no way to turn this off. 0 — no limit”. | A number. Greater than zero forces the capsule “Views” block on. |
| Time | “Require time-based deactivation”. “Time deactivation becomes required, the Never option is unavailable”. | Switch. |
| Access | “Require access settings”. “Access is always on and cannot be turned off”. | Switch. |
| Audience | “User access”. “Who can be granted access to a capsule”. | “Anyone”, “Members only”. |
| Password | “Require password”. “Password is always on and cannot be turned off”. | Switch. |
| Attempts | “Password attempt limit”. “Fixes the failed password attempt limit. 0 — no forced limit”. | A number. |
| Approval | “Require approval”. “Owner approval is always on and cannot be turned off”. | Switch. |

How these switches look to the link recipient is in [Capsules](../capsules).

## Roles

“Roles”. Text: “Roles control access to workspace settings sections and their functional areas.”

“Built-in roles”, subtitle “Built-in roles cannot be changed or deleted”:

| Role | UI description |
| --- | --- |
| “Owner” | “Has unique permissions” |
| “Admin” | “Has full permissions” |
| “User” | “No access to workspace settings” |

The “Permissions” table has a “Name” column and the resources “General”, “Items”, “Capsules”, “Roles”, “Profiles”, “Members”, “Vaults”, “Billing”. The text above the table points at profiles: item access is set there.

“Custom roles” — “Fully customizable roles”, button “Create”. The card has “Name” and “Description”. On Free (and on Pro, which lacks `customWorkspaceRoles`) CRUD is replaced by a “Note”: the feature is not available on your plan, with a link to change the plan and unlock “Custom roles”. Even on Family and above, the create section comes from the `workspace-roles` plugin. Without the plugin only the upsell remains. **TODO:** the custom-role card fields and the cell levels (view, edit) were not verified in Enterprise. Core has the resource labels, not the editor screens.

The built-in role card is also opened by the plugin, and only when `customWorkspaceRoles` is on.

## Profiles

“Profiles”. Text: “Profiles distribute access to vault records, record fields, and record functionality.”

“Built-in profiles”, “Built-in profiles cannot be changed or deleted”:

| Profile | Description |
| --- | --- |
| “Extended” | “Automatically applied to owners and admins” |
| “Simple” | “Permission to read records, favorites, capsules, and copy records” |

Restrictions core labels for the profile editor (the editor itself is a plugin; on Free it is absent):

- “Categories” — allow or limit categories.
- “Fields” — the same for fields.
- “Functions” — “Move to archive”, “Add to favorites”, “Create capsules”, “Copy record”.
- “Date/Time” — “All time”, “Days”, “Repeat, time”.
- “Items” — rights on item operations.

Scope: “All”, “Selected”, “All except”. The code comment says restrictions apply to viewing. If POST is on, creating an item allows every category and field.

Custom profiles need `customWorkspaceProfiles` (Family and above) and the `workspace-profiles` plugin. Otherwise an upsell, same shape as roles. **TODO:** the exact function-by-function contents of “Simple” and “Extended” are not duplicated here beyond the UI subtitles.

## Members

“Members”. Text: “You can invite as many members as you need, assign roles, and manage access to vaults and items.”

On Free and Pro there are no extra seats (`maxAdditionalMembers` is 0, `additionalWorkspaceMembers` is off). In the open build the invite section is a stub and an upsell is shown instead. An invite link without the plugin opens an unavailable-invite page.

On Family the limit is 5 additional members, on Team 25, on Enterprise unlimited. The invite UI, accept `POST /invitations/:token/accept`, and the link preview live in the `workspace-members` plugin. **TODO:** invite fields (role, profile, vaults) were not reviewed in the private code. Core can still list members.

On self-hosted the owner still has one workspace, even when the plan is Enterprise and members are allowed.

## Vaults

“Vaults”. Text: “Here you can create as many vaults as you need with different access levels for workspace members.”

“Personal vault” — “Your personal vault in this workspace”, “Available only to you”. One personal vault per workspace. The default name is set when the workspace is created. The personal-vault metadata popup is not wired in the open build (the popup is the `workspace-shared-vaults` plugin). **TODO:** which fields that popup exposes when the module is present.

“Shared vaults” — “Vaults with shared access for workspace members”, button “Create”. Flag `sharedVaults` from Family. Quotas: Pro 0, Family 5, Team 50, Enterprise unlimited. Create, delete, and sharing are the plugin; key wrap and rotate stay in core. Without the plugin there is no shared-vault section. What a vault is for is in [Vaults](../vaults).

## Change plan

Item “Change plan”.

The open build shows “Free plan” and the self-hosted Free capability lines from the UI: “Unlimited items”, “Text items only”, “Personal vault only”, “Item categories”, “TOTP, import, export”. Below that, “License request”: “Leave your contact details — the Okkey team will get in touch about a self-hosted license.” Button “Send a request”, form field “Contact email”, submit “Send”. Success: “Request sent”. If the tier is already not Free, the text says: “Managing a self-hosted license requires the Okkey enterprise build.”

SaaS plan cards come from `workspace-plan`. **TODO:** prices, billing period, and how the Team and Enterprise cards differ in the cloud UI are not described here.

A plan change in core only moves up the ladder `FREE < PREMIUM < FAMILY < TEAM < ENTERPRISE`.

## Billing & invoices

“Billing & invoices” is in the section list and in the `billing` permission, but `WORKSPACE_SETTINGS_HIDDEN_SECTIONS` hides it and routes redirect away. **TODO:** invoices and the payment method are not shown in open core and were not checked in `okkey-enterprise`.
