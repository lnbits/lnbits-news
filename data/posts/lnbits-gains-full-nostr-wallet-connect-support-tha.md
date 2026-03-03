---
title: 'LNbits Gains Full Nostr Wallet Connect Support Thanks to Bounty Work by Riccardobl'
date: '2025-05-20T13:42:28.000Z'
summary: 'LNbits can now act as both a wallet service and funding source via the Nostr Wallet Connect (NIP-47) protocol.'
image: 'https://blossom.primal.net/6c5f6c5b12e07ecedd5adc5c90ce7bd31646b5148c34611502b9d659431cda95.jpg'
draft: false
---

LNbits now has full NWC support thanks to the work of contributor @riccardobl, who has claimed two LNbits bounties for implementing Nostr Wallet Connect (NWC) support in LNbits.

LNbits can now act both as a wallet service and as a funding source using the Nostr NWC protocol (NIP-47). This opens the door to new integrations with a growing ecosystem of Nostr clients and Lightning wallets.

## Two Sides of NWC Integration

The work delivered by Riccardo B comprises **two separate peices of work** that together implement full support for NWC:

### 1. **LNbits as a Wallet Service**

This extension allows LNbits to operate as an always-on wallet service compatible with Nostr Wallet Connect clients such as **Damus**, **Amethyst**, or any app supporting NIP-47. Users can connect these Nostr clients to their LNbits instance and create and pay Lightning invoices through it.

This turns your LNbits wallet into a backend Lightning provider for your favourite Nostr app all self-hosted.

### 2. **NWC as a Funding Source**

The second piece of work flips the relationship. With this in place, LNbits can now act as an **NWC client**, meaning it can be funded from any NWC wallet service. This could be another LNbits, Alby, Minibits and more.

## Why This Is a Big Deal for LNbits Users

These two bounties make LNbits one of the first applications in the Lightning ecosystem to offer **bidirectional NWC support** — as both a service and a client. This brings benefits such as:

- **Fund any NWC-compatible app** using your LNbits wallet.

- **Fund LNbits** using any wallet that supports Nostr Wallet Connect.

- **Build NWC-native apps** with LNbits as a backend, or power your own LNbits server using existing wallet infrastructure.

For developers, it’s a chance to build in flexible, interoperable ways. For users, it means more choice, more control, and less friction when managing Lightning payments across apps and devices.

Both of these features were developed and delivered by **Riccardo B** ([@riccardobl](https://github.com/riccardobl)), an contributor who took on and completed both LNbits bounties and was extremely helpful during the PR review process. We owe a huge thanks to Riccardo for his work here.

To try them out, [read the full article detailing how NWC works with LNbits](https://news.lnbits.com/news/lnbits-with-nostr-wallet-connect-nwc).
