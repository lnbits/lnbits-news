---
title: 'LNBits TPoS extension, now with Fiat Stripe Tap-to-Pay '
date: '2025-11-08T07:42:15.000Z'
summary: 'Open the Android App and scan the TPoS QR to pair. From then on, tap-to-pay fiat and Lightning live together.'
image: 'https://github.com/DoktorShift/images/blob/main/TPoS_Articel_Fiat.jpg?raw=true'
draft: false
---

Running two payment systems always felt like a compromise. Card payments here, Bitcoin payments there, staff shuffling between apps while the line slowed down. With the latest TPoS release, that split vanishes. **Stripe Tap-to-Pay on Android and Lightning now live together in one flow.**

> **One checkout, two rails.**

TPoS has always been a shareable, browser-based point of sale - safe for staff, fast for lines, and simple to roll out across branches. **Now it gets a new dimension.**

- **Stripe Tap-to-Pay**: Guests tap a regular credit card or phone and the payment clears instantly - no dongles, no extra hardware.

- **Lightning built-in**: still a first-class citizen on the same screen. That includes tap-to-pay with [**BOLT Cards**](https://shop.lnbits.com/product/lnbits-boltcards), giving Bitcoin users the same effortless gesture as fiat.

The result is a single, predictable checkout rhythm for your team and a clean export for accounting.

Have a look:  
https://x.com/lnbits/status/1974218832077054315

## What it feels like at the counter

In practice, the flow is boring - in the best possible way.

**Tap. Beep. Next.**

A phone becomes the terminal; cards clear in a blink. Guests who prefer Bitcoin just tap or scan, and it feels exactly the same. Tips land in the right wallet, items ring up from a tidy catalog, taxes behave exactly as configured.

## Getting set up (quickly)

Requirements:

- LNBits Instance **v1.3** or later
- Verified Stripe Account
- Android Device with NFC support
- Stable Internet connection

Setup is designed as a one-time pass:

1. **In LNbits → Settings → Fiat provider**

   Add your Stripe secret key and webhook with permissions for _Checkout_ and _Payment Intents_.

2. **Install the TPoS Wrapper (.apk)**

   on an Android device and create a Stripe Terminal Location in your Stripe dashboard.

   https://github.com/user-attachments/assets/0b3301d7-9ad5-4101-96ec-e899e2de28e8

3. **Create an ACL token in LNbits**

   with fiat scope, open your TPoS record, and add the Terminal Location ID and ACL token via the QR dialog.

   https://github.com/user-attachments/assets/ff07350e-8a3f-498e-aaef-40776442a9aa

4. **Open the Android wrapper**

   and scan the TPoS QR to pair. From then on, tap-to-pay and Lightning live together.

   https://github.com/user-attachments/assets/966fec79-37a0-49da-bc9d-4458af275dda

## Try it

Enrage your TPoS, connect Stripe, and pair an Android device with the wrapper. From that point forward, it’s one link on the counter and one routine for the team — **fiat and Bitcoin tap-to-pay, side by side.**

---

📺 **Youtube**

https://www.youtube.com/watch?v=8w4-VQ3WFrk

**Resources:**

📂 [GitHub Repo for Stripe Integration](https://github.com/lnbits/TPoS-Stripe-Tap-to-Pay-Wrapper)

📂 [Download APK Wrapper](https://github.com/lnbits/TPoS-Stripe-Tap-to-Pay-Wrapper/releases)

📂 [GitHub Repo TPoS](https://github.com/lnbits/tpos)

📃 [Read more Articels about LNBits](https://news.lnbits.com)

**Support & Help to Grow**

💜 [LNBits Shop](https://shop.lnbits.com) - Need a PoS Hardware Device? We've got your back.

🔁 Like/Share/Subscribe this Content & spread the word.
