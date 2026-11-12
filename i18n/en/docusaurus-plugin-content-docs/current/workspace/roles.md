---
title: Roles
sidebar_position: 3
plans: [free, enterprise]
---

# Roles

A role grants access to workspace settings sections. Access to items is set in [profiles](./profiles.md).

The section text is: "Roles control access to workspace settings sections and their functional areas."

Built-in roles cannot be changed or deleted. The list subtitle is "Built-in roles cannot be changed or deleted".

| Role | List text | Access |
| --- | --- | --- |
| "Owner" | "Has unique permissions" | Full access to settings. The owner cannot be invited, given another role, or removed from members. |
| "Admin" | "Has full permissions" | The same settings sections as the owner. |
| "User" | "No access to workspace settings" | Workspace settings are closed. Items are still decided by the vault profile. |

Rows in the permissions table: "General", "Items", "Capsules", "Roles", "Profiles", "Members", "Vaults", "Billing". "Billing & invoices" is not in the settings menu. The "Billing" row belongs to the same matrix. There is no separate menu item for this row: the same "Billing" permission controls access to "Change plan".

Access level: "All" applies to every object, "Own" only to objects this member created, "None" means no permission. Creating is turned on separately: it is not the "All" or "Own" level. If you turn view off, the other actions for that section turn off too.

## Custom roles

"Custom roles" exist on Enterprise. "Create" opens "Create role".

On Free, instead of the editor, the "Custom roles" block has the subtitle "Fully customizable roles" and this note:

"This feature is not available on your plan. Change your plan to unlock Custom roles."

The link "Change your plan" opens the "Change plan" section.

The editor sets "Name" and "Description". A new role starts with no permissions. Deleting a custom role moves its members and their invitations to the "User" role. A built-in role cannot be deleted.

## How to check

1. On Free you see the three built-in roles and the note about custom roles. There is no "Create" button.
2. Sign in as a member with the "User" role. "Settings" is closed for them.
3. On Enterprise, create a role with no permissions and assign it with an invitation. The member cannot open settings until view is turned on for the section.
4. Delete that role. Members who had it are now on the "User" role.

## Next steps

- [Profiles](./profiles.md)
- [Members](./members.md)
- [Plans](../plans.md)
