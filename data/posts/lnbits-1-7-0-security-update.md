---
title: 'LNbits 1.7.0: security update and upgrade guidance'
date: '2026-11-10T12:00:00.000Z'
summary: 'Upgrading to LNbits 1.7.0. Read LNbits security update and recovery guidance.'
image: '/static/images/articles/lnbits-1-7-0-security-update.png'
draft: false
---

Following the recent vulnerability in LNbits discovered on 8 November **all operators must upgrade to [LNbits 1.7.0](https://github.com/lnbits/lnbits/releases) before running LNbits**. Versions prior to 1.7.0 are affected, and funds running on prior versions of LNbits are at risk of being stolen.

Version 1.7.0 includes security fixes in response to this incident. As well as updating your LNbits instance, please take the recovery steps below. Credentials exposed before the upgrade may still give an attacker access afterwards.

We will follow up with full details of the exploit in a separate report.

## What operators should do

1. **Prefer a fresh server.** If you suspect a compromise; install LNbits on a new server and install 1.7.0 on it. Updating alone cannot remove access an attacker may already have gained. Preserve relevant logs and records before replacing the old server.
2. **Rotate all user keys.** Logged in as **Super Admin** Open **Settings → Users**, select **Reset Wallet Keys** and confirm the action. Existing keys will stop working; users must update any connected apps and integrations with their new keys.
3. **Replace funding-source credentials.** Revoke and replace credentials at the funding source: Rotate API keys / macroons etc. depending on your funding source. Then update the funding-source settings in LNbits.
4. **Rotate other secrets.** Replace any other sensitive credentials stored in settings. Treat any secrets stored in your LNbits settings as compromised.
5. **Review connected apps and integrations.** Revoke / delete any existing extension connections and create new connections with updated credentials. Extentions that have connections are listed below:
   - NWC Provider
   - LNDHub
   - Bolt Cards
   - TPOS
   - Bleskomat
   - FOSSA

## Managing live funds

LNbits is a hot wallets. Hot wallets carry risk as the credentials needed to spend funds are available to an online system. With the increase in AI-driven attacks, the risk of compromise is higher than ever. Always assume that any online system can be compromised.

**Keep only the funds needed for day-to-day operations online, regularly review balances and outgoing payments, and send excess funds to an onchain wallet whose spending keys are kept offline.**
