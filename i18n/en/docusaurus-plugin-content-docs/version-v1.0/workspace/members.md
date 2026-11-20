---
title: Members
sidebar_position: 2
plans: [free, enterprise]
---

# Members

Invitations and member access to vaults. The settings section is titled "Workspace members".

On self-hosted Free you can invite 10 additional members, not counting the owner. Those 10 also include live invitations: status "Unconfirmed", and the link has not expired. A revoked or expired invitation does not take a seat. On Enterprise there is no cap.

On self-hosted, an owner has one workspace on Enterprise too.

To get Enterprise, contact the Okkey team. See [Plans](../plans.md).

## How to invite {#how-to-invite}

Invitations are available on Free within the quota and on Enterprise.

1. Click "Invite". The window "Invite members" opens.
2. Choose the delivery method: "Email" or "Invite link".
3. Pick a role. The default role is "User". "Owner" is not in the list. Another row is added with "Add more". An extra row is removed with "Remove row".

**Email.** In the row, enter an address ("Enter member email…"). Click "Send invitations (N)". While the mail is going out, you see "Sending invitations…". When mail is active, success is "Invitations sent". Email invitations require active server mail. How to turn mail on is on [Email](../install/email.md).

While mail is inactive, an email invitation is saved with the status "Pending delivery". Above the form, a notice says mail is not configured and the messages will go out when mail is working. The notice links to the mail settings. After a successful test message, pending invitations that have not expired are sent on their own. The invitation list has "Resend" and "Copy invite link", so you can pass the link yourself. Each press of "Copy invite link" creates a new link; the previous one, including the one from the email, stops working. The invitation expiry is not extended. "Resend" also issues a new link.

**Invite link.** The "Invite link" mode lets you invite without mail. The subtitle says you create invite links to share without sending email. Click "Create invite links (N)". Copy each link and pass it to the recipient in person.

The link gives access to accepting the invitation. Pass it only to the recipient, in person.

The profile and vaults are not chosen in this window. Vault access is set later on the "Member card" or in the vault settings.

The link lasts 14 days. You can create at most 50 invitations at once. A duplicate email of a member or of an invitation already sent is rejected. If there are no seats left, or the public app address is missing, the invitation is not saved and does not appear in the list.

On the "Workspace invitation" page, unlock the vault ("Unlock vault") and click "Continue".

## Member card {#member-card}

Open the member's row. The window title is "Member card".

Here you see "Role" and the block "Vaults and profiles". Vault search: "Search…". If there are no shared vaults, the text is "No shared vaults".

The owner's role and vault access are locked. A member can be removed ("Delete member?"), and an invitation can be revoked ("Delete invitation?", button "Delete invitation"). The owner cannot be removed. An invitation that has not been accepted is marked "Unconfirmed".

To save vault access, the vault must be open. Otherwise the window shows "Unlock your vault to save changes".

## How to check

1. On Free the section has an "Invite" button, not a note that members are missing from the plan.
2. Send an invitation to a new address with the role "User". When mail is active, the "Additional members" list shows a row with the "Unconfirmed" badge. When mail is inactive, the status is "Pending delivery".
3. In "Invite link" mode, choose "Create invite links (N)" without configuring mail. The link appears in the result and can be copied.
4. The eleventh live invitation, or the eleventh member beyond the owner, does not save.
5. On the owner's card the role does not change, and there is no button to remove the owner.

## Next steps

- [Roles](./roles.md)
- [Profiles](./profiles.md)
- [Vaults](./vaults.md)
