---
title: Item lists
sidebar_position: 13
plans: [free, enterprise]
---

# Item lists

The "All items" list is built on the client from decrypted items. That is why search does not go to the server and does not look at secrets. Empty: "No items". While data is in flight: "Loading items". A long list loads more as you scroll.

Search, filter, and sort are three different mechanisms. The filter does not replace search.

## Search

Field "Search…", clear control "Clear search".

While the field has text, vault, vault view, folder, and category stay out of the sample: every loaded item is searched, then the filter (favorites, archive, and so on) is applied on top. Sort during search is match strength first, then the selected sort.

A match in the title counts more than a match in an address. The first address counts more than the next one.

A query that starts with `#` and has text after the hash looks up the whole tag, ignoring letter case. Other fields are left out of that query. A different tag hides the item.

Secrets, passwords, and notes stay out of this match. The row description is on screen, and search does not use it. Search inside the capsule window is separate: it looks at open preset-section fields.

A tag can also be chosen from the filter, item "Tags": search "Search tags", empty - "No tags found". The choice puts `#tag` into the search field.

:::tip
A text search drops the vault and the folder. To stay inside a vault, use the filter.
:::

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

"Personal" and "Shared" on the monitoring page choose a set of vaults. In the list they show up as a chip.

"Show" on [monitoring](./monitoring) sets the monitoring filters. "Monitoring" is on Enterprise. If the parameter is still in the address, the list keeps non-archived, non-deleted items from the report:

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

"Show" labels the filter with the monitoring card title.

While a monitoring report is loading, the list waits for it if such a filter is active. The passkey card is always empty right now, so "Show" on it returns an empty list.

## Sort

Button "Sort item list". The default is "Newest first".

Group "By date:":

| Item | Order |
| --- | --- |
| "Newest first" | By the item's update time. List sections are month and year. |
| "Oldest first" | The same field, oldest first. |

Group "By alphabet:":

| Item | Order |
| --- | --- |
| "Alphabet" | By title. Letter order follows the Russian alphabet in the English interface too. |
| "Reverse alphabet" | The reverse order. |

Alphabet sections are the first letter of the title in the uppercase of the interface language. If the first character is not a letter, the section is `#`. `#` always comes before letters in section order. Inside a section, row order is the selected sort.

## Next steps

- [Monitoring](./monitoring)
- [Folders](./folders)
- [Item actions](./items/actions)
