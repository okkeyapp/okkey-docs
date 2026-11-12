---
title: Self-hosted install
sidebar_position: 1
plans: [free, enterprise]
---

# Self-hosted install

Self-hosted puts Okkey on your machine. Encryption stays on your device, so vault contents cannot be read from the server.

This is a beta. There has been no independent security audit yet.

An install you do yourself runs on Free. An Okkey employee turns on Enterprise. What each plan includes is on [Plans](../plans.md).

Only Docker Compose is supported. Kubernetes and Helm are planned and are not part of v1.0.0.

## Which to choose

| Option | When it fits |
| --- | --- |
| Free | You install Okkey yourself. Capsules, files in items, one shared vault, and 10 additional members are included. |
| Enterprise | You need Monitoring, custom roles and profiles, shared vaults and members with no limit, advanced capsules, and advanced recovery. Contact the Okkey team. See [Enterprise](./enterprise.md). |

Both options run on your machine. The comparison is on [Plans](../plans.md).

## Where to start

1. Check the [requirements](./requirements.md).
2. Install Okkey using the [install steps](./free.md).
3. If the site must open from other machines by name, set up a [domain and TLS](./domain-tls.md).
4. For mail and invites, set up [email](./email.md).
5. Create the first account in [first-time setup](../getting-started/first-setup.md).

Data copies, upgrades, and a return to a previous copy are in [Administration](../admin/index.md).

## How to check

After install, the web app opens at the address the installer prints. On the same machine, `http://127.0.0.1:4000/health` answers with `"status": "ok"`. The commands are on [Install steps](./free.md).

## Next steps

- [Requirements](./requirements.md)
- [Install steps](./free.md)
- [Domain and TLS](./domain-tls.md)
- [Email](./email.md)
- [Enterprise](./enterprise.md)
- [If the install stops](./troubleshooting.md)
- [Administration](../admin/index.md)
- [Plans](../plans.md)
