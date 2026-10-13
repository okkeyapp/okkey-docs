---
title: Открытый код
sidebar_position: 5
plans: [free, enterprise]
---

# Полностью открытый код, включая шифрование

Модель — open core.

Открытый репозиторий `okkey` содержит:

- клиенты: web, mobile, desktop, browser extension;
- общие пакеты API, crypto, vault, sync, auth, UI;
- сервисы API и worker;
- Rust-движок `rust/crypto-engine` и WASM-обёртку `packages/crypto`;
- self-host: Docker Compose в `deploy/docker`.

Шифрование не спрятано в закрытый модуль. Профили v1/v2, гибридный конверт, Argon2id, XChaCha20-Poly1305, X25519, ML-KEM-768 и Ed25519 описаны и вызываются из этого репозитория. Обзоры: [Q-Day ready](./qday), [Защищённость](./security).

## Граница с Enterprise

`okkey-enterprise` — отдельные плагины. Ядро обязано запускаться при `ENTERPRISE_MODULES=false`. Плагин не меняет таблицы ядра (только добавляет свои), не обходит аутентификацию и не понижает криптопрофиль.

В self-hosted при `ENTERPRISE_MODULES=true` подключаются плагины (`backend/api-plugin/index.ts`):

- `workspace-roles` — свои роли;
- `workspace-profiles` — свои профили;
- `workspace-members` — приглашения;
- `workspace-shared-vaults` — попапы личного и общего сейфа;
- `account-recovery-advanced` — восстановление через устройства и доверенные контакты.

Криптография wrap/rotate ключа сейфа остаётся в ядре.

SSO, SAML, OIDC, SCIM, журнал аудита организации и политики организации в этом дереве не реализованы: нет экранов, маршрутов и флага тарифа. В архитектурных обзорах они названы как будущие домены.

Без плагинов веб подставляет заглушки: нет CRUD своих ролей и профилей, нет приглашения участников и нет UI общих сейфов. Встроенные роли и встроенные профили ядро показывает само. В self-hosted у владельца одно пространство.
