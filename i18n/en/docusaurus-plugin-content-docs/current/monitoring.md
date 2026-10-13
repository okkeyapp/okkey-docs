---
title: Monitoring
sidebar_position: 8
plans: [free, enterprise]
---

# Monitoring

"Monitoring" is in the sidebar on both Free and Enterprise. Use it to see weak and reused passwords without sending the passwords themselves to the server. Analysis runs on your device. The card badge is "Beta".

Page text: "The security score is calculated from records you can access in the current workspace. Analysis runs locally and does not collect or send statistics about your data."

Empty: "Nothing to analyze yet". "Add records with passwords to vaults you can access - monitoring will calculate metrics locally on your device." Button "Go to items". If no issues are found: "Everything looks good" and "No security issues detected for passwords you can access in this workspace."

"Show" opens the item list with a filter already selected. "Back to items" returns to the list. Vault scope on the page: "All vaults", "Personal", "Shared".

Which cards are visible is set by the workspace (`monitoring_card_settings`). All of them are on by default: overall score, strength, reused, weak, compromised, outdated, passkeys, 2FA. A disabled card does not penalize the score and does not return a list. The open locale strings do not name a separate screen that toggles the cards. **TODO:** find the "Configure" screen (`web.monitoring.configure`) and describe it if it is wired to these flags.

## Overall score

"Overall score". "This indicator reflects the overall security level across all records available to you in the workspace".

Score 0–100. Labels: from 90 "Excellent", from 70 "Good", from 45 "Fair", below that "Poor". If there are no passwords, the score function returns 100, but the empty screen shows "Nothing to analyze yet", not that hundred.

Penalties are a share of problematic passwords (a disabled card type is left out of the penalty):

| Issue | Up to |
| --- | --- |
| Weak | 40 |
| Medium | 15 |
| Reused | 25 |
| Outdated | 15 |
| Compromised | 35 |

2FA and passkey gaps are not part of the score.

## Cards

The count is passwords from items that are not archived and not deleted, in the selected vaults.

| Card | How an item gets in |
| --- | --- |
| "Password strength" | Shares of "strong", "medium", "weak". Entropy in `getPasswordEntropyBits`: length and character set, a bonus for passphrase shape, penalties for repeats, patterns `1234` / `abcd` / `qwerty` / `password` / `admin` / `letmein`, keyboard runs, and nearly a single character. Weak is under 36 bits, medium in monitoring is the fair and good labels (36–64 bits), strong is strong and excellent (from 64). |
| "Reused passwords" | The same password in two or more items. "The same password may be used across multiple accounts." |
| "Weak passwords" | The weak bucket. "Weak passwords may be easier to guess." |
| "Compromised passwords" | Have I Been Pwned: only a SHA-1 prefix is sent to the server, the device does not send the full password. "Passwords found in known data breaches." |
| "Outdated passwords" | The password has not changed for longer than `STALE_PASSWORD_AGE_MS` - 365 days. "Passwords that have not been changed for more than a year." |
| "2FA available but not set up" | The item has a password, no configured TOTP, and a domain from a URL is in the catalog with `supports2FA`. The catalog is downloaded from the public Okkey domain-capabilities list. Attribution: "Upstream: Data sourced from 2FA Directory by 2factorauth." If the catalog is empty, the list is empty. |
| "Passkeys available but not set up" | The card exists, and the text promises services with passkeys. The list in code is always empty until an item has a passkey field and a catalog check. **TODO:** do not describe this card as a working report. |

:::warning
The passkeys card is not a report yet. "Show" on it opens an empty list.
:::

"Show" sets the list filter. The list filter dropdown itself does not contain these items: they come from the monitoring page. See [Item lists](./lists).

## Next steps

- [Item lists](./lists)
- [Tools](./tools)
- [Protection](./features/security)
