---
title: Plans
sidebar_position: 2
plans: [free, enterprise]
---

# Plans

Self-hosted Okkey has two plans. The plan decides what you can do in a workspace: invite people, share vaults, and turn on extra recovery.

A new workspace gets its plan when you register. An existing Free workspace moves to Enterprise separately, on request.

## How the plan is chosen

The modules switch is an environment variable. The rest of these docs write it only this way:

- `ENTERPRISE_MODULES=false`, or the variable is unset. A new workspace is Free (`plan_tier` `FREE`).
- `ENTERPRISE_MODULES=true`. A new workspace is Enterprise (`plan_tier` `ENTERPRISE`), and the enterprise plugins load.

An unknown `plan_tier` string also becomes `FREE`.

How to set the variable during install is in the [install guide](./install/self-hosted#enterprise-modules).

On self-hosted, an owner has one workspace.

## An existing workspace

:::note
If the workspace was already created as Free, only an Okkey specialist can move it to Enterprise, and only when you ask. Contact the Okkey team and provide SSH access to the VPS where Okkey is installed.
:::

## What's included

| Capability | Free | Enterprise |
| --- | --- | --- |
| Capsules | yes | yes |
| Advanced settings | no | yes |
| Allow files in items | yes | yes |
| Monitoring | yes | yes |
| Recovery key | yes | yes |
| Trusted devices | no | yes |
| Trusted contacts | no | yes |
| Shared vaults | no | yes |
| Additional members | no | yes |
| Built-in roles ("Owner", "Admin", "User") | yes | yes |
| Custom roles | no | yes |
| Built-in profiles ("Simple", "Extended") | yes | yes |
| Custom profiles | no | yes |

## Next steps

- [Self-hosted install](./install)
- [Workspace settings](./settings/workspace)
- [Monitoring](./monitoring)
- [Capsules](./capsules)
