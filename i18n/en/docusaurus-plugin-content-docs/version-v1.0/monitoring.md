---
title: Monitoring
sidebar_position: 9
plans: [enterprise]
---

# Monitoring

"Monitoring" is in the sidebar on Enterprise. Free has no such item. The page looks at items you can access in the current workspace and shows weak, reused, and other risky passwords. The count runs on your device. The card badge is "Beta".

The page text says the score is calculated from records you can access, the analysis runs locally, and it does not collect statistics about your data.

If there are no passwords, the heading is "Nothing to analyze yet" and the button is "Go to items". If no issues are found, the heading is "Everything looks good".

"Show" opens the item list with a filter already selected. Vault scope: "All vaults", "Personal", "Shared".

## Cards

| Card | What it covers |
| --- | --- |
| "Overall score" | The overall level across records you can access in the workspace. Level labels: "Excellent", "Good", "Fair", "Poor". |
| "Password strength" | Shares of "strong", "medium", and "weak". The counter is labeled "Passwords". |
| "Reused passwords" | The same password across several accounts. |
| "Weak passwords" | Passwords that are easier to guess. |
| "Compromised passwords" | Passwords from known breaches. The check uses Have I Been Pwned: only a SHA-1 hash prefix is sent to the server. The device does not send the full password. |
| "Outdated passwords" | The password has not changed for more than a year. |
| "2FA available but not set up" | Some accounts can use a second factor, and the item does not have one. |
| "Passkeys available but not set up" | The service in the item supports a passkey, and the item does not have one. |

The domain list for 2FA and passkeys is labeled as the open "Okkey domain-capabilities catalog".

"Show" sets a list filter. Those items are not in the ordinary filter menu: they come from the monitoring page. See [Item lists](./items/lists.md).

## How to check

1. On Free the sidebar has no "Monitoring".
2. On Enterprise open "Monitoring". With no passwords you see "Nothing to analyze yet" and "Go to items".
3. With passwords the cards from the table are visible, with the "Beta" badge. "Show" opens the list with that card's filter. "All vaults", "Personal", and "Shared" change the vault set.

## Next steps

- [Item lists](./items/lists.md)
- [Plans](./plans.md)
- [Protection](./security/keys.md)
