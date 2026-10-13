---
title: Plans
sidebar_position: 2
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Plans

A workspace’s commercial plan is `workspace.plan_tier`. The catalog in `@okkey/types` is:

| Badge | `plan_tier` | Group in code | UI label |
| --- | --- | --- | --- |
| Free | `FREE` | personal | “Бесплатный” / Free |
| Pro | `PREMIUM` | personal | “Премиум” / Premium |
| Family | `FAMILY` | personal | “Семья” / Family |
| Team | `TEAM` | business | “Команда” / Team |
| Enterprise | `ENTERPRISE` | business | “Предприятие” / Enterprise |

There is no catalog value `pro` or `CUSTOM`. An unknown tier string normalizes to `FREE`. A selective plan is not a new tier: it is `plan_custom_override` plus `plan_feature_overrides`.

## Which channel has which plans

The badge splits channels the way core describes the product:

- **Self-hosted.** The open build defaults to `self_hosted` and plan `FREE`, one workspace per owner. Paid self-hosted capabilities turn on with a license and an Enterprise build. On the badge that channel is `enterprise`. Intermediate `PREMIUM` / `FAMILY` / `TEAM` are not described as self-serve self-hosted cards in open core.
- **Cloud.** The SaaS catalog is Free, Premium (badge: Pro), Family, Team, Enterprise. Creating multiple workspaces and the billing cards live in `okkey-enterprise`. **TODO:** checkout and any Team-versus-Enterprise difference beyond the matrix below were not verified in the private repository.

On self-hosted, “Change plan” in the open build shows “Free plan” and the form “License request”. SaaS cards come from the `workspace-plan` module; without it the self-hosted screen remains.

## Feature matrix

Source: `PLAN_FEATURE_MATRIX`. `TEAM` and `ENTERPRISE` currently share the same flags. Quotas differ.

| Capability | Free | Pro (`PREMIUM`) | Family | Team | Enterprise |
| --- | --- | --- | --- | --- | --- |
| Capsules | yes | yes | yes | yes | yes |
| Capsule access settings | no | yes | yes | yes | yes |
| Files in items | no | yes | yes | yes | yes |
| Monitoring | no | yes | yes | yes | yes |
| Account recovery (paid parts) | no | yes | yes | yes | yes |
| Trusted contacts | no | yes | yes | yes | yes |
| Storage quotas | no | yes | yes | yes | yes |
| Shared vaults | no | no | yes | yes | yes |
| Additional members | no | no | yes | yes | yes |
| Custom roles | no | no | yes | yes | yes |
| Custom profiles | no | no | yes | yes | yes |

Quotas from `PLAN_QUOTA_LIMITS` (the code comment says the numbers are product-tunable; `null` means unlimited):

| | Extra members | Shared vaults | Attachments |
| --- | --- | --- | --- |
| Free | 0 | 0 | 0 MiB |
| Pro | 0 | 0 | 5 × 1024 MiB |
| Family | 5 | 5 | 20 × 1024 MiB |
| Team | 25 | 50 | 100 × 1024 MiB |
| Enterprise | unlimited | unlimited | unlimited |

`ENTERPRISE_MODULES` (plugin loading) and plan tier `ENTERPRISE` are different. SSO, SCIM, audit, and org policies are listed in core as extensions. Their implementation is not documented here: `okkey-enterprise` was unavailable. **TODO.**
