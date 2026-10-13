---
title: Tools
sidebar_position: 9
plans: [free, enterprise]
---

# Tools

The sidebar item "Tools" creates a password or moves items without leaving the vault. The menu has three sections: "Generator", "Import", "Export".

The generator, import, and export are available on Free. Files inside a ZIP are saved when "Allow files in items" is on. That setting is available on Free too. How to turn it on is in [item settings](./settings/workspace#items).

## Generator

Three generators: "Password", "Passphrase", "Username". They work the same way in the web app, in the extension, and on a website page. Buttons "Regenerate" and "Copy generated value". The extension window is described in the [browser extension](./apps/extension).

The password is built by the browser. Generator settings are remembered in this browser and are not written into the vault.

### Password

Length 4–128, default 16. Default sets: A-Z on, a-z on, 0-9 on, symbols `!@#$%^&*` off. The same labels appear on the item card: "A-Z", "a-z", "0-9", "!@#$%^&*", "Characters: N". Next to them "Strength:" and "Crack time:". Time is an entropy estimate. Scale labels: "Instantly", "Hours", "Days", "Months", "Years", "Decades", "Centuries", "Never". The scale shows an entropy estimate.

The same generator opens from the gear on a password field in an item: "Generator", then "Insert" or "Cancel".

### Passphrase

Words come from the EFF large list. Default is 3 words, separator `-`, without capitals and without a digit. Word range: 3–20. "Capitalize" raises the first letter of each word. "Include number" appends one digit 0–9 to a random word. "Word separator" is one character; if you type more, the first is kept, and an empty value is replaced with `-`.

### Username

One word from the same list. "Capitalize". "Include number" appends 4 digits from 0000 to 9999. Both switches are off by default.

## Import

Import moves items from another manager into the vault you pick. Standard formats and files from popular password managers are supported.

Fields:

- "Select a vault to import records into" - the item goes into the selected vault. Without write permission the vault cannot be used.
- "Format", search "Search format", empty: "Format not found".
- Input: "File" or "Text". "Upload file", "Remove file", and for text "Paste export contents".
- "Import folders" creates the folder tree and places the items. Folders are personal, see [Folders](./folders).

If the file is locked with an export password: window "Export password", "Unlock". Wrong password: "Wrong export password".

Progress: "Parsing file…", then "Import N/M: title". Success: "Imported N records. Skipped: M." Some records may be left out: "Some records were not imported (N)." Empty parse: "No records found to import".

For a ZIP with attachments: the archive can be large, each attachment is limited by the workspace size setting, and only formats allowed in settings are uploaded.

:::note
Files from a ZIP land in items only when "Allow files in items" is on. The setting exists on Free and on Enterprise.
:::

Import formats:

| Format | File | Paste as text | Folders | Export password |
| --- | --- | --- | --- | --- |
| Okkey (json) | json | yes | yes | |
| Okkey (csv) | csv | yes | yes | |
| Okkey ZIP (с файлами) | zip | no | yes | |
| 1Password (csv) | csv | yes | | |
| 1Password (1pux) | 1pux, zip | no | yes | |
| Bitwarden (json) | json | yes | yes | |
| Bitwarden (csv) | csv | yes | yes | |
| Bitwarden ZIP (с файлами) | zip | no | yes | |
| Chrome (csv) | csv | yes | | |
| Microsoft Edge (csv) | csv | yes | | |
| Firefox (csv) | csv | yes | | |
| Safari (csv) | csv | yes | | |
| LastPass (csv) | csv | yes | | |
| NordPass (csv) | csv | yes | | |
| RoboForm (csv) | csv | yes | | |
| KeePass 2 (xml) | xml | yes | | |
| Kaspersky Password Manager (txt) | txt | yes | | |
| Kaspersky / My Kaspersky (csv) | csv | yes | | |
| Yandex Browser (csv) | csv | yes | | |
| Yandex Browser (zip) | zip | no | | yes |
| Passwork (json) | json | yes | | |
| Custom CSV | csv | yes | | |

An unknown format is treated as Custom CSV.

## Export

Export builds the file in your browser, from the vault you already opened. The file is for a backup or a transfer to another service.

- "Select a vault to export records from". Without export permission for that vault, the command is unavailable.
- "Format".
- "Include folders" writes folder paths so import can restore them. Not every format supports folder paths (see the table).
- "Protect with password" encrypts the file. Field "Export password". The password is available on formats where the table marks "Password" as yes.

Before the button, the page shows how many records will go into the file. Progress: "Preparing records…", "Building export file…". Success: "Exported N records to file". Error: "Export failed".

| Format | Extension | Password | Folders | Attachments |
| --- | --- | --- | --- | --- |
| Okkey (json) | json | yes | yes | no |
| Okkey (csv) | csv | no | yes | no |
| Okkey ZIP (с файлами) | zip | yes | yes | yes |
| 1Password (csv) | csv | no | no | no |
| 1Password (1pux) | 1pux | no | yes | no |
| Bitwarden (json) | json | yes | yes | no |
| Bitwarden (csv) | csv | no | yes | no |
| Bitwarden ZIP (с файлами) | zip | yes | yes | yes |
| Chrome (csv) | csv | no | no | no |
| Microsoft Edge (csv) | csv | no | no | no |
| Firefox (csv) | csv | no | no | no |
| Safari (csv) | csv | no | no | no |
| LastPass (csv) | csv | no | yes | no |
| NordPass (csv) | csv | no | yes | no |
| RoboForm (csv) | csv | no | yes | no |
| KeePass 2 (xml) | xml | no | yes | no |
| Kaspersky Password Manager (txt) | txt | no | no | no |
| Kaspersky / My Kaspersky (csv) | csv | no | no | no |
| Yandex Browser (csv) | csv | no | no | no |
| Passwork (json) | json | no | yes | no |
| Custom CSV | csv | no | yes | no |

Yandex Browser (zip) can only be imported. It is not in the export list. The Okkey and Bitwarden ZIP names in the interface include "с файлами" in English too.

Export builds the file in the browser from the open vault. The export password is set separately and is required when that file is imported.

:::warning
Remember the export password separately from the master password. It opens the encrypted file on import.
:::

## Next steps

- [Folders](./folders)
- [Items](./items)
- [Item settings](./settings/workspace#items)
