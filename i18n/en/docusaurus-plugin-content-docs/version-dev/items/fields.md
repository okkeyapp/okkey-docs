---
title: Fields and sections
sidebar_position: 3
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Fields and sections

An item is a name, tags, sections, and fields. On the card: "Item name" (placeholder "Name"), "Tags", "Upload icon" (JPG or PNG, otherwise "Choose a JPG or PNG image."). Where to save: label "Save to", vault placeholder "Select vault", folder "No folder". Buttons "Save" and "Cancel". Custom fields and sections: "Add field", "Add section with field".

Preset sections come first. Custom sections can be reordered together with their fields. A custom section title uses the placeholder "Add title". Deleting a section is "Delete section", when the section allows it. Deleting a field is "Delete field". Required preset fields (login, password, the first URL, API name, API secrets, card number, expiry, CVC, personal first and last name) are not deleted that way.

The "File" field and the files category depend on the workspace setting. On Free they are absent.

## Types you can add

Groups in code: `general`, `secret`, `file`. Labels:

| Type | Label | Group |
| --- | --- | --- |
| `text` | "Text" | general |
| `email` | "Email" | general |
| `phone` | "Phone" | general |
| `address` | "Address" | general |
| `date` | "Date" | general |
| `url` | "Website URL" | general |
| `select` | "Select" | general |
| `multiline-text` | "Multiline text" | general |
| `secret` | "Secret" | secret |
| `totp` | "TOTP" | secret |
| `recovery-codes` | "Recovery codes" | secret |
| `file` | "File" | file |

"Password" and the CVC pin are preset kinds. They are not in this add list. A password in the generator and in a login is a separate secret kind.

An address splits into "Street", "House / building", "Apartment", "City/Town/Suburb", "State/Province", "ZIP/Postal code", "Country". Country search: "Search countries", empty — "No countries found".

File: "Upload file", "Delete file". Size limit and extensions come from the workspace settings. The hint shows the maximum.

A date opens a calendar.

TOTP shows the code and the remaining time. In the field menu: "Enter new TOTP secret".

Recovery codes: "Show codes" / "Hide codes". In view mode, used codes can be checked off.

A secret is hidden by default. "Show value" reveals it when the field has no menu of its own.

## Field gear

The settings button is labeled for accessibility as "\{fieldLabel\} settings". The menu depends on the type. These are the hidden field settings: they stay hidden until the gear is opened.

| Field | Items |
| --- | --- |
| Fixed login password | "Show password" / "Hide password", "Generator". |
| Configurable secret | Kind: "Password", "Single-line secret", "Multi-line secret". Then reveal and "Generator". For a password the reveal labels are "Show password"; for a secret they are "Show secret". |
| TOTP | "Enter new TOTP secret". |
| URL in the login websites section | "Fill on entire site", "Fill only on this URL", "No autofill". This is what the [extension](../apps/extension) uses. |
| Phone | "Enable mask" / "Disable mask". The mask hides the number until it is turned off. |
| CVC/PIN | "Show CVC/CVV" / "Hide CVC/CVV". |
| Select | "Enter edit mode" / "Exit edit mode". In edit mode the options are "One value per line". Empty list: "No items". |
| Multiline text | "Enable click-to-copy" / "Disable click-to-copy". With copy off, one click does not copy the whole text. |

The in-field generator: length 4–128, sets "A-Z", "a-z", "0-9", "!@#$%^&*", "Strength:", "Crack time:", "Regenerate", "Insert", "Cancel".

Copying a field on the card is "Copy". Secrets are not included in list search.

Leaving a new item without saving asks "Leave without saving?" — "Any data you entered will be lost." Button "Continue".
