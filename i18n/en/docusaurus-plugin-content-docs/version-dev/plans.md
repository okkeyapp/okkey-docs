---
title: Plans
sidebar_position: 2
plans: [free, enterprise]
---

# Plans

This documentation covers self-hosted installs. A workspace has two plans.

| Badge | `plan_tier` | When it is assigned |
| --- | --- | --- |
| Free | `FREE` | `ENTERPRISE_MODULES` is off. A new workspace is registered with this tier. |
| Enterprise | `ENTERPRISE` | `ENTERPRISE_MODULES=true`. A new workspace is registered with this tier. |

An unknown `plan_tier` string is normalized to `FREE`.

Features are checked with `hasPlanFeature(planTier)`. `okkey-enterprise` plugins load only when `ENTERPRISE_MODULES=true`. On a new install those line up: without modules the tier is `FREE` and there are no plugins; with modules the tier is `ENTERPRISE` and the plugins are loaded. How to turn the modules on is in the [install guide](./install/self-hosted#enterprise-modules).

On self-hosted an owner has one workspace.

## What is on

Flags from `PLAN_FEATURE_MATRIX` for `FREE` and `ENTERPRISE`.

| Capability | Free | Enterprise |
| --- | --- | --- |
| Capsules | yes | yes |
| Capsule access settings | no | yes |
| Files in items | no | yes |
| Monitoring | no | yes |
| Recovery through trusted devices | no | yes |
| Trusted contacts | no | yes |
| Shared vaults | no | yes |
| Additional members | no | yes |
| Custom roles | no | yes |
| Custom profiles | no | yes |

The recovery key (not devices and not contacts) exists on both plans. Core shows the built-in roles “Owner”, “Admin”, and “User”, and the built-in profiles “Simple” and “Extended”, by itself. Custom roles, custom profiles, invitations, shared vaults, and the recovery wizards come from the Enterprise plugins.
