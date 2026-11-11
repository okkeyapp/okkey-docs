---
title: Generator
sidebar_position: 2
plans: [free, enterprise]
---

# Generator

Three generators: "Password", "Passphrase", "Username". They work the same way in the web app, in the extension, and on a website page. Buttons "Regenerate" and "Copy generated value". The extension window is described in the [browser extension](../apps/extension.md).

The password is built by the browser. Generator settings are remembered in this browser and are not written into the vault.

## Password

Length 4–128, default 16. Default sets: A-Z on, a-z on, 0-9 on, symbols `!@#$%^&*` off. The same labels appear on the item card: "A-Z", "a-z", "0-9", "!@#$%^&*", "Characters: N". Next to them "Strength:" and "Crack time:". Time is an entropy estimate. Scale labels: "Instantly", "Hours", "Days", "Months", "Years", "Decades", "Centuries", "Never". The scale shows an entropy estimate.

The same generator opens from the gear on a password field in an item: "Generator", then "Insert" or "Cancel".

## Passphrase

Words come from the EFF large list. Default is 3 words, separator `-`, without capitals and without a digit. Word range: 3–20. "Capitalize" raises the first letter of each word. "Include number" appends one digit 0–9 to a random word. "Word separator" is one character; if you type more, the first is kept, and an empty value is replaced with `-`.

## Username

One word from the same list. "Capitalize". "Include number" appends 4 digits from 0000 to 9999. Both switches are off by default.

## Next steps

- [Folders](../items/folders.md)
- [Items](../items/index.md)
- [Item settings](../workspace/index.md#items)
