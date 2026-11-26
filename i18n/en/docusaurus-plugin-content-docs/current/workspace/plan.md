---
title: Change plan
sidebar_position: 6
plans: [free, enterprise]
---

# Change plan

The "Change plan" section in Settings shows the current plan and the request for Enterprise. On Free the block title is "Current plan: Free". Under it: "You have access to all basic Okkey features."

On Enterprise the section shows "Current plan: Enterprise". Under it: "You have access to all Okkey features for teams and enterprises".

Next to it is the "Enterprise" card. The text is "All available features for teams and enterprises". The card lines are "Unlimited members", "Unlimited shared vaults", "Unlimited storage", "Custom roles", "Custom profiles", and "And more....". What actually differs from Free is on [Plans](../plans.md).

The section is visible when the role allows the "Billing" row. Built-in "Owner" and "Admin" have it. "User" cannot open workspace settings. The request button works when the role allows changes on that row.

## Request to the Okkey team

1. Click "Send a request". The "License request" window opens. The text is "The Okkey team will get in touch about a self-hosted license."
2. Fill in "Reply email" and "Number of workspace members". The number is a whole number, at least 1. "Send" stays disabled until the email contains "@" and the number is set. "Cancel" closes the window.
3. Click "Send". While the request is still to be sent, the card status is "Submit a connection request". After it is sent: "Connection request submitted" and the date. The button becomes "Send again".

If mail is inactive, "Send" does not send a message from the server. The mail program opens with a prepared message to `OKKEY_SALES_EMAIL`. The card still shows the request as submitted. How to turn mail on is on [Email](../install/email.md).

Okkey accepts at most 3 requests for one workspace in a rolling 24 hours. When the limit is reached, the window closes at once and the card shows "Limit of 3 license requests in 24 hours reached. You can send again at {'{when}'} (about {'{hours}'} h)." The button stays disabled until then.

A bad email in the window shows "Enter a valid email." If sending fails: "Could not send the request. Try again later."

## License file {#license-file}

On self-hosted, only the workspace owner uploads the license file. An admin or a regular member cannot.

In "Settings", "Change plan" the owner sees "Instance fingerprint" and "Copy". Send the fingerprint to the Okkey team. When the license file is ready, in the same section choose "Upload license file" and select the file. You can also place the file on the server and set the path in `OKKEY_LICENSE_FILE`.

Verification runs on your server. Day-to-day work does not need a permanent connection to a license portal. The public app address (`PUBLIC_APP_URL`, the "Public app URL" field in Mail) must match the address in the file. Licenses are not accepted for `localhost`.

Success: "License installed." If the file does not fit (wrong server, wrong address, damaged or expired file), the upload is rejected and the plan does not change.

At 30, 7, and 1 day before expiry, a reminder appears in the plan section. If mail is configured on the server, a message goes to the owner. Renewal is a new file, uploaded again by the owner.

Until a file is installed, an Okkey employee can enable Enterprise features at install time, as before. More detail is on [Enterprise](../install/enterprise.md#license-file).

## How to check

1. Sign in as the owner on Free. Settings, Change plan shows "Current plan: Free" and the "Enterprise" card with "Send a request".
2. Sign in as a member with the "User" role. There is no "Settings" item.
3. Send a request with a working email and a member count. The card shows the sent time and "Send again".
4. Sign in as the owner. Change plan shows "Instance fingerprint", "Copy", and "Upload license file". A member with the "Admin" role cannot upload a license file.

## Next steps

- [Plans](../plans.md)
- [Members](./members.md)
- [Roles](./roles.md)
