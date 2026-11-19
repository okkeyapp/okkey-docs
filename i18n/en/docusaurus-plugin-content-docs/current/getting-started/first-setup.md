---
title: First-time setup
sidebar_position: 1
plans: [free, enterprise]
---

# First-time setup

Until Okkey has users, the first account is created without an email. Mail is not required for this step.

Once an account exists and mail is active, sign-in with the same address uses a one-time code. Until mail has passed a test message, the master password opens after the email address. The confirmation code is in the worker logs. See [Email](../install/email.md).

## Screens

1. "Welcome to Okkey". Field "Email", button "Sign in".
2. If users already exist and mail is active: "Confirmation code", 6 digits. If mail is inactive: the master password and the button "Sign in". The confirmation code is in the worker logs.
3. "Sign up for Okkey". Fields: "First name", "Last name", "Master password", "Repeat master password". The password is at least 12 characters, and the two passwords must match. Button "Sign up".
4. "Save your recovery key". You can "Copy" the key or "Download PDF".
5. "Vault is locked". Field "Master password", button "Unlock". The vault opens after unlock.

:::warning
Save the recovery key before "Next". After that the screen will not show it again, and the server cannot restore the key.
:::

Registration creates a workspace named "Personal" and a "Personal vault". A second workspace cannot be created. This install's plan is Free. An Okkey employee sets up Enterprise. See [Plans](../plans.md).
Signing in again on this device opens the same "Vault is locked" screen. The account menu has "My settings", "Device settings", and "Log out". Language switches in the header. "Change server" is in the extension.

## Tips

In the sidebar, between "Documentation" and the account menu, there is a "Tips" block. The "Previous tip" and "Next tip" arrows move through unfinished steps. "Dismiss tips" hides the block for this user in this browser.

The tips are:

- "Set up a PIN" - opens "Unlock". See [Unlock](../account/unlock.md).
- "Enable two-factor authentication" - opens "2FA authentication". See [Two-factor authentication](../account/two-factor.md).
- "Lock the vault when the device locks" - opens "Security". See [Unlock](../account/unlock.md).
- "Configure server email" - owner only, self-host only, and only while mail is inactive; opens "Mail". See [Email](../install/email.md).

A completed tip disappears. PIN and vault lock are per-device settings, so the tips can show again in another browser.

## Next steps

- [Settings](../account/index.md)
- [Vaults](../workspace/vaults.md)
- [Items](../items/index.md)
- [Browser extension](../apps/extension.md)
