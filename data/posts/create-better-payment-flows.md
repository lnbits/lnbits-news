---
title: 'Create Better Payment Flows'
date: '2026-02-09T20:27:09.000Z'
summary: 'LNBits is often described as a Lightning wallet. It is! But it works much more like a flexible payment layer.'
image: 'https://image.nostr.build/3aac1fb1d8c178678256f959a554e9633533f7202a1040331e3f4caa1281c853.jpg'
draft: false
---

From my PoV there is one small detail many people overlook: every LNBits wallet has a wallet ID.

That wallet ID can be used inside an app like any other internal identifier. It can also be mapped to a human-friendly `handle` like [Strike.me](https://strike.me) does. Users never need to see raw IDs, they interact with choosen user friendly names, while the app uses the wallet ID underneath.

This matters.

Instead of creating internal invoices upfront, an app can first create a payment related request as simple data: an amount, a reason, and a target wallet ID. Nothing is paid yet. Nothing is generated yet.

> The moment a request crosses app boundaries, the same handle (wallet ID) can be resolved to a Lightning Address. Using the LNBits Paycode extension, this internal identifier scales seamlessly into the wider Lightning ecosystem without changing the request flow.

From a user perspective, this feels natural. You see the payment related request, confirm (or maybe deny it), and the payment happens. From an app perspective, the logic stays clean. Requests stay requests. Payments only exist when value really moves.

LNBits handles the accounting.
Wallet IDs give structure.
Your app controls the experience.

Want to start building with LNBits?
You can deploy a server in minutes visiting [LNBits.com]

Resources:
[LNBits Github](https://github.com/lnbits/lnbits#lnbits)
[Paycode Extension](https://github.com/lnbits/lnurlp)
