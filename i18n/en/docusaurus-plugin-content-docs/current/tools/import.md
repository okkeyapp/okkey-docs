---
title: Import
sidebar_position: 3
plans: [free, enterprise]
---

# Import

Import moves items from another manager into the vault you pick. Standard formats and files from popular password managers are supported.

Fields:

- "Select a vault to import records into" - the item goes into the selected vault. Without write permission the vault cannot be used.
- "Format", search "Search format", empty: "Format not found".
- Input: "File" or "Text". "Upload file", "Remove file", and for text "Paste export contents".
- "Import folders" creates the folder tree and places the items. Folders are personal, see [Folders](../items/folders.md).

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

## Next steps

- [Folders](../items/folders.md)
- [Items](../items/index.md)
- [Item settings](../workspace/index.md#items)
