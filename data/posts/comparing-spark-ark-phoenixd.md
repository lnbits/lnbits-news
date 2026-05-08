---
title: 'Spark, Arkade and phoenixd: simpler Lightning payments for LNbits'
date: '2026-05-08T08:00:00.000Z'
summary: 'A practical comparison of Spark, Arkade and phoenixd as funding sources for LNbits, looking at self-custody, unilateral exit, fees, privacy and operational trade-offs.'
image: '/static/images/articles/spark-ark-phoenixd-comparison.png'
draft: false
---

LNbits supports 20+ funding sources, including popular Lightning node backends such as Core Lightning (CLN) and LND, giving users the choice to connect their own infrastructure or use a simpler backend that hides more of the operational complexity.

Running Lightning infrastructure has traditionally meant running a Lightning node, managing channels, thinking about inbound liquidity, monitoring peers, backing up state and other operational tasks.

A new group of Lightning and Lightning compatible Bitcoin L2 options have appeared on the scene **Spark** from Lightspark, an Ark implementation, **Arkade**, and **Phoenixd** from ACINQ that remove a lot of the operational complexity of running a Lightning wallet.

They each work differently, but acheive a similar goal:

> Make Bitcoin and Lightning payments easier to use, while keeping a good degree of self-custody and avoiding traditional Lightning node management.

This article compares them from LNbits' point of view.

## The basic idea

With a normal Lightning node, the operator needs to think about opening channels, inbound liquidity, routing, backups and force closes. That is fine for experienced node runners, but it is not ideal for peopple who just want to make and receive Lightning payments without the operational overhead.

Spark, Arkade and phoenixd take different approaches.

| Funding source       | What it is                                                      | Why it matters for LNbits                                          |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Lightspark Spark** | A Bitcoin L2 using offchain ownership transfer                  | Lightning payments via SSP with unilateral exit onchain            |
| **Arkade Ark**       | Ark protocol using virtual UTXOs (VTXOs)                        | Lightning payments with a swap service and unilateral exit onchain |
| **ACINQ phoenixd**   | A lightweight Lightning daemon with automatic channel liquidity | Real Lightning payments without running a full node manually       |

All three can make LNbits easier to run. The trade-offs are different.

## ACINQ phoenixd

Phoenixd is probably the easiest to understand if you already know Lightning.

It is a daemon (the "d" in "Phoenixd") from ACINQ that gives you a self-custodial Lightning wallet. LNbits can use it as a funding source, while Phoenixd handles much of the Lightning complexity underneath.

The main benefit is that Phoenixd speaks Lightning directly. It can pay Lightning invoices and receive Lightning payments in a familiar way. For LNbits, that makes it a practical option for users who want real Lightning payments without running and managing a full Lightning node.

The trade-off is liquidity.

