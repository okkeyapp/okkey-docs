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

A license key and a license portal are planned. They are not available now: an Okkey employee turns the plan on.

## Updates

Okkey images are updated the same way as on Free. The steps are on [Upgrade](../admin/upgrade.md).

The owner may see "Update available" and the window "System update". The window has separate lines "Okkey" and "Enterprise". Nothing is installed until you choose "Update". Only the owner can apply an update. If no feed is configured, the window says: "No feed is configured. You can still apply a package file." A package with no signature, or with an invalid signature, is not applied. If the apply fails, the instance stays on the previous version.

## When the license ends

Nothing is moved to Free. Your data stays available. Enterprise features stop receiving updates. You cannot create new objects in those features or change existing ones. You can still delete.

The same text is on [Plans](../plans.md#when-the-enterprise-license-ends).

## How to check

While the plan is Free, the sidebar has no "Monitoring", and Change plan shows the "Enterprise" card and "Send a request". After the plan is turned on, the block title is "Current plan: Enterprise".

## Next steps

- [Plans](../plans.md)
- [Change plan](../workspace/plan.md)
- [Install steps](./free.md)
- [Upgrade](../admin/upgrade.md)
- [Monitoring](../monitoring.md)
