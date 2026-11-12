---
title: Two-factor authentication
sidebar_position: 3
plans: [free, enterprise]
---

# Two-factor authentication {#two-factor-authentication}

The second factor means a code from email is not enough to sign in. The menu item is "2FA authentication", and the page heading is "Two-factor authentication". The address is `?popup=settings|twoFactor`. It is available on Free and on Enterprise.

## Turn it on

1. Turn on "Authenticator app". The caption says a third-party app, for example Google Authenticator, generates one-time codes.
2. The "Set up authenticator" window says "Scan the QR code in your authenticator app or enter the secret code manually". The field is "Secret code". The buttons are "Copy secret code" and "Next".
3. The "Confirm 2FA" window says "Enter the 6-digit code from your authenticator app". The field is "Confirmation code". The button is "Confirm".

A wrong code: "Invalid confirmation code". If the setup session expired: "Setup session expired. Start again".

After confirmation, "Backup codes" appear. These are one-time codes for when the app is not at hand. There are 10 by default. The screen shows "Codes remaining: N", "Copy", and "Download PDF". The PDF title is "Backup recovery codes". The text says each code works once.

## Regenerate and turn off

"Regenerate" opens "Regenerate backup codes". It asks for a code from the app. The warning is "After regenerating codes, the old codes will no longer work". The toast is "Backup codes generated".

"Disable 2FA" asks for a code from the app. The button is "Disable".

## How to check

1. Turn on "Authenticator app", enter a code from the app, and reach "Backup codes". "Download PDF" saves a file.
2. Sign out and sign in again. After the email code, "Two-factor authentication" opens: the field "2FA code" and the button "Verify". "Use a backup code instead" switches to "Backup code". The same backup code does not work a second time.
3. "Disable" with a code from the app turns the second factor off. The next sign-in finishes with the email code.

## Next steps

- [Profile](./profile.md)
- [Recovery](./recovery.md)
- [Unlock](./unlock.md)
