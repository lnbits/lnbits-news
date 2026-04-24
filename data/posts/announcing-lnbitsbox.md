---
title: 'Announcing LNbitsBox'
date: '2026-04-24T10:32:34.000Z'
summary: 'Plug-and-play LNbits'
image: '/static/images/articles/lnbitsbox/lnbits-box-on-desk.DFA1PMcf.jpg'
draft: false
---

The LNbitsBox is now available at [box.lnbits.com](https://box.lnbits.com/).

LNbitsBox is a small dedicated device for running LNbits with a self-custodial Lightning wallet. Plug it in, open the setup page in your browser, choose how you want to fund it, and start using LNbits from your own hardware.

LNbits has always been about making Lightning useful. Wallets, extensions, payment tools, point-of-sale apps, user accounts, APIs, and business workflows can all run from one LNbits instance. LNbitsBox makes that easier to put on a desk, behind a counter, at an event, or on a home network.

## LNbits, ready to run

LNbitsBox is designed for people who want the control of self-hosting without having to assemble the whole stack from scratch.

It comes with LNbits installed, a browser-based setup flow, and an admin control panel for managing the device. From there, you can configure access, manage backups, restore from recovery snapshots, and choose how the box connects to Lightning.

It is suitable for home users, builders, merchants, cafés, stalls, event organisers, and anyone who wants to run LNbits on hardware they control.

## Admin control panel

LNbitsBox includes an admin control panel for managing the device without needing to SSH in for everyday management tasks, the control panel gives you the tools to manage the device from the browser.

![Configure](/static/images/articles/lnbitsbox/how-it-works-configure.jpg)

From the admin panel you can handle setup, view device status, manage configuration, and control important operational features such as remote access and backups.

![Monitor](/static/images/articles/lnbitsbox/how-it-works-monitor.jpg)

The aim is simple: keep the power of a self-hosted LNbits system, but make the everyday administration clear and manageable.

## Remote access over clearnet and Tor

LNbitsBox can be used locally on your own network, but many users also need access while away from the box.

Remote access support includes both clearnet and Tor options, so you can choose the access model that fits your needs. A shop may want a straightforward public address. A home user or builder may prefer Tor access.

You stay in control of where and how the box is reachable.

## Scheduled backups and restore

Self-custody needs good recovery tools.

LNbitsBox includes scheduled backups and restore support from the admin panel. Backups can be created regularly, and restore tools are available when you need to recover a previous state.

For users running payment systems, this matters. A Lightning setup should not rely on memory, guesswork, or a forgotten command typed months ago. Backups should be part of the system from the start.

## Funding sources: Spark, Phoenix, Ark, or bring your own

LNbits supports a growing range of funding sources, and LNbitsBox is designed around that flexibility.

You can use modern Lightning funding options such as Spark, Phoenix, and Ark, depending on your preferred setup and requirements. These options make it easier to get started without running a full traditional Lightning node from day one.

More advanced users can bring their own funding source and connect LNbits to the infrastructure they already run.

That means LNbitsBox can work for very different users:

- a home user who wants a simple self-custodial Lightning wallet
- a café that wants to accept Bitcoin payments
- an event organiser who needs multiple wallets and point-of-sale devices
- a developer building with the LNbits API
- a Bitcoiner who already runs infrastructure and wants LNbits as the application layer

## Built on NixOS

LNbitsBox is based on NixOS.

That matters because a box handling money should be predictable. NixOS uses declarative system configuration, which means the operating system, services, packages, and settings can be described in a reproducible way.

Instead of a machine that slowly drifts over time as packages are installed and changed by hand, a NixOS-based device can be built from a known configuration. This makes development, testing, upgrades, and recovery more reliable.

For LNbitsBox, the benefits are practical:

- reproducible builds and running environments
- clearer system configuration
- safer upgrades
- easier debugging
- a better foundation for long-running payment infrastructure

A money node should be boring in the right places. It should boot, run the services it is meant to run, and be recoverable when something goes wrong. NixOS gives LNbitsBox a strong base for that.

## For homes, shops, builders, and events

LNbitsBox is not only a wallet. It is a way to run the LNbits ecosystem on your own hardware.

For home users, it can be a private Lightning wallet and a place to explore LNbits extensions.

For merchants, it can run payment tools, point-of-sale flows, user wallets, and exports.

For event organisers, it can support multiple wallets, stalls, devices, and payment setups from one controlled system.

For developers, it provides a ready LNbits environment with APIs and extensions available without needing to rebuild the stack each time.

## Plug in. Use Bitcoin.

LNbitsBox is intended to make self-hosted LNbits more approachable while keeping the parts that matter: control, self-custody, flexibility, and open-source software.

It gives you a small dedicated device for running LNbits, with admin tools, remote access, backups, restore, modern funding source options, and a reproducible NixOS base.

You can find it at [box.lnbits.com](https://box.lnbits.com/).
