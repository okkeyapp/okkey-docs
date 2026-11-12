---
title: Export
sidebar_position: 4
plans: [free, enterprise]
---

# Export

Export builds the file in your browser, from a vault that is already open. The section text is: "Export your data to a file for backup or transfer to another service."

Export is on Free and on Enterprise. The file contains items in the selected vault that you can see. Deleted items are not included.

## How to export

1. "Select a vault to export records from". Search: "Search vault". Without export permission for that vault: "You cannot export from the selected vault".
2. "Format". Search: "Search format".
3. "Include folders" is shown only for formats that write folder paths. The text is: "Folder paths will be written into the export so they can be restored on import."
4. "Protect with password" is shown only for formats whose "Password" column in the table is "yes". Field "Export password". The text is: "Encrypt the export file. You will need this password to import it later." While the password is empty, the button cannot be pressed.
5. Above the button, a line says how many items will go into the file: "N records will be exported". Button "Export". Progress: "Preparing records…", "Preparing N/M: title", "Building export file…". Success: "Exported N records to file". Error: "Export failed".

The file name starts with `okkey-export-` and the date. The extension comes from the format.

:::warning
Remember the export password separately from the master password. It opens the encrypted file on import.
:::

## Formats

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

Yandex Browser (zip) can only be imported. It is not in the export list. The Okkey and Bitwarden ZIP names in the interface contain "с файлами" in English too.

## How to check

1. Open "Export" on Free and select a personal vault with a couple of items.
2. Format Okkey (csv): there is no "Protect with password" switch, and "Include folders" is present. "Export" downloads a file, and the toast names the record count and the file name.
3. Format Okkey (json): "Protect with password" appears. With an empty password the button cannot be pressed. With a password the file downloads, and [import](./import.md) of that file asks for "Export password".
4. The list does not contain "Yandex Browser (zip)".

## Next steps

- [Import](./import.md)
- [Folders](../items/folders.md)
- [Items](../items/index.md)