Phoenix still has to deal with the realities of Lightning channels. ACINQ helps automate this, but [there are fees for inbound liquidity, channel creation, splicing, swaps and routing](https://phoenix.acinq.co/server/auto-liquidity#fees). Users do not need to manage channels manually, but the channel model has not disappeared.

Phoenixd is a strong option when the goal is simple, working Lightning payments with the least amount of technical setup.

### Phoenixd strengths

- Mature Lightning-based approach
- Self-custodial seed
- Simple daemon and API
- Good fit for LNbits funding
- No manual channel management for normal users
- Strong practical choice for shops, events and home servers

### Phoenixd trade-offs

- Depends heavily on ACINQ as the Lightning Service Provider
- Liquidity and channel-related fees can surprise users
- Privacy is not the same as running your own independent Lightning node
- Still inherits some Lightning channel-close and onchain fee realities

## Lightspark Spark

Spark takes a different approach.

Rather than asking every user to run Lightning channels, Spark uses a Bitcoin sidechain based around offchain ownership transfer. The goal is to make payments instant, cheap and simple, while still giving users a way to exit back to Bitcoin.

For LNbits, this is interesting because it offers a smooth user experience. A user can run LNbits, use Spark as a funding source and use the Spark SSP for Lightning payments.

Spark is designed to be self-custodial, but it does involve Spark Service Providers (SSPs). The normal payment flow depends on operator infrastructure, while the user retains the ability to exit without cooperation from the SSP.

The key concept is **unilateral exit**. If the operator becomes unavailable or refuses to cooperate, the user should still be able to exit back to Bitcoin onchain. However, the concept of "leafs" means that [some funds may be stuck in the sidechain if exit fees exceed the value of the leaf](https://docs.spark.money/wallets/unilateral-exit).

### Spark strengths

- No Lightning channel management for the user
- Self-custodial design
- Unilateral exit path with limits
- Good fit for consumer-style Bitcoin payment apps
- Potentially very low-cost small payments

### Spark trade-offs

- Depends on Spark Service Providers (SSPs) for operation
- Emergency exit will be slower or more expensive than normal use due to HTLC and onchain fees
- Not self-custodial in the same way as controling keys for a Bitcoin L1 UTXO

## Arkade Ark

Arkade is based on the Ark protocol.

Ark uses **VTXOs**, or virtual UTXOs. These are offchain Bitcoin-style outputs that are ultimately backed by Bitcoin transactions. Users can make fast payments within the Ark, but still have a route back to Bitcoin if needed.

From an LNbits point of view, Arkade is interesting because it gives LNbits another way to make Bitcoin payments simple without asking the user to run a Lightning node.

The biggest trade-off is economic exit.

Ark thinks in UTXO-like objects, VTXOs. A VTXO may be technically withdrawable, but if it is small and onchain fees are high, exiting it may not economically viable. In some cases, the cost of getting a small VTXO back onchain could be larger than the value of the VTXO itself.

That does not make Arkade uninteresting. It just means users need to understand the minimum payment size and exit-cost trade-off.

### Arkade strengths

- Bitcoin-native VTXO model
- Self-custodial design
- Unilateral exit path
- No traditional Lightning channel management
- Interesting for developers and programmable payment flows
- Good fit for experimenting with newer Bitcoin payment infrastructure

### Arkade trade-offs

- Small VTXOs may be uneconomic to exit
- Users may need to understand minimum payment sizes
- Lightning payments use Boltz swaps rather than native Lightning channels

## Comparison table

| Factor                             | Lightspark Spark                                                                                          | Arkade / Ark                                                                              | ACINQ Phoenix / phoenixd                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Basic model**                    | Bitcoin L2 using statechain-style ownership transfer                                                      | Ark protocol using VTXOs — virtual UTXOs inside shared onchain batches                    | Lightning node/daemon with ACINQ handling liquidity                           |
| **Best fit**                       | Smooth app/user payments without channel management                                                       | Experimental Bitcoin-native payments, VTXOs, programmable payment flows                   | Practical Lightning payments with minimal node admin                          |
| **Custody**                        | Self-custodial, but depends on Spark operators/signers for normal operation                               | Self-custodial VTXO model; operator coordinates but should not be able to steal funds     | Self-custodial seed; ACINQ acts as LSP/channel counterparty                   |
| **Trust assumption**               | Generally described as **1-of-n honest operator**                                                         | Operator cannot spend alone, but users depend on correct VTXO state and exit transactions | Trust-minimised Lightning model, but operational dependence on ACINQ          |
| **Unilateral exit**                | Available; emergency exit to Bitcoin L1 after timelock                                                    | Core part of the VTXO design                                                              | Standard Lightning channel close model                                        |
| **Unilateral exit weakness**       | May be slower/costlier than normal exit; older funds may need re-depositing to enable latest exit support | Can require several onchain transactions; small VTXOs may be uneconomic to exit           | Onchain close fees apply; abstracted UX means users may not think in channels |
| **Security maturity**              | Promising but newer                                                                                       | Promising but newer and more complex                                                      | Most mature of the three in real-world Lightning use                          |
| **Privacy**                        | Offchain activity helps, but operators may see metadata                                                   | Batched VTXOs help, but operator/coordinator metadata still matters                       | Convenient, but ACINQ may learn more than a fully independent Lightning node  |
| **Cost profile**                   | Likely cheap for frequent small payments; watch bridge, operator and exit fees                            | Cheap inside Ark; swaps/exits can add cost                                                | Lightning routing plus liquidity/channel costs                                |
| **Main fee risk**                  | Exit/onchain costs; provider/operator fees                                                                | Small VTXOs becoming uneconomic to exit during high-fee periods                           | Inbound liquidity/channel-opening cost; outgoing Lightning fees               |
| **Lightning compatibility**        | Via integration/bridging                                                                                  | Via swaps/submarine swap-style flows                                                      | Native Lightning                                                              |
| **Bitcoin onchain compatibility**  | Deposit and exit to L1                                                                                    | VTXOs ultimately backed by Bitcoin transactions                                           | Swap-in, swap-out, channel close                                              |
| **Channel management**             | None for end user                                                                                         | None in the Lightning-channel sense                                                       | Abstracted away by phoenixd/ACINQ                                             |
| **Minimum payment / dust concern** | Less obvious to user, but exit economics still matter                                                     | Important: very small VTXOs can be problematic                                            | Less about minimum payment, more about liquidity economics                    |
| **Operational complexity**         | Low for user; integration complexity depends on SDK/API                                                   | Higher conceptual complexity                                                              | Low-to-medium; daemon plus API                                                |
| **Developer experience**           | Good for app-style payments if SDK/integration fits                                                       | Interesting for advanced Bitcoin app/payment design                                       | Simple HTTP API; straightforward as LNbits funding source                     |
| **Failure mode to understand**     | Operator unavailable/censoring → unilateral exit path                                                     | Operator unavailable/censoring → exit VTXOs, but fee economics matter                     | ACINQ/liquidity/routing issues; channel close if needed                       |
| **Best marketing phrasing**        | “Simple, self-custodial Bitcoin payments without managing Lightning channels.”                            | “Ark/VTXO payments with fast offchain use and a Bitcoin exit path.”                       | “A self-custodial Lightning daemon with automatic liquidity.”                 |
| **Main caution to disclose**       | Newer model; exit path exists but may not feel instant or cheap                                           | Small payments/VTXOs may not always be economical to exit onchain                         | Channel-opening/inbound liquidity fees can surprise users                     |
| **For LNbitsBox**                  | Good “easy mode” if integration is stable                                                                 | Good experimental/advanced option                                                         | Best practical default today                                                  |

## Self-custody is not all the same

It is tempting to put all three options in the same bucket and say they are self-custodial.

That is broadly true, but the details matter.

With phoenixd, the user has a Lightning wallet seed and ACINQ handles much of the liquidity experience. It is still Lightning, with Lightning’s channel model underneath.

With Spark, the user has an offchain Bitcoin L2 balance with an exit path. Operators help with normal transfers, but should not be able to simply take the user’s funds.

With Arkade, the user controls VTXOs that can be exited back to Bitcoin, but the value and practicality of that exit depends on onchain fees and the size of the VTXOs.

So the better question is not simply:

> Is it self-custodial?

The better questions are:

- Can the operator steal the funds?
- Can the operator censor the user?
- Can the user exit without permission?
- How long does exit take?
- What does exit cost?
- Is exit still economical for small balances?
- What metadata does the operator learn?
- How easy is recovery for a normal user?

Those are the questions that matter for LNbits users.

## Privacy

None of these options should be described as perfect privacy tools.

They can all improve the user experience by keeping activity away from constant onchain transactions, but each has a coordinator, operator or service provider that may learn something.

With phoenixd, ACINQ is involved as the Lightning Service Provider. That makes the experience much easier, but it can reveal more than running a fully independent Lightning node. ACINQ may learn about payment patterns, channel activity and other metadata.

With Spark, operators are part of the normal payment flow. The system is designed so operators cannot simply take user funds, but metadata still matters. The Spark SSP could learn about payment patterns, balances and other activity and block Lightning payments if they wanted to. Any technical issues with the SSP could also impact the ability to make or receive Lightning payments. The unilateral exit path is a safety valve, but it is not designed for normal use.

With Arkade, the operator coordinates activity around VTXOs. Batching can help, but coordinator visibility and payment patterns are still relevant. The Boltz swap service used for Lightning payments also involves a third party that may learn about payment patterns and activity. The swap service could be unavailable for periods of time, which could impact the ability to make or receive Lightning payments.

For most everyday LNbits users, these privacy trade-offs may be acceptable. For users with a strong privacy requirement, they should be explained clearly.

## Fees and small payments

This is one of the most important differences.

phoenixd has the most familiar cost model. It uses Lightning, so users need to think about routing fees, liquidity and channel-related costs. The good thing is that the model is practical and already works well for many use cases. The bad thing is that inbound liquidity can cost money, especially when receiving payments.

Spark aims to make small payments cheap and simple. That is one of its strongest selling points. But users should still understand that exits, swaps or service-provider fees apply.

Arkade may be cheap for offchain use, but small VTXOs are the key issue. A tiny VTXO may be fine while it remains offchain, but not worth exiting onchain during high-fee periods. The use of Boltz for Lightning payments also means there is a minimum payment size of around 300 sats and there are fees for swaps.

## Which should LNbits users choose?

There is no single answer.

For a user who wants the most practical Lightning setup today, **Phoenixd** is probably the best starting point. It is simple, self-custodial, and speaks Lightning directly.

For a user who wants the smoothest possible payment experience and is happy using newer Bitcoin L2 infrastructure, **Spark** is very promising.

For a user who wants to experiment with Ark, VTXOs and newer Bitcoin-native payment flows, **Arkade** is the most interesting option.

## Why this matters for LNbits

LNbits works best when users can choose the funding source that fits them.

Some people already run a serious Lightning node. They can connect LNbits to that.

Some people want a simple home server. They may prefer phoenixd.

Some people want newer Bitcoin payment infrastructure with fewer channel headaches. They may prefer Spark or Arkade.

Some people want to try all of them.

That is the value of LNbits as a wallet and accounts system. The user interface, extensions and API can stay familiar, while the funding source underneath can change.

## Conclusion

Spark, Arkade and Phoenixd are different technologies, but they point in the same direction.

They make Bitcoin and Lightning payments easier to use without asking every user to become a Lightning node operator.

For LNbits and LNbitsBox these funding sources provide flexibility. More funding sources means more ways to run LNbits, more ways to experiment, and more ways to make self-custodial payments usable for normal people.
