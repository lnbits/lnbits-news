---
title: 'Comparing Lightning Network funding sources for LNbits'
date: '2025-05-29T10:32:34.000Z'
summary: 'How to pick the right Lightning Wallet for LNbits'
image: 'https://blossom.primal.net/51fb91f98fc7b953619bdf14e4a774c19b5591a581ada673ae4f38b358fe5304.jpg'
draft: false
---

This article gives an overview and comparison of the various funding sources that are available for LNbits.

LNbits is compatible with many Lightning Network wallets and can be on anything from a small VPS to a raspberry Pi on your home network or the LNbits SaaS platform.

## Why your funding source matters

There are trade-offs between the various funding sources, for example funding LNbits using Strike requires the user to KYC themselves and has some privacy compromises versus funding LNbits from your own LND node. However the technical barrier to entry and node maintenance of using Strike is lower than using LND.

## Self-custodial vs custodial connectors

### Self-custodial Funding Sources

You run the node or service, keep the keys, and may need to manage LN channels.
Good if you want control and have the skills to look after a server.
Examples: LND (gRPC/REST), CoreLightning, Spark.

### Self-custodial funding sources with an LSP

These funding sources offer a reasonable compromise between self-custody and some privacy trade offs.
Examples: Phoenixd, Breez SDK, Boltz.

### Custodial (or semi-custodial) funding sources

A third party runs the node. You plug LNbits into their API.
Setup is quick and costs are low, but you trust the provider with your funds and privacy.
Examples: Alby, OpenNode, Blink, ZBD, LNPay or another LNbits instance.

## Funding sources compared

Below is a summary of the main options and how they stack up.

## LNbits Lightning Network Funding Sources Comparison Table

| **Funding Source**         | **Custodial Type** | **KYC Required**    | **Technical Knowledge Needed** | **Node Hosting Required** | **Privacy Level** | **Liquidity Management** | **Ease of Setup** | **Maintenance Effort** | **Cost Implications**                        | **Scalability** | **Notes**                                                        |
| -------------------------- | ------------------ | ------------------- | ------------------------------ | ------------------------- | ----------------- | ------------------------ | ----------------- | ---------------------- | -------------------------------------------- | --------------- | ---------------------------------------------------------------- |
| LND (gRPC)                 | Self-custodial     | ❌                  | Higher                         | ✅                        | High              | Manual                   | Moderate          | High                   | Infrastructure cost and channel opening fees | High            | gRPC interface for LND; suitable for advanced integrations.      |
| CoreLightning (CLN)        | Self-custodial     | ❌                  | Higher                         | ✅                        | High              | Manual                   | Moderate          | High                   | Infrastructure cost and channel opening fees | High            | Requires setting up and managing your own CLN node.              |
| Phoenixd                   | Self-custodial     | ❌                  | Medium                         | ❌                        | Medium            | Automatic                | Moderate          | Low                    | Minimal fees                                 | Medium          | Mobile wallet backend; suitable for mobile integrations.         |
| Nostr Wallet Connect (NWC) | Custodial          | Depends on provider | Low                            | ❌                        | Variable          | Provider-managed         | Easy              | Low                    | May incur fees                               | Medium          | Connects via Nostr protocol; depends on provider's policies.     |
| Boltz                      | Self-custodial     | ❌                  | Medium                         | ❌                        | Medium            | Provider-managed         | Moderate          | Moderate               | Minimal fees                                 | Medium          | Uses submarine swaps; connects to Boltz client.                  |
| LND (REST)                 | Self-custodial     | ❌                  | Higher                         | ✅                        | High              | Manual                   | Moderate          | High                   | Infrastructure cost and channel opening fees | High            | REST interface for LND; suitable for web integrations.           |
| CoreLightning REST         | Self-custodial     | ❌                  | Higher                         | ✅                        | High              | Manual                   | Moderate          | High                   | Infrastructure cost and channel opening fees | High            | REST interface for CLN; suitable for web integrations.           |
| LNbits (another instance)  | Custodial          | Depends on host     | Low                            | ❌                        | Variable          | Provider-managed         | Easy              | Low                    | May incur hosting fees                       | Medium          | Connects to another LNbits instance; depends on host's policies. |
| Alby                       | Custodial          | ✅                  | Low                            | ❌                        | Low               | Provider-managed         | Easy              | Low                    | Transaction fees apply                       | Medium          | Browser extension wallet; suitable for web users.                |
| Breez SDK                  | Self-custodial     | ❌                  | Medium                         | ❌                        | High              | Automatic                | Moderate          | Low                    | Minimal fees                                 | Medium          | SDK for integrating Breez wallet functionalities.                |
| OpenNode                   | Custodial          | ✅                  | Low                            | ❌                        | Low               | Provider-managed         | Easy              | Low                    | Transaction fees apply                       | Medium          | Third-party service; suitable for merchants.                     |
| Blink                      | Custodial          | ✅                  | Low                            | ❌                        | Low               | Provider-managed         | Easy              | Low                    | Transaction fees apply                       | Medium          | Third-party service; focuses on mobile integrations.             |
| ZBD                        | Custodial          | ✅                  | Low                            | ❌                        | Low               | Provider-managed         | Easy              | Low                    | Transaction fees apply                       | Medium          | Gaming-focused payment platform.                                 |
| Spark (CLN)                | Self-custodial     | ❌                  | Higher                         | ✅                        | High              | Manual                   | Moderate          | High                   | Infrastructure cost and channel opening fees | High            | Web interface for CLN; requires Spark server setup.              |
| Cliche Wallet              | Self-custodial     | ❌                  | Medium                         | ❌                        | Medium            | Manual                   | Moderate          | Moderate               | Minimal fees                                 | Medium          | Lightweight wallet; suitable for embedded systems.               |
| Strike                     | Custodial          | ✅                  | Low                            | ❌                        | Low               | Provider-managed         | Easy              | Low                    | Transaction fees apply                       | Medium          | Third-party service; suitable for quick setups.                  |
| LNPay                      | Custodial          | ✅                  | Low                            | ❌                        | Low               | Provider-managed         | Easy              | Low                    | Transaction fees apply                       | Medium          | Third-party service; suitable for quick setups.                  |

## Which source suits you?

| Scenario                                    | Good fit                                                               | Why                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| **Business running its own infrastructure** | **LND or CoreLightning** on a Dell Optiplex or other dedicated machine | Full control, high throughput, best privacy.           |
| **Independent node runner**                 | **Spark (CLN) or LND (REST/gRPC)**                                     | You already run a node and want a clean web interface. |
| **Quick proof of concept**                  | **Alby, LNPay, or another hosted LNbits**                              | No hardware needed, lets you test ideas fast.          |

## Run LNbits

Ready to run LNbits?

Choose a funding source, follow the guides, and start today.

**[LNbits](https://lnbits.com/)**

## Further reading

- [LNbits documentation](https://docs.lnbits.org)
- [LND](https://github.com/lightningnetwork/lnd) – gRPC and REST guides
- [CoreLightning](https://github.com/ElementsProject/lightning) – setup and Spark info
- [Breez SDK](https://breez.technology/sdk/)
- [Phoenixd](https://github.com/ACINQ/phoenixd)
- [Nostr Wallet Connect](https://nwc.dev/)
