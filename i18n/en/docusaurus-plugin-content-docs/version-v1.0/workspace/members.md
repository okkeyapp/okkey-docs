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

Click "Invite". The window "Invite members" opens. At the top are the "Email" and "Invite link" tabs. In one form every invitation is either by email or by link. The profile and vaults are not chosen in this window. Vault access is set later on the "Member card" or in the vault settings.

### By email

The subtitle is: "New members will receive an email with a link to join the workspace".

1. In the row, enter an email ("Enter member email…") and a role. The default role is "User". "Owner" is not in the list. Another address is added with "Add more". An extra row is removed with "Remove row".
2. Click "Send invitations (N)". While the mail is going out, you see "Sending invitations…". When mail is active, success is "Invitations sent".

While mail is inactive, the invitation is saved with the status "Pending delivery". Above the form on the "Email" tab, a notice says: "Mail is not configured. Invitations will be sent when mail is working. You can still create invite links." The notice links to "Configure mail". The toast on save is "Invitations saved; emails will go out after mail is configured". After a successful test message, pending invitations that have not expired are sent on their own. The invitation list has "Resend" and "Copy invite link", so you can pass the link yourself. The link gives access to accepting the invitation. Pass it only to the recipient, in person. How to turn mail on is on [Email](../install/email.md).

### By link

The subtitle is: "Create invite links to share without sending email. Each link expires and can be used once."

1. On the "Invite link" tab each row has only a role. The default is "User". "Owner" is not in the list. Another row is added with "Add more". An extra row is removed with "Remove row".
2. Click "Create invite links (N)". While the links are created, you see "Creating invite links…".
3. A single link is copied to the clipboard right away. Several links show as a numbered list: role and link, each with "Copy invite link". The results subtitle is: "Copy each invite link and share it securely. Links expire and are single-use." The button is "Done".

In the members list a link invitation is labelled "Invite link". "Copy invite link" and "Delete invitation" remain; "Resend" is not shown.

:::warning
The link lets anyone who has it join with the chosen role. Share it only with the person you invite.
:::

Any signed-in user with the link can accept it - the email is not matched. A revoked, expired, or used link stops working. Copying again with "Copy invite link" creates a new link, and the previous one stops working.

Invite by link does not need mail. The link is built from the public app URL set in "Mail" (or `PUBLIC_APP_URL`). Without it the invitation cannot be created.

If the person has no account on this server yet, registration still needs the code from the email. While server mail is not active, the server administrator can find the code in the worker logs.

The link lasts 14 days and is single-use. You can create at most 50 at once. A link invitation takes a seat the same way as an email invitation: a live invitation with status "Unconfirmed" counts toward the Free cap.

On the "Workspace invitation" page, unlock the vault ("Unlock vault") and click "Continue".

## Member card {#member-card}

Open the member's row. The window title is "Member card".

Here you see "Role" and the block "Vaults and profiles". Vault search: "Search…". If there are no shared vaults, the text is "No shared vaults".

The owner's role and vault access are locked. A member can be removed ("Delete member?"), and an invitation can be revoked ("Delete invitation?", button "Delete invitation"). The owner cannot be removed. An invitation that has not been accepted is marked "Unconfirmed".

To save vault access, the vault must be open. Otherwise the window shows "Unlock your vault to save changes".

## How to check

1. On Free the section has an "Invite" button, not a note that members are missing from the plan.
2. Send an invitation to a new address with the role "User". When mail is active, the "Additional members" list shows a row with the "Unconfirmed" badge. When mail is inactive, the status is "Pending delivery".
3. Create a link on the "Invite link" tab, open it in another browser, and join.
4. The eleventh live invitation, or the eleventh member beyond the owner, does not save.
5. On the owner's card the role does not change, and there is no button to remove the owner.

## Next steps

- [Roles](./roles.md)
- [Profiles](./profiles.md)
- [Vaults](./vaults.md)
