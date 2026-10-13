---
title: Tools
sidebar_position: 9
plans: [free, enterprise]
---

# Tools

Sidebar item "Tools". Inside there are three sections: "Generator", "Import", "Export". There are no other tools in the menu. The stub "This tool is coming soon." exists in the strings. **TODO:** which menu item it is bound to, apart from these three sections, is not visible - the tools sidebar only has these three.

The generator, import, and export are available on Free. Files inside a ZIP are saved when "Allow files in items" is on. That setting is available on Free too. How to turn it on is in [item settings](./settings/workspace#items).

## Generator

"A fast, convenient generator helps you create strong passwords to keep your information secure." Switch "Generator type": "Password", "Passphrase", "Username". Buttons "Regenerate" and "Copy generated value".

### Password

Length 4–128, default 16. Default sets: A-Z on, a-z on, 0-9 on, symbols `!@#$%^&*` off. The same labels appear on the item card: "A-Z", "a-z", "0-9", "!@#$%^&*", "Characters: N". Next to them "Strength:" and "Crack time:". Time is an entropy estimate. Scale labels: "Instantly", "Hours", "Days", "Months", "Years", "Decades", "Centuries", "Never". That is a scale caption, not a promise of real resistance.

The same generator opens from the gear on a password field in an item: "Generator", then "Insert" or "Cancel".

Randomness is `crypto.getRandomValues`.

### Passphrase

Words come from the EFF large list. Default is 3 words, separator `-`, without capitals and without a digit. Word range: 3–20. "Capitalize" raises the first letter of each word. "Include number" appends one digit 0–9 to a random word. "Word separator" is one character; if you type more, the first is kept, and an empty value is replaced with `-`.

### Username

One word from the same list. "Capitalize". "Include number" appends 4 digits from 0000 to 9999. Both switches are off by default.

Generator settings are stored in the browser `localStorage`, not in the vault.

## Import

"Move data from other services into Okkey in a few steps. Standard formats and popular password managers are supported."

Fields:

- "Select a vault to import records into" - the item goes into the selected vault. No write permission: "You cannot write to the selected vault".
- "Format", search "Search format", empty: "No format found".
- Input method: "File" or "Text". "Upload file", "Remove file", and for text "Paste export contents".
- "Import folders". "All folders and subfolders from the export will be created under the selected folder above, and items will be placed into those folders." Folders are personal, see [Folders](./folders).

If the file is locked with an export password: window "Export password", "Unlock". Wrong password: "Invalid export password".

Progress: "Parsing file…", then "Importing N/M: title". Success: "Imported N records. Skipped: M." Some items may be left out: "Some records were not imported (N)." Empty parse: "No records found to import".

ZIP attachments note: the archive can be large, each attachment is limited by the workspace setting in megabytes, and "Only file formats allowed in settings will be imported".

Import formats (`featured` marks the ones the code flags as featured):

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

An unknown format id falls through to Custom CSV. Format names are hardcoded and are not translated: the Okkey and Bitwarden ZIP names include the Russian words "с файлами" in the English UI as well.

## Export

"Export your data to a file for backup or transfer to another service."

- "Select a vault to export records from". No permission: "You cannot export from the selected vault".
- "Format".
- "Include folders" - "Folder paths will be written into the export so they can be restored on import." Not every format supports folder paths (see the table).
- "Protect with password" - "Encrypt the export file. You will need this password to import it later." Field "Export password". The flag exists only on formats with `supportsExportPassword`.

Before the button, the UI shows how many records will go into the file. Progress: "Preparing records…", "Building export file…". Success: "Exported N records to file". Error: "Export failed".

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

Yandex Browser (zip) is import-only. It is not in `exportFormatOptions`.

Export runs from the unlocked vault on the client: the file is built in the browser. The export password is a separate file password, not the master password.
