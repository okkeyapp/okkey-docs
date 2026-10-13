---
title: Monitoring
sidebar_position: 8
plans: [enterprise]
---

# Monitoring

"Monitoring" is in the sidebar on Enterprise. It shows weak and reused passwords. The count runs on your device, and the passwords themselves are not sent to the server. The card badge is "Beta".

On Free this item is absent. To get Enterprise, contact the Okkey team. See [Plans](./plans).

The score is built from items you can access in the current workspace.

If there are no passwords, the page offers to go to items. If no issues are found, it shows "Everything looks good".

"Show" opens the item list with a filter already selected. Vault scope: "All vaults", "Personal", "Shared".

By default every card is visible: overall score, strength, reused, weak, compromised, outdated, passkeys, and 2FA. A turned-off card does not lower the score and does not open a list.

## Overall score

Score from 0 to 100. Labels: from 90 "Excellent", from 70 "Good", from 45 "Fair", below that "Poor".

The penalty is taken from the share of problematic passwords. A turned-off card type is left out of the penalty.

| Issue | Up to |
| --- | --- |
| Weak | 40 |
| Medium | 15 |
| Reused | 25 |
| Outdated | 15 |
| Compromised | 35 |

2FA and passkey gaps are not part of this score.

## Cards

The count is passwords from items that are not archived and not deleted, in the selected vaults.

| Card | When an item is listed |
| --- | --- |
| "Password strength" | Shares of strong, medium, and weak passwords. A weak password is short or built from simple patterns. |
| "Reused passwords" | The same password in two or more items. |
| "Weak passwords" | Passwords that are easier to guess. |
| "Compromised passwords" | The password was found in known breaches. Only the start of a hash is sent. The device does not send the password itself. |
| "Outdated passwords" | The password has not changed for more than a year. |
| "2FA available but not set up" | The item has a password, no one-time code, and the site from the URL supports a second factor. If the site catalog is empty, the list is empty too. |
| "Passkeys available but not set up" | The card is in the list. It has no items right now. |

:::warning
The passkeys list is empty. "Show" on this card opens an empty item list.
:::

"Show" sets the list filter. These items are not in the ordinary filter menu: they come from the monitoring page. See [Item lists](./lists).

## Next steps

- [Item lists](./lists)
- [Tools](./tools)
- [Protection](./features/security)
