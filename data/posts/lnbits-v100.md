---
title: 'LNbits v1.0.0'
date: '2025-04-10T13:10:08.000Z'
summary: 'Out of Beta and Into the Future'
image: 'https://blossom.primal.net/1a104019732dd8325f68012e43f06cb94f1945a0716c5cf8bb88ae25f47dbbe2.jpg'
draft: false
---

After five years and over 6,000 commits, LNbits has reached a momentous milestone: Version 1.0.0 is here. LNbits is officially out of beta!

This release represents the five years relentless development, dedication, bug-hunting, feature-building, and community involvement. What started as a lightweight Lightning wallet application for Lightning Network payments has evolved into one of the most versatile, modular, and widely-used Bitcoin tools in the space.

We want to offer a heartfelt thank you to every contributor, developer, tester, and user—from those running LNbits for personal use to the communities and businesses who rely on it every day. Your feedback, bug reports, feature requests, and support have made LNbits what it is today.

## 🚀 Key Highlights in v1.0.0

- LNbits now at v1.0.0 – the software is stable, hardened, and production-ready.
- Vue 3 migration – a complete frontend overhaul for performance and long-term maintainability.
- WebSocket payments – faster and more efficient, replacing older SSE and long-polling methods.
- New lnbits.sh install script – simplifies setup and local deployment.
- Access Control Lists (ACL) – token-based permissions for powerful role and scope control.
- Admin tools:
  - Admin payments overview
  - Toggle outgoing payments
  - View payments from deleted wallets
- NWC (Nostr Wallet Connect) support
- Login with Nostr or OAuth – expanding integration and authentication options

## 💱 Fiat & Exchange Upgrades

- Custom exchange providers
- Improved fiat precision
- Wallet-level fiat tracking and labels
- Support for Bitpay and Yadio fiat rate providers

## 🧑‍🎨 UI / UX Improvements New Login/Register interface

- Default theme for new users
- Custom background images
- Visual refresh with new themes (including neon and light/dark modes)
- Revamped Pay Invoice dialog and invoice creation
- Custom wallet icons/colours
- CSV export and in-wallet payment filtering

## 🛠️ Developer Tools & Internal Enhancements Migration to pyjwt, updated to breez-sdk 0.6.6, pyln-client 24.5

- Support for Python 3.10–3.13
- New nodemanager for managing Lightning channels
- Backend refactors, improved database handling, type hinting, and extension logic
- More robust testing and CI support

## 🩹 Maintenance & Fixes Persistent fix for admin removal bug

- Improved extension handling
- Bug fixes across wallet logic, funding sources, and legacy compatibility
- Dozens of improvements to reliability, performance, and developer experience

## 🎉 A Huge Thank You

To every developer, translator, tester, UX contributor, node runner, and user: thank you.

LNbits wouldn’t be what it is without your involvement. Whether you've written code, opened issues, translated labels, or simply used it and given feedback—this release is yours too.

Here's to the next chapter!
