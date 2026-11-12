---
title: Generator
sidebar_position: 2
plans: [free, enterprise]
---

# Generator

Three tabs: "Password", "Passphrase", "Username". They work the same way in the web app and in the extension. The extension window is described in the [browser extension](../apps/extension.md).

The password is built in the browser. Generator settings are remembered in this browser and are not written into the vault. The generator is on Free and on Enterprise.

The refresh button is labeled "Regenerate" for screen readers. Copy uses the tooltip "Copy", and "Copy generated value" for screen readers.

## Password {#password}

Length 4–128, default 16. The slider label is "Characters: N". Default sets: "A-Z" on, "a-z" on, "0-9" on, "!@#$%^&*" off. If you turn all four sets off, "a-z" stays on.

Next to the value: "Strength:" and "Crack time:". Strength: "Weak", "Fair", "Good", "Strong", "Excellent". Crack time: "Instantly", "Hours", "Days", "Months", "Years", "Decades", "Centuries", "Never". This is an entropy estimate, not a promise of how long a guess would take.

The same generator opens from an item: "Generator" on a password field, then "Insert" or "Cancel". On the item card the refresh button is labeled "Regenerate".

## Passphrase {#passphrase}

Words come from the EFF large list. The default is 3 words, separator `-`, without capitals and without a digit. Word range: 3–20. The slider label is "Words: N".

"Capitalize" raises the first letter of each word. "Include number" appends one digit 0–9 to a random word. "Word separator" is one character. If you type more, the first character is kept. An empty value is replaced with `-`.

## Username {#username}

One word from the same list. "Capitalize". "Include number" appends 4 digits from 0000 to 9999. Both switches are off by default.

## How to check

1. Open "Tools", "Generator". The "Password" tab is active, the length is 16, and symbols are off.
2. Turn off "a-z", "A-Z", and "0-9". "a-z" turns on again, and the password does not stay empty.
3. On "Passphrase", set 3 words and a separator longer than one character. The value keeps the first character.
4. Close the tab and open the generator again. The length and sets are the same, and no new item was written to the vault.

## Next steps

- [Items](../items/index.md)
- [Import](./import.md)
- [Item settings](../workspace/index.md#items)
