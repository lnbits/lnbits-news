---
title: 'Phoenixd and Arkade funding sources added to LNbitsBox'
date: '2026-05-07T10:32:34.000Z'
summary: 'LNbitsBox version 0.9.9 adds Phoenixd and Arkade support alongside Spark'
image: '/static/images/articles/lnbitsbox-ark-phoenix/banner.png'
draft: false
---

LNbitsBox version `0.9.9` adds support for two new funding sources: **Phoenixd** and **Arkade**.

LNbitsBox users can now choose between Spark from Lightspark, Phoenixd from ACINQ, Ark through Arkade, or bring their own funding source and connect it to LNbits.

This gives users more flexibility when deciding how their self-hosted LNbitsBox should connect to Bitcoin and Lightning.

## More ways to fund LNbitsBox

![Spark logo](/static/images/articles/lnbitsbox-ark-phoenix/spark.png)

### Spark

Spark remains available as a funding source for LNbitsBox. It offers a straightforward way to get started with self-custodial Lightning payments, without needing to run a traditional Lightning node from scratch.

![Phoenixd logo](/static/images/articles/lnbitsbox-ark-phoenix/phoenix.png)

### Phoenixd

Phoenixd support brings ACINQ’s Phoenix daemon to LNbitsBox.

Users can now choose Phoenixd during setup and run LNbits with Phoenixd as the funding source behind their wallets, extensions, and payment tools.

![Arkade logo](/static/images/articles/lnbitsbox-ark-phoenix/arkade.png)

### Arkade

Arkade support adds an Ark-based funding source option to LNbitsBox.

Ark is another approach to Bitcoin scaling and payments, and Arkade gives LNbitsBox users a way to use Ark on their own hardware while still using the familiar LNbits interface, extensions, wallets, and APIs.

## Choose the setup that suits you

Different users need different funding models.

Some users want the simplest setup possible. Others want to try newer Bitcoin payment infrastructure, or connect LNbitsBox to a Lightning node or wallet backend they already run.

Each built-in funding source has different tradeoffs. Phoenixd has channel opening fees as liquidity is created. Ark payments can have a minimum payment size and with Spark users should understand how exits work, including cases where not every leaf may be immediately exit-ready. LNbitsBox gives users the choice, so they can pick the model that best fits their needs.

LNbitsBox version `0.9.9` now supports:

- Spark
- Phoenixd
- Arkade
- your own funding source

That makes LNbitsBox useful across home setups, small businesses, event deployments, development environments, and Bitcoin payment experiments.

## LNbits as the application layer

Once a funding source is connected, LNbits gives you wallets, user accounts, extensions, APIs, point-of-sale tools, payment links, exports, and more from one interface.

LNbitsBox packages that into a dedicated device with an admin control panel, remote access options, scheduled backups, restore support, and a NixOS-based system designed to be reproducible and maintainable.

The addition of Phoenixd and Arkade makes that application layer more flexible.

## Available in version 0.9.9

Phoenixd and Arkade funding source support is available now in LNbitsBox version `0.9.9`.

This release is another step towards making LNbitsBox a practical self-hosted Bitcoin payments device: simple enough to get running, flexible enough for builders, and open enough to support different funding models as the ecosystem develops.

Find out more at [box.lnbits.com](https://box.lnbits.com/).
