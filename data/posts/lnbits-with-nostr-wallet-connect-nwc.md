---
title: 'LNbits with Nostr Wallet Connect (NWC)'
date: '2025-05-13T10:54:32.000Z'
summary: 'Run Lightning apps with LNbits on your own home lightning node. Simple.'
image: 'https://blossom.primal.net/6c5f6c5b12e07ecedd5adc5c90ce7bd31646b5148c34611502b9d659431cda95.jpg'
draft: false
---

## Introduction

[Nostr Wallet Connect (NWC)](https://nwc.dev/) is a powerful open protocol built on Nostr that enables a connection between Bitcoin Lightning wallets and applications—offering strong privacy, user control, easy connection, open interoperability, and support for a wide range of use cases without needing port forwarding or other network configuration. It allows a user to use many different Lightning apps with their own Lightning node via NWC.

In this post, we’ll give an overview of NWC as well as how to use a home-hosted LNbits instance as a private funding source for a public LNbits instance—giving you the benefits of privacy, control, and simplicity, to unleash the full power of LNbits.

<iframe width="560" height="315" src="https://www.youtube.com/embed/0c77d2q-_PQ?si=qTmW-HGic8WjbXLh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Why Self-host with NWC?

- **Privacy**: Keep your Lightning node and LNbits instance at home, within your own network.
- **Ownership & Control**: Retain full custody of your funds, with no third-parties.
- **Security**: No port forwarding or VPN required—your node is not accessible from the public internet.
- **Simplicity**: Easy to set up and maintain.
- **Flexible Funding**: Fund your clearnet LNbits with any NWC-capable service—including your own LNbits instance, [Alby](https://alby.io/), [Minibits](https://minibits.cash/), [Coinos](https://coinos.io/), and more.
- **App Access**: Use LNbits at home as a Lightning wallet for one of the many NWC compatible apps.

## How It Works

Your home Lightning node (running Raspiblitz, Umbrel, Start9, MyNode or one of the many other node packages) runs LNbits. You enable the **NWCProvider** extension in LNbits and generate a connection string.

On your **clearnet LNbits instance** (hosted with the [LNbits SaaS](https://saas.lnbits.com) or on your own VPS), set this connection string as your funding source.

This lets you:

- Fund and use LNbits from anywhere
- Keep your node private
- Add or change funding sources at any time with minimal config

## How To Set It Up

### 1. Install LNbits at Home

Use a Raspiblitz, MyNode, Umbrel or other node package to run your home LNbits instance. You can also build your own node with Phoenixd and LNbits or any other combination of LNbits and Lightning node software.

- Enable the `NWCProvider` extension

- Create a new NWC connection

  ![](https://blossom.primal.net/5569dc0c056bb257a57e4e03f8ac6bb432aa4884eb19766024feca64e3857fe9.jpg)

- Copy the **NWC connection string**

  ![](https://blossom.primal.net/0933eda8be45bef5a1958fce366f7ba0ea12df972703e41e2ee0f7a36b295ad7.jpg)

### 2. Provision a Clearnet LNbits Instance

Use:

- [LNbits SaaS](https://saas.lnbits.com/)
- Your own VPS on a VPS provider like [Vultr](https://www.vultr.com/), [Linode](https://www.linode.com/), [AWC EC2](https://aws.amazon.com) and install LNbits

---

### 3. Connect via NWC

On your clearnet LNbits instance:

- Go to **Settings → Funding**

- Select **"Nostr Wallet Connect"**

- Paste your copied NWC connection string

- Click **Save**, then **Restart Server**

  ![](https://blossom.primal.net/cf3333630fe3fa38831d67a38cb0500932dbdd010b99465df970c319e69a52e0.jpg)

---

Done! 🎉 Your clearnet LNbits instance is now funded by your home Lightning node—no open ports, no VPN, no fuss.

## Home Nodes

You can use this setup with **any LNbits-compatible home Lightning node**, including:

- [Raspiblitz](https://raspiblitz.org/)
- [Start9](https://start9.com/)
- [Umbrel](https://getumbrel.com/)
- [MyNode](https://mynodebtc.com/)
- Your own home server box with LNbits plus any other Lightning funding source for example [Phoenixd](https://github.com/ACINQ/phoenixd), [Core-Lightning](https://github.com/ElementsProject/lightning), [LND](https://github.com/lightningnetwork/lnd), etc.

## Try it Out

Want to try this yourself?

- 🧠 Enjoy **control**, **privacy**, and **simplicity**
- 🌍 Use LNbits on the clearnet with funding from your own node
- 🔌 Connect apps like [Alby](https://getalby.com/), [Minibits](https://minibits.cash/), [Coinos](https://coinos.io/), or your own LNbits

## 🚀 Run LNbits

Start exploring the power of NWC and LNbits today:

- 🌐 [Use the LNbits SaaS](https://saas.lnbits.com/)
- 🧰 [Self-host](https://github.com/lnbits/lnbits)
- 💬 [Join the LNbits community on Telegram](https://t.me/lnbits)

### NWC Apps

Here are some great apps that make use of NWC.

- [**Alby Go**](https://albygo.com/)
  - A lightning wallet that uses one or many NWC providers to make and receive lightning payments
- [**Damus**](https://damus.io/)
  - Decentralised social app on Nostr
- [**Amethyst**](https://amethyst.app/)
  - Android Nostr social media client client
  - Clean interface, popular among mobile users
- [**Snort**](https://snort.social/)
  - Web-based Nostr client
  - Familiar UI, easy access via browser
- [**Stacker News**](https://stacker.news/)
  - Bitcoin-centric news/discussion site
  - Earn sats via upvotes
  - [**Zeus**](https://zeusapp.io/)
  - Mobile app for controlling your own Lightning node
  - Favoured by self-custody and privacy-focused users

## Resources

- 🔗 [Nostr Wallet Connect (NWC)](https://nwc.dev/)
- ☁️ [LNbits SaaS](https://saas.lnbits.com/)
- 🛠️ [LNbits GitHub](https://github.com/lnbits/lnbits)
- 📘 [Phoenixd on GitHub](https://github.com/ACINQ/phoenixd)
- 💬 [Telegram Community](https://t.me/lnbits)
