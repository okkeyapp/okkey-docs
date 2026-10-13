---
title: Open source
sidebar_position: 5
plans: [free, enterprise]
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

With `ENTERPRISE_MODULES=true` on a self-hosted install, these plugins load (`backend/api-plugin/index.ts`):

- `workspace-roles` — custom roles;
- `workspace-profiles` — custom profiles;
- `workspace-members` — invitations;
- `workspace-shared-vaults` — personal and shared vault popups;
- `account-recovery-advanced` — recovery through devices and trusted contacts.

Vault key wrap/rotate stays in core.

SSO, SAML, OIDC, SCIM, an organization audit log, and organization policies are not implemented in this tree: there are no screens, routes, or plan flags. Architecture overviews name them as future domains.

Without the plugins the web uses stubs: no custom role or profile CRUD, no member invites, and no shared-vault UI. Core still shows built-in roles and built-in profiles itself. On self-hosted an owner has one workspace.
