---
title: Enterprise
sidebar_position: 6
plans: [free, enterprise]
---

# Enterprise

Enterprise is self-hosted Okkey with a larger set of features. You install it yourself, using [Install steps](./free.md). An Okkey employee turns the plan on after that.

This is a beta. There has been no independent security audit yet.

## What the plan adds

The numbers and the full list are on [Plans](../plans.md). In short, Enterprise differs from Free like this:

| Feature | Enterprise |
| --- | --- |
| Additional members | no limit |
| Shared vaults | no limit |
| Monitoring | yes |
| Custom roles and profiles | yes |
| Trusted devices and trusted contacts | yes |
| Advanced capsule settings: expiry, password and attempt limit, members-only access, owner approval | yes |

Capsules, files in items, built-in roles and profiles, the recovery key, the generator, import, and export are also on Free. Self-hosted has no storage ceiling on Free already.

The card in Change plan lists "Unlimited storage" among its lines. Compare features with the table on [Plans](../plans.md).

## How to request it

1. Open "Settings", "Change plan". "Send a request" opens "License request". The window says: "The Okkey team will get in touch about a self-hosted license."
2. Fill in "Reply email" and "Number of workspace members". Choose "Send".

The message goes to `OKKEY_SALES_EMAIL` from `.env`. You set that address during [install](./free.md). Okkey accepts at most 3 requests from one workspace in a rolling 24 hours. The error texts are on [Change plan](../workspace/plan.md).

## License file

An Okkey employee turns on Enterprise. They issue a license file for your server: the workspace owner copies the instance fingerprint in "Settings", "Change plan" and sends it to the Okkey team.

Only the workspace owner uploads the file, in the same "Change plan" section. The check runs on your server; day-to-day work does not need a constant connection to the license portal.

"Public app URL" (set on the "Server" step of the first-run wizard or in "Settings", "Mail", the same value as `PUBLIC_APP_URL`) must match the address the license was issued for. A license is not issued or accepted for `localhost`.

Renewal is a new file, uploaded again by the owner. For the last 30 days before expiry, a reminder appears in the plan section. The 30, 7, and 1 day reminder emails go to the owner only when SMTP is set through the environment variables `EMAIL_SMTP_HOST` and `EMAIL_FROM`. Mail settings from the setup wizard or from Settings, Mail are not used for these emails yet. Without that SMTP in the environment, only the in-app reminder remains.

Enterprise features are enabled only after the owner uploads a valid license file. Without a file, or if the file is not accepted, these features stay off. When an Okkey employee has already connected the plan, the owner sees the instance fingerprint in Change plan and can upload a file even if there is no license yet.

Screen details are on [Change plan](../workspace/plan.md).

## Updates

Okkey images are updated the same way as on Free. The steps are on [Upgrade](../admin/upgrade.md). Update Enterprise with [Compose](../admin/upgrade.md#steps) or with an offline package issued to Enterprise customers with the Enterprise release. For a closed network, see [isolated mode](../admin/upgrade.md#isolated-mode).

Anyone who is signed in sees the version at the bottom of the sidebar. "System update" opens from it. The "Enterprise" row is present when the module is installed: the window shows the version and a short SHA when the install reports one. Details for the window and the core feed are on [Upgrade](../admin/upgrade.md#the-window-in-the-app).

## When the license ends

The workspace moves to the Free plan. Your data stays available. Shared vaults and members work within the Free plan limits: one shared vault and up to 10 additional members. Enterprise features (advanced capsule settings, custom roles and profiles, trusted devices and contacts, monitoring) stop receiving updates. You cannot create or change Enterprise features; you can still view and delete what is already there.

The same text is on [Plans](../plans.md#when-the-enterprise-license-ends).

## How to check

Three screens in Change plan:

1. Free-only install: the "Enterprise" card and "Send a request"; no "Monitoring" in the sidebar.
2. An Okkey employee has already connected Enterprise, but there is no valid license file yet (or the file was rejected / expired): the owner sees the instance fingerprint and can upload a file; Enterprise features stay off.
3. A valid license file is uploaded: the title is "Current plan: Enterprise", and Enterprise features are on.

## Next steps

- [Plans](../plans.md)
- [Change plan](../workspace/plan.md)
- [Install steps](./free.md)
- [Upgrade](../admin/upgrade.md)
- [Monitoring](../monitoring.md)
