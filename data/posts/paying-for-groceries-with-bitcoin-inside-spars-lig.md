---
title: 'Paying for Groceries with Bitcoin: Inside SPAR’s Lightning Rollout with DFX and LNbits'
date: '2025-05-07T09:37:35.000Z'
image: 'https://blossom.primal.net/b5176d50d5bd77d0840ef9f802444cb9120ece741353a2e6ba354814ea0b8a34.jpg'
draft: false
---

Across Switzerland, customers at SPAR supermarkets are now able to pay for their groceries using Lightning on Bitcoin — a step towards everyday Bitcoin adoption. This rollout was led by DFX, a Bitcoin services company focused on onboarding businesses and individuals to Bitcoin. Behind the scenes LNbits plays a key role.

![](https://blossom.primal.net/4fe568f3f89c8f2e8037334fa46021101dc5e2ac39d9594941381e6dbc316a7e.jpg)\## Lightning at the Checkout

SPAR’s approach is simple: at the till, customers can scan a static QR code to pay in Bitcoin using the Lightning Network. Each checkout in each participating store has its own unique LNURL address — a reusable QR code designed for fast, low-friction Lightning payments.

To manage these LNURLs, DFX leverages LNbits. Using the LNbits **Pay Links** extension, DFX generates LNURLs for each till across the network of participating SPAR locations. The result is a robust, reliable setup that works at scale. Store staff do not interact with LNbits directly — instead, DFX manages the backend, ensuring each till has a dedicated LNURL without operational overhead for SPAR employees.

> _At SPAR we use static QR codes that meet the LNURL standard. Therefore we use LNbits. Each checkout has its own personal LNURL address which we generate with LNbits._

— Cyrill Thommen, CEO of DFX.Swiss— Cyrill Thommen, CEO of DFX.Swiss

![Customer scanning LNURL QR code at till](https://cdn.satellite.earth/81b6632ae9337f44b0436168a03c2e52c3d86aaece1f37642b8c66859c4c65d9.jpg)## LNbits in Action

LNbits provided DFX with a modular, open-source solution that allows them to build only what they need, without locking into a rigid platform. For instance, DFX built custom monitoring around payment events using the LNbits API, while keeping full control over wallet infrastructure.

The ability to generate and manage LNURLs through the LNbits API, while layering additional monitoring and business logic on top, made LNbits a practical choice.

DFX’s setup highlights how open source software, Bitcoin and purpose-built tools can underpin enterprise-grade deployments. The system works reliably — without introducing friction for customers or staff.

## Bitcoin in the Real World

Switzerland is already one of Europe’s most Bitcoin-friendly environments, with over 1,000 businesses accepting Bitcoin. But SPAR’s implementation is noteworthy for its scale and practicality: everyday purchases, completed with Bitcoin, at a national supermarket chain.

LNbits' flexible architecture, API-first design, and plug-in system make it well suited to precisely this kind of adoption.

As more retailers explore Lightning integration, SPAR’s rollout sets a precedent — showing how modular, open-source tools like LNbits can bring Bitcoin into daily life, seamlessly.

![DFX.Swiss](https://cdn.satellite.earth/e9ec430e790491077051d64b6d500331401faffe5e621a4ad55157c331d154c0.png)
