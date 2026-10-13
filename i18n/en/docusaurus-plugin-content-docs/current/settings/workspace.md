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
| Delete | “Danger zone”, “Delete workspace” | Text: “This irreversible action will delete all vaults and items in this workspace. The workspace cannot be restored.” Button “Delete”. `workspace-tenancy` draws the block only in SaaS (`VITE_DEPLOYMENT_MODE=saas`) and only for the owner (`ownerId`). An admin does not see it. Self-hosted does not draw the overlay. Popup “Delete workspace?”: the name can be copied, field “Workspace name”, button “Delete workspace” turns on when the typed name matches after trimming spaces. Before the request the Deletion zone asks again for the master password, PIN, or biometrics. Toasts: “Deleting workspace…”, “Workspace deleted”, “Failed to delete workspace”. The server accepts deletion only from the owner and only when the name in the request matches. DELETE on General does not replace that check. |

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

“Custom roles” — “Fully customizable roles”, button “Create”. Flag `customWorkspaceRoles` from Family (cloud: family, team, enterprise) and the `workspace-roles` plugin. On Free and Pro, CRUD is replaced by a “Note”: “This feature is not available on your plan.” and “Change your plan”. Without the plugin only that note remains.

Popup “Create role” / “Edit role”. A built-in role opens read-only: “Built-in role”. Fields: “Name”, “Description”. “Save” and “Cancel”. Delete: menu “Role actions”, “Delete role”, popup “Delete role”. Text: “This role will be permanently removed. Members with this role will automatically be moved to the standard User role.” Button “Delete”. Built-ins: “Built-in roles cannot be changed or deleted”.

Who sees Create and Delete is the Roles resource: POST creates, DELETE deletes. “Own” on PUT and DELETE covers only objects that member created. A new role starts with every cell “None”, not as a copy of Admin.

“Permissions” columns: “Name”, `GET`, `POST`, `PUT`, `DELETE`.

| Row | Cell |
| --- | --- |
| “General”, nested “Items” and “Capsules” | A checkbox only in GET and PUT. POST and DELETE are empty. |
| “Roles”, “Profiles”, “Members”, “Vaults” | GET, PUT, DELETE are a select. POST is a checkbox. |
| “Billing” | Same as General: GET and PUT only. |

Select levels: “All” — “Applies to all objects”; “Own” — “Only for objects created by the member”; “None” — “No permission”. POST is a checkbox: on means allowed, off means none.

The editor keeps these links itself: GET “None” clears the row; GET “Own” turns POST on and will not let you clear it, and PUT and DELETE are then only “Own” or “None”; GET “All” without POST removes “Own” from PUT and DELETE; turning POST on raises empty GET/PUT/DELETE to “Own”; clearing GET on General, Items, Capsules, and Billing clears PUT. While Billing GET is off, PUT is unavailable. Billing PUT is what sends a plan-change request.

Seed matrix, not the card subtitle: Owner and Admin have every field = 1 on every resource. User has every field = 0. Outside the table: the owner cannot be invited, their role cannot be changed, and they cannot be removed from members. Only the owner can delete the workspace.

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

Custom profiles need `customWorkspaceProfiles` from Family and the `workspace-profiles` plugin. Otherwise the same note and link, to open “Custom profiles”.

“Custom profiles” — “Fully customizable profiles”, “Create”. Popup “Create profile” / “Edit profile”. A built-in opens read-only: “Built-in profile”. Fields: “Name”, “Description”. “Save”, “Cancel”. Delete: “Delete profile”. Text: “This profile will be permanently removed. All workspace members will lose access to vaults with this profile.”

A new custom profile is not a copy of Simple and not a copy of Extended. Start: categories, fields, and functions scoped to “All”, date “All time”, records GET “All”, POST off, PUT and DELETE “None”.

Editor block “Permissions”. Restrictions apply to viewing. If POST is on, creating a record allows every category and field.

| Block | Scope |
| --- | --- |
| “Categories”, “Fields”, “Functions” | “All”, “Selected”, “All except” |
| “Date/Time” | “All time”, “Days”, “Repeat, time” (“Start time”, “End time”), “Repeat, month”, “Repeat, week” (Monday–Sunday) |
| “Records” | Columns `GET`, `POST`, `PUT`, `DELETE`. GET is “All” or “Own”. POST is a checkbox. PUT and DELETE are “All” / “Own” / “None”, with the same links as roles. |

Functions: “Move to archive”, “Add to favorites”, “Create capsules”, “Copy record”.

Extended seed: categories, fields, and functions are “All” (all four actions), date “All time”, records GET/PUT/DELETE “All”, POST on. On a new shared vault the owner and admin get this profile, and their select is locked. The vault creator also gets Extended and cannot set “No access” for themselves.

Simple seed: categories and fields are “All”, functions are “Selected”: favorites, capsules, copy. “Move to archive” is not included. Date “All time”. Records: GET “All”, POST off, PUT and DELETE “None”. Other members start at “No access” when the vault is created. Simple is assigned in the profile select.

## Members

“Members”. Text: “You can invite as many members as you need, assign roles, and manage access to vaults and items.”

On Free and Pro there are no extra seats (`maxAdditionalMembers` is 0, `additionalWorkspaceMembers` is off). In the open build the invite section is a stub and an upsell is shown instead. An invite link without the plugin opens an unavailable-invite page.

