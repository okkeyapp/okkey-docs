---
title: Profiles
sidebar_position: 4
plans: [free, enterprise]
---

# Profiles

A profile grants access to items in a vault: which categories and fields are visible, and which actions are allowed. The section text is: "Profiles distribute access to vault records, record fields, and record functionality."

Built-in profiles cannot be changed or deleted. The subtitle is "Built-in profiles cannot be changed or deleted".

| Profile | List text | Access |
| --- | --- | --- |
| "Extended" | "Automatically applied to owners and admins" | Full access: view, create, edit, archive, and delete items. No limits on categories, fields, functions, or time. |
| "Simple" | "Permission to read records, favorites, capsules, and copy records" | View every item. Create, edit, archive, and delete are off. The functions "Add to favorites", "Create capsules", and "Copy record" are on. "Move to archive" is not included. |

On a new shared vault, the owner, admin, and creator get "Extended". Everyone else gets "No access" by default. The creator cannot leave themselves without access: "No access" is disabled on their own row. The owner and admin profile pickers in the vault are locked.

## Custom profiles

"Custom profiles" exist on Enterprise. On Free there is no editor. Instead, a note says the feature is not available, with the link "Change your plan" to unlock Custom profiles.

The editor sets "Name" and "Description". The block is "Permissions".

Limits: "Categories", "Fields", and "Functions". Scope: "All", "Selected", "All except". Functions: "Move to archive", "Add to favorites", "Create capsules", "Copy record".

"Date/Time" limits when the profile applies: "All time", "Days", "Repeat, time", "Repeat, week", "Repeat, month". Weekdays run from "Monday" to "Sunday". Time fields: "Start time" and "End time".

For items, view, create, edit, archive, and delete are available. "Own" means items this member created. Category, field, function, and time limits apply to viewing. If creating is on, a new item can use every category and field.

A new profile starts with full view and without permission to create, edit, archive, or delete items. Deleting a profile removes access to the vaults where it was assigned: that profile disappears for those members. A built-in profile cannot be deleted.

## How to check

1. On Free the list has only "Extended" and "Simple", and below them the note about custom profiles.
2. Create a shared vault. The owner and admin have "Extended", other members have "No access", and you cannot switch your own row to "No access".
3. Assign "Simple" to a member and sign in as them. An item opens, a new item and archive are unavailable, and favorite, capsule, and copy record are available.
4. On Enterprise, delete a custom profile. In vaults where it was selected, those members lose access.

## Next steps

- [Roles](./roles.md)
- [Vaults](./vaults.md)
- [Plans](../plans.md)
