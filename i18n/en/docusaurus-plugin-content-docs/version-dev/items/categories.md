---
title: Categories and templates
sidebar_position: 2
plans: [free, enterprise]
---

# Categories and templates

The new-item window groups categories like this:

1. "Favorite categories" — if the favorites list is not empty.
2. "Templates" — if you saved your own templates. The block sits before the authorization group.
3. "Authorization".
4. "Finance".
5. "Personal data".

"Secure files" disappear when files in items are off in the workspace. On Free, files are off in the matrix.

The code has a category `ssh_key` and the string "SSH key", but it is commented out of `ITEM_CATEGORY_DEFINITIONS`. It is not in the picker. **TODO:** do not describe SSH as an available category until that line is enabled again.

## Favorites and order

Default favorites, in this order: "Login / Password", "Secure note", "Credit card", "Personal data", "Passport", "Secure files".

"Reorder" (on a narrow screen "Sort") turns on dragging. "Done" leaves the mode. The star adds and removes a category or template from favorites.

## Authorization group

Order inside the group is the order declared in the catalog.

### Login / Password

Preset sections with no titles of their own in the section catalog (ids `credentials` and `websites`):

| Field | Type | Required | Can be deleted | Label can be changed |
| --- | --- | --- | --- | --- |
| "login" | text | yes | no | no |
| "password" | password, secret | yes | no | no |
| "website URL" | URL | yes | not the first one | yes |

A URL defaults to "Fill on entire site". More URLs are added with "Add URL". TOTP is not in the preset; it is added separately ("Add TOTP") when needed.

### API credentials

Section `api-access`.

| Field | Type | Required | Deletable |
| --- | --- | --- | --- |
| "name" | text | yes | no |
| "sign-in data" | secret, single line | yes | no |
| "type" | select | no | yes |
| "file name" | text | no | yes |
| "valid from" | date | no | yes |
| "valid until" | date | no | yes |
| "hostname" | text | no | yes |

"type" options: "Sign-in data JSON", "JSON Web Token", "Bearer token", "Other".

### Database

One section. Every field can be deleted and renamed.

| Field | Type |
| --- | --- |
| "type" | select |
| "server" | text |
| "port" | text |
| "database" | text |
| "username" | text |
| "password" | secret, kind "Password" |
| "SID" | text |
| "alias" | text |
| "connection parameters" | text |

Type options: PostgreSQL, MySQL, Microsoft SQL Server, Oracle Database, SQLite, MongoDB, Redis, Apache Cassandra, Elasticsearch, Snowflake, ClickHouse, "Other".

### Server

Server section: "URL address", "login", "password" (secret). Extra section "Admin console": "console URL", "console login", "console password". All of these fields are deletable.

### Wi‑Fi router

Deletable fields: "station name", "station password", "server / IP address", "AirPort ID", "network name", "network security protocol" (select), "network password", "connected storage password".

Protocol: WEP, WPA, WPA2-Enterprise, WPA2-Personal, WPA3-Enterprise, WPA3-Personal, "Unsecured".

## Finance group

### Credit card

One section. These cannot be deleted or renamed:

| Field | Type | Required |
| --- | --- | --- |
| "card number" | card | yes |
| "expiration date" | card expiry | yes |
| "CVC/CVV" | pin | yes |
| "cardholder" | text | no |

The CVC field menu: "Show CVC/CVV" / "Hide CVC/CVV".

### Bank account

Account section, fields can be deleted and renamed: "bank name", "account holder name", "account number", "SWIFT code", "IBAN number".

Extra section "Bank details": "bank address" (text), "bank phone" (phone). Also deletable.

### Crypto wallet

Access section, single-line secret fields, deletable: "access password / PIN", "passphrase".

Extra section "Wallet": "wallet address".

## Personal data group

Order in the group is set separately: "Personal data", "Passport", "Secure files", "Secure note".

### Personal data

Personal-data section. Preset fields cannot be deleted or renamed. Form validation requires "first name" and "last name". The rest: "middle name", "gender", "date of birth", "phone", "email", "nickname", "address".

"gender" is a select: "Male", "Female".

Section "Work": "company", "department", "position", "work phone", "work email".

The "initials" field was removed from the template. If it remains on an old item, the list can still show it in the row description.

### Passport

Passport section, preset fields: "type", "issuing country", "number", "full name", "gender", "nationality", "issuing authority", "date of birth", "place of birth", "issue date", "expiry date".

### Secure files

One file field. The category is hidden while "Allow files in items" is off. The `filesInItems` flag is on for Enterprise and off for Free.

### Secure note

One field "note".

## Your templates

"Save as template". Field "Template name", placeholder "Enter template name". Checkbox "Add to favorites". Hint: "The new template will appear in the all categories list". Success: "Template saved". Error: "Could not save template".

A template stores the category and the field set. In the picker it sits in the "Templates" block and can be added to favorites.

Updating an already saved template is the "Update template" window. Text: "After saving, your template \"…\" will be updated". Success: "Template updated". Error: "Could not update template".
