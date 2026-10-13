---
title: Item lists
sidebar_position: 13
plans:
  selfhosted: [free, enterprise]
  cloud: [free, pro, family, team, enterprise]
---

# Item lists

The "All items" list is built on the client from decrypted items. Empty: "No items". While data is in flight: "Loading items". A long list loads more as you scroll.

Search, filter, and sort are three different mechanisms. The filter does not replace search.

## Search

Field "Search…", clear control "Clear search".

While the field has text, vault, vault view, folder, and category are not part of the sample: every loaded item is searched, then the filter (favorites, archive, and so on) is applied on top. Sort during search is match weight first, then the selected sort.

Weight (`scoreItemsListRecordSearch`):

- a substring match in the title — 10;
- a substring match in a field of type URL — `10 / (URL number starting at 1)`;
- a query that starts with `#` and has text after the hash looks up the whole tag, case-insensitive, and nothing else. A different tag scores 0 and the item is hidden.

Secrets, passwords, and notes are not part of this weight. The row description is on screen, but it is not searched. Search inside the capsule window is different: it looks at non-secret preset section fields.

A tag can also be chosen from the filter, item "Tags": search "Search tags", empty — "No tags found". The choice puts `#tag` into the search field.

## Filters

The button is labeled for accessibility "Filter item list". The menu has only four modes. Everything else is a scope (vault, folder, category, tag) or a filter that came from monitoring.

Clearing the scope is the red button on the chip. It removes the vault, folder, search, and filter. Sort and the open item stay. "All items" in the sidebar means the same thing.

| Item | What remains |
| --- | --- |
| "All items" | Not deleted and not archived. |
| "Favorites" | The same, plus items marked favorite. Archive and trash do not land here. |
| "Archived" | Archive, not deletion. |
| "Recently deleted" | Items marked deleted. They stay here until the [retention](./settings/workspace#items) period ends. |

Scopes in the same menu:

| Scope | Why |
| --- | --- |
| "Vaults" | One vault. The list narrows to its items when there is no text search. |
| "Folders" | A branch of your personal folders. |
| "Categories" | Only items of that category. Empty: "No categories with items". A category is not combined with a search you already typed: search wins. |
| "Tags" | Turns the choice into a `#tag` search. |

The monitoring page also has "Personal" and "Shared" — that is a vault view, not a filter-menu item. In the list they show up as a chip.

Monitoring filters are not listed in the filter menu. "Show" on [monitoring](./monitoring) sets them, and Free has no monitoring. If the parameter is still in the address, the list keeps non-archived, non-deleted items from the report:

| Address filter | Label the trigger shows |
| --- | --- |
| reused | "Reused passwords" |
| strong | "Strong passwords" |
| medium | "Medium passwords" |
| weak | "Weak passwords" |
| stale | "Outdated passwords" |
| compromised | "Compromised passwords" |
| 2fa-gap | "2FA available but not set up" |
| passkey-gap | "Passkeys available but not set up" |

The strings "2FA not set up" and "Passkeys not set up" exist in the filter dictionary, but the monitoring trigger uses the card titles, not those short strings.

While a monitoring report is loading, the list waits for it if such a filter is active. The passkey card is always empty right now, so "Show" on it returns an empty list.

## Sort

Button "Sort item list". The default is "Newest first": an empty sort parameter means `date_desc`.

Group "By date:":

| Item | Order |
| --- | --- |
| "Newest first" | Descending `updatedAtMs`, that is the item update time, not the creation time. List sections are month and year. |
| "Oldest first" | Ascending on the same field. |

Group "By alphabet:":

| Item | Order |
| --- | --- |
| "Alphabet" | Title, `localeCompare` with locale `ru` even in the English UI. |
| "Reverse alphabet" | The reverse order. |

Alphabet sections are the first letter of the title in the UI locale (`ru` or `en`). If the first character is not a letter, the section is `#`. `#` always comes before letters in section order. Inside a section, row order is the selected sort.
