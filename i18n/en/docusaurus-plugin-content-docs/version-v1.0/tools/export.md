---
title: Export
sidebar_position: 4
plans: [free, enterprise]
---

# Export

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

- [Folders](../items/folders.md)
- [Items](../items/index.md)
- [Item settings](../workspace/index.md#items)
