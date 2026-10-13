---
title: Open source
sidebar_position: 5
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Open source, including encryption

The model is open core.

The public `okkey` repository contains:

- clients: web, mobile, desktop, browser extension;
- shared API, crypto, vault, sync, auth, and UI packages;
- the API and worker services;
- the Rust engine `rust/crypto-engine` and the WASM wrapper `packages/crypto`;
- self-host: Docker Compose under `deploy/docker`.

Encryption is not hidden in a closed module. Profiles v1/v2, the hybrid envelope, Argon2id, XChaCha20-Poly1305, X25519, ML-KEM-768, and Ed25519 are described and called from this repository. See [Q-Day ready](./qday) and [Protection](./security).

## The Enterprise boundary

`okkey-enterprise` is separate plugins. Core must boot with `ENTERPRISE_MODULES=false`. A plugin does not alter core tables (it only adds its own), does not bypass authentication, and does not downgrade the crypto profile.

Open core lists these extensions. Their sources were not reviewed here (**TODO**, the repository was unavailable):

- SSO / SAML / OIDC;
- SCIM and directory sync;
- audit;
- organization policies and admin reports;
- workspace create in `saas` mode (`workspace-tenancy`);
- custom roles and profiles, additional members, shared vaults (plugin UI and routes; vault key wrap/rotate stays in core).

Without the plugins the web uses stubs: no second workspace, no custom role or profile CRUD, no member invites, no shared-vault UI, no SaaS plan cards. Core still shows built-in roles and built-in profiles itself.
