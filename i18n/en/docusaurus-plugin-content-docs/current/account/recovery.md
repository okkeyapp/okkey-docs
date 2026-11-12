---
title: Recovery
sidebar_position: 4
plans: [free, enterprise]
---

# Recovery {#recovery}

The menu item is "Recovery", and the heading is "Access recovery". The address is `?popup=settings|recovery`. Set a method up in advance. If the master password is forgotten, the server cannot guess it.

The recovery key is on Free and on Enterprise. "Trusted devices" and "Trusted contacts" are on Enterprise. On Free the switches do not turn on, and the text under them is "This recovery method requires a paid plan entitlement." The note says "Additional recovery methods (Trusted devices and Trusted contacts) are available on paid plans." The link "Change your plan" opens [Change plan](../workspace/plan.md).

## Recovery key

The caption is "This key helps restore access to your account if you forget your master password". Turn on the "Recovery key" switch. The vault has to be unlocked, otherwise: "Unlock your vault to manage the recovery key."

The key is shown only when you have just created or regenerated it. "Copy" and "Download PDF". The PDF title is "Okkey recovery key". The text says to keep the key offline: anyone with the key can restore access. After you copy or download it, "Key copied or downloaded:" shows a mark. Until then it says "no".

The key cannot be switched off after it is created. "Regenerate" issues a new one and warns "After regenerating the key, the old key will no longer work." The toast is "Recovery key regenerated". To copy a key you already saved, regenerate it: "Regenerate the key to copy or download it again. The previous key will stop working."

The same key is offered at registration: "Save your recovery key". If the key was not saved, the screen with "Create recovery key" opens before you can use the vault. See [Unlock](./unlock.md#recovery-key-required).

### Sign-in with the key

On "Vault is locked", "Forgot master password?" opens "Forgot master password?". The "Recovery key" method has a field with the hint `XXXX-XXXX-XXXX-…`, "New master password", "Repeat new master password", and the button "Restore access". The new password is at least 12 characters.

After the password changes, "Save your new recovery key" says the previous key is no longer valid. "Copy" or "Download PDF", then "Continue". The warning says the key is shown only once, and after "Continue" you cannot download it again.

If recovery runs in a browser that did not already have the vault, that browser becomes the trusted device, and the previous trusted devices are revoked. They have to be confirmed again.

A wrong key: "Could not restore with this recovery key. Check the key and try again." Too many attempts: "Too many attempts. Try again later."

## Trusted devices {#trusted-devices}

Enterprise only. The caption is "Helps restore your account through your other trusted devices if you are signed in on them". To turn it on you need at least two trusted devices, and one of them is the current one. Otherwise: "Add another trusted device before enabling this recovery method" and "Add at least 2 trusted devices, including this one, first."

On "Forgot master password?" the method is "Trusted devices", with the hint "Use another device that already trusts this account".

1. Click "Request recovery from trusted device". The text says to start a request, then approve it on another trusted device where the vault is unlocked.
2. On that device the window is "Account recovery request". Confirm only if you recognize the device. The buttons are "Confirm" and "Reject". "More actions" includes "Block device".
3. After "Approved. Set a new master password to finish." set the password and click "Restore access".

A rejected request: "Recovery request rejected". An expired one: "Recovery request expired", with "Start again". If the device was blocked forever: "This device is blocked", and sign-in from this browser is no longer possible.

## Trusted contacts {#trusted-contacts}

Enterprise only. The caption is "Add at least 3 trusted contacts who can help restore access". A contact must already be an Okkey user. Otherwise: "Contact must be an existing Okkey user." You cannot invite your own account: "You cannot invite your own account."

"Add", the field "Enter contact email", "Send invite (N)". While fewer than three are confirmed: "Need N more confirmed contacts" and "Add at least 3 confirmed contacts first." When there are enough, the status is "Ready". Removal asks "Remove trusted contact?".

The invited person sees "Trusted contact invitation" and the buttons "Accept" or "Decline". The list "I am a trusted contact" shows accounts you can help. You can leave from there: "Leave trusted contacts?".

On "Forgot master password?" the method is "Trusted contacts", with the hint "Ask your confirmed trusted contacts for help".

1. Click "Request help from trusted contacts".
2. A contact with the vault unlocked confirms help in "Help a contact restore access". The button is "Confirm help with recovery". The text asks you to confirm only a person you recognize. Progress: "Help confirmed: N / M".
3. When enough help is in, set a new master password and click "Restore access".
4. The request can be revoked with "Revoke request".

## How to check

1. On Free, in Recovery, turn on "Recovery key", download the PDF, and reload. The switch stays on, "Copy" is gone, and "Regenerate" is there.
2. On "Vault is locked" open "Forgot master password?", enter the key and a new password of at least 12 characters. "Save your new recovery key" appears.
3. On Free, "Trusted devices" does not turn on, and the text mentions a paid plan.
4. On Enterprise, with two trusted devices, the "Trusted devices" switch turns on. With three confirmed contacts the contact status is "Ready".

## Next steps

- [Devices](./devices.md)
- [Unlock](./unlock.md)
- [Plans](../plans.md)
- [Change plan](../workspace/plan.md)
