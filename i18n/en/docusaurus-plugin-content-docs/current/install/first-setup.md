---
title: First-time setup
sidebar_position: 4
plans:
  selfhosted: [free, enterprise]
  cloud: []
---

# First-time setup

While the `users` table is empty, `POST /auth/email/start` returns `bootstrapRequired: true` and `authStateId`. The web UI skips the email code and opens registration. SMTP is not required for the first account. As soon as a user exists, the same address goes through the normal one-time code.

## Screens

1. “Welcome to Okkey”. Field “Email”, button “Sign in”. Under the button, agreement with the “Privacy policy”.
2. If the database is no longer empty: “Confirmation code”, 6 digits, “Send again”, “Sign in with a different email”.
3. “Sign up for Okkey”. Fields: “First name”, “Last name”, “Master password”, “Repeat master password”. The hint says this is the only password you need to remember and that you use it to unlock the vault. The checklist “Before signing up” requires every field, a password of at least 4 characters (`MIN_MASTER_PASSWORD_LENGTH`), and matching passwords. Button “Sign up”.
4. “Save your recovery key”. You can “Copy” or “Download PDF”. The warning says that after “Next” the key is not shown again and the server cannot restore it. If saving the key fails, the UI says you can set it later: Settings → Recovery.

Registration creates a personal workspace named “Personal” (`auth.registration.personalWorkspaceName` is “Личный” / the English bundle’s equivalent) and a personal vault. The open self-hosted build cannot create a second workspace (`canCreateWorkspace` on the tenancy stub is `false`, and `POST /workspaces` is not a core route).

The vault opens next. A later sign-in on this device is the master-password unlock screen. Account menu items: “My settings”, “Device settings”, “Log out”, “Change server”, “Language: …”.

After sign-in, see [Settings](../settings), [Vaults](../vaults), [Items](../items), and the [extension](../apps/extension).