Catalog limits: Family — 5 additional members, Team — 25, Enterprise — unlimited. The invite UI is the `workspace-members` plugin.

Button “Invite”. Popup “Invite members”. Subtitle: “New members will receive an email with a link to join the workspace”. A row has only a number, an email (“Enter member email…”), and a role. The default role is “User”. Owner is not in the list, and the server rejects an invitation with that role. Custom roles appear in the select when they exist. “Add more”. The last row cannot be removed (“Remove row”). Submit: “Send invitations (…)”. Rows count when the email contains `@` and a role is selected. Toasts: “Sending invitations…”, “Invitations sent”.

The invite popup has no profile and no vaults. Vault access is set later, on the “Member card” or in the vault popup. An unconfirmed person can be given a vault profile in advance: badge “Unconfirmed”.

The link lasts 14 days. After that: “This invitation has expired.” Other states: “This invitation was revoked.”, “This invitation was already accepted.”, “This invitation was sent to a different email address.”, “This invitation link is invalid.”, “Workspace invitations are not available in this build.” Page title: “Workspace invitation”. To join: “Unlock your vault to join this workspace.”, “Unlock vault”, then “Continue”. One request accepts at most 50 addresses. The server rejects an email that is already a member or already has a pending invitation.

“Member card”: “Role” (the owner’s select is locked), “Manage roles”, “Invitation”, “Role change”, “Join date”, “Last login” — “just now”, “today”, “yesterday”, “N day(s)”. “Vaults and profiles”, search “Search…”, “With access” / “No access”. Empty: “No shared vaults”. Each vault has a profile select or “No access”. The owner’s vault select is locked. Delete: “Delete member” / “Delete invitation” (“Revoke”). The owner cannot be deleted. Member text: “The member will lose access to this workspace. This action cannot be undone.” Invitation: “The invitation will be revoked. The person will no longer be able to join via this link.”

Saving a vault: “Unlock your vault to save changes”. Missing keys: “Member is missing encryption keys”.

On self-hosted the owner still has one workspace, even when the plan is Enterprise and members are allowed.

## Vaults

“Vaults”. Text: “Here you can create as many vaults as you need with different access levels for workspace members.”

“Personal vault” — “Your personal vault in this workspace”, “Available only to you”. One personal vault per workspace. The edit popup is `workspace-shared-vaults`, title “Edit vault”, badge “Personal vault”. Fields: “Icon” (default 🏠, the emoji grid from `@okkey/ui`), “Name”, “Description”. If the vault has no description, the field is filled with “Your personal vault in this workspace”. “Vault access” has no member list: “Only you can see this personal vault. Other workspace members cannot open it, view its contents, or obtain an access key.” The popup cannot grant access or delete the personal vault. “Save”, “Cancel”.

“Shared vaults” — “Vaults with shared access for workspace members”, button “Create”. Flag `sharedVaults` from Family. Catalog quotas: Pro 0, Family 5, Team 50, Enterprise unlimited. Without the plugin the section is absent. Who may create and delete is the Vaults resource (POST / DELETE). Create: “Create vault”, badge “Shared vault”. The same icon (default 💼), name, and description. The description starts empty. “Vault access”: search “Search...”, filters “All (…)”, “With access”, “No access”, and each profile by name. Empty search: “No members found”. The select is “No access” or a profile name. On create, the owner, admin, and creator get “Extended”, the owner and admin selects are locked, and everyone else is “No access”. The creator cannot choose “No access” for themselves. Deleting a shared vault, when DELETE is allowed: “Delete vault?”, “The vault and all items inside it will be deleted. This cannot be undone.” Saving wraps the vault key to the recipients on the client. While the vault is locked, it cannot be saved. More in [Vaults](../vaults).

## Change plan

Item “Change plan”.

The open build shows “Free plan” and the self-hosted Free capability lines from the UI: “Unlimited items”, “Text items only”, “Personal vault only”, “Item categories”, “TOTP, import, export”. Below that, “License request”: “Leave your contact details — the Okkey team will get in touch about a self-hosted license.” Button “Send a request”, form field “Contact email”, submit “Send”. Success: “Request sent”. If the tier is already not Free, the text says: “Managing a self-hosted license requires the Okkey enterprise build.”

SaaS cards come from `@okkey-enterprise/workspace-plan`. Prices, the Personal and Business tabs, the buttons “Ваш тариф”, “Переход невозможен”, “Подключить”, and the request popup with no payment are on [Plans](../plans). `POST /workspaces/:id/plan-change-requests` does not change `plan_tier`.

A change only moves up `FREE < PREMIUM < FAMILY < TEAM < ENTERPRISE`. With the modules on and a tier other than Free, the self-hosted screen shows “Лицензия активна”. The end date comes from `VITE_OKKEY_LICENSE_EXPIRES_AT` when that variable is set.

## Billing & invoices

“Billing & invoices” is in the section catalog and in the role matrix as the Billing resource. `WORKSPACE_SETTINGS_HIDDEN_SECTIONS` hides it and the route redirects away. The enterprise module does not add an invoices page. There is no invoice list, payment method, or payment history in the code. What exists instead is “Change plan” on the same Billing resource, and the request described above. In the role editor, Billing has checkboxes only for GET and PUT.
