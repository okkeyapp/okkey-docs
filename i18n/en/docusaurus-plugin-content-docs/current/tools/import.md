---
title: Import
sidebar_position: 3
plans: [free, enterprise]
---

# Import

Import moves items from a file into a selected vault. The section text is: "Move data from other services into Okkey in a few steps. Standard formats and popular password managers are supported."

Import is on Free and on Enterprise.

## How to import

1. "Select a vault to import records into". If you cannot write to that vault: "You cannot write to the selected vault".
2. "Format". Search: "Search format". An empty search: "No format found".
3. Input method: "File" or "Text". "Upload file", "Remove file". For text, the field is labeled "Text", placeholder "Paste export contents". "Text" disappears for formats that only accept a file. The import file itself is at most 200 MB.
4. "Import folders" is shown only for formats that support folders. The switch creates the folder tree and places items into those folders. Folders are personal, see [Folders](../items/folders.md).
5. "Import". Progress: "Parsing file…", then "Importing N/M: title". Success: "Imported N records. Skipped: M." Some items may be left out: "Some records were not imported (N)." An empty parse: "No records found to import".

If an Okkey (json), Okkey ZIP, Bitwarden (json), or Bitwarden ZIP file is protected with an export password, the "Export password" window opens. Button "Unlock". A wrong password: "Invalid export password". The other formats do not open this window.

Okkey ZIP and Bitwarden ZIP with attachments show a note. The archive can be large, each attachment is limited by the workspace size setting, and only formats allowed in settings are uploaded.

:::note
Files from a ZIP are saved into items only when "Allow files in items" is on. On self-hosted the setting is on Free and on Enterprise.
:::

An unknown format id is read as Custom CSV during parsing. The on-screen list asks you to pick one of the formats below.

## Formats

| Format | File | Text | Folders | Export password |
| --- | --- | --- | --- | --- |
| Okkey (json) | json | yes | yes | yes, if the file is encrypted |
| Okkey (csv) | csv | yes | yes | no |
| Okkey ZIP (с файлами) | zip | no | yes | yes, if the file is encrypted |
| 1Password (csv) | csv | yes | no | no |
| 1Password (1pux) | 1pux, zip | no | yes | no |
| Bitwarden (json) | json | yes | yes | yes, if the file is encrypted |
| Bitwarden (csv) | csv | yes | yes | no |
| Bitwarden ZIP (с файлами) | zip | no | yes | yes, if the file is encrypted |
| Chrome (csv) | csv | yes | no | no |
| Microsoft Edge (csv) | csv | yes | no | no |
| Firefox (csv) | csv | yes | no | no |
| Safari (csv) | csv | yes | no | no |
| LastPass (csv) | csv | yes | no | no |
| NordPass (csv) | csv | yes | no | no |
| RoboForm (csv) | csv | yes | no | no |
| KeePass 2 (xml) | xml | yes | no | no |
| Kaspersky Password Manager (txt) | txt | yes | no | no |
| Kaspersky / My Kaspersky (csv) | csv | yes | no | no |
| Yandex Browser (csv) | csv | yes | no | no |
| Yandex Browser (zip) | zip | no | no | no |
| Passwork (json) | json | yes | no | no |
| Custom CSV | csv | yes | no | no |

The names "Okkey ZIP (с файлами)" and "Bitwarden ZIP (с файлами)" are written that way in the interface in English too. The "Folders" column shows whether the screen has the "Import folders" switch.

## How to check

1. Open "Import" on Free. The "Format" list contains the rows in the table, including "1Password (csv)" and "1Password (1pux)".
2. Select Chrome (csv). There are two tabs, "File" and "Text". There is no "Import folders" switch.
3. Select Okkey ZIP (с файлами). Only "File" remains, folders are available, and the attachment note is under the field.
4. Import a short csv into the personal vault. The toast says "Imported N records. Skipped: M." The items appear in the selected vault.

## Next steps

- [Export](./export.md)
- [Folders](../items/folders.md)
- [Item settings](../workspace/index.md#items)
