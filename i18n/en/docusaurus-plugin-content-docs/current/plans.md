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

- **Self-hosted.** The open build defaults to `self_hosted` and plan `FREE`, one workspace per owner. Paid flags on self-hosted turn on when the modules are loaded and a `plan_tier` is stored. On the badge that channel is `enterprise`. Intermediate `PREMIUM` / `FAMILY` / `TEAM` are not sold as self-hosted cards. The matrix still understands them if the tier is already stored. How to turn the modules on is in [install](./install/self-hosted#enterprise-modules).
- **Cloud.** The SaaS catalog is Free, Premium (badge: Pro), Family, Team, Enterprise. Cards and the plan-change request come from `@okkey-enterprise/workspace-plan`. There is no automatic payment. `TEAM` and `ENTERPRISE` share the same feature flags. They differ in the quotas below, and the Enterprise card is the one that includes the line “Приоритетная поддержка” (priority support). The repository does not add a support queue; that line is card copy.

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

`ENTERPRISE_MODULES` and plan tier `ENTERPRISE` are different. While the modules are off, the API serves only built-in roles and profiles. With `ENTERPRISE_MODULES=true`, registering a new workspace sets `plan_tier` to `ENTERPRISE`. An additional SaaS workspace (`POST /workspaces`) is created as `FREE`.

Requests only move up: `FREE < PREMIUM < FAMILY < TEAM < ENTERPRISE`. A downgrade is rejected.

The cloud “Change plan” screen hides the Free card. The “Personal” tab shows Premium and Family. The “Business” tab shows Team and Enterprise. The current-plan button is inactive; its module string is “Ваш тариф”. A lower plan shows “Переход невозможен”. A higher plan shows “Подключить”. The button is active when the role has PUT on the Billing resource.

Prices in the module strings, in rubles:

| Card | Month | Year |
| --- | --- | --- |
| Premium | “₽125 / мес” | “₽1500 / год” |
| Family | “₽299 / мес” | “₽3588 / год” |
| Team | “₽299 / участник” | “₽3588 / год” |
| Enterprise | “₽499 / участник” | “₽5988 / год” |

Under the yearly price the footnote is “*Оплачивается раз в год” (billed once a year). The yearly amount equals 12 months. The strings do not include a discount.

Card lines that match the matrix and the quotas:

- Premium: files in items, 5 GB of personal attachment storage, sharing through capsules, a workspace security report, leak monitoring, emergency access.
- Family: everything in Premium, plus up to 6 people (the owner and up to 5 additional members).
- Team: the full product, up to 50 shared vaults, 100 GB of storage, custom roles, custom profiles. The card hint for members is the owner plus up to 25 additional members.
- Enterprise: the same header, then unlimited members, unlimited shared vaults, unlimited storage, and priority support.

“Подключить” opens “Сменить тариф”: “Автоматической оплаты пока нет — заявка уходит в команду Okkey, мы свяжемся с вами.” Fields: plan (higher tiers only), “Регион проживания”, “Email для связи” (“Contact email”), “Отправить”, “Отмена”. Success: “Request sent” (“Заявка отправлена”). `POST /workspaces/:id/plan-change-requests` does not change `plan_tier`. It emails the sales address the operator configures. There is no payment provider and no payment history in the repository.

On self-hosted Free the core form “License request” stays. On any other tier with the modules on, the screen shows “Лицензия активна” and that the workspace already has that plan. If `VITE_OKKEY_LICENSE_EXPIRES_AT` is set, the date is appended. A license validator is not implemented in the repository; the architecture note describes it as future work.
