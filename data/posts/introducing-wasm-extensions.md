---
title: 'Introducing WASM extensions'
date: '2026-09-21T11:19:00.000Z'
image: '/static/images/articles/introducing-wasm-extensions/hero.jpg'
summary: 'LNbits now supports sandboxed WebAssembly extensions. Here is what WASM extensions are, why we built them, and what they mean for the LNbits extension ecosystem.'
draft: false
---

Extensions have always been an important part of LNbits.

Rather than trying to put every possible feature into LNbits core, extensions allow developers to build applications on top of LNbits: point-of-sale systems, paywalls, tipping tools, games, payment utilities and plenty more.

LNbits v1.6.0 introduced a new way to build them: **WASM extensions**.

WASM extensions run application logic inside a WebAssembly sandbox, with LNbits controlling what that application is allowed to access. Instead of giving an extension the same level of trust as normal server-side application code, a WASM extension requests specific capabilities such as storing data, creating an invoice or watching for a payment.

This is more than simply supporting another programming language. It changes the trust model for LNbits extensions.

Watch Ben Arc's announcement and introduction to LNbits WASM extensions.

<iframe width="560" height="315" src="https://www.youtube.com/embed/YmArC9L7FB4?si=if_VCz3mg7qzXekF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What is WebAssembly?

WebAssembly, usually shortened to **WASM**, is a portable binary format designed to execute code inside a controlled runtime.

You can think of it as a small program running inside a box.

The program can calculate things and process data, but it cannot simply reach out and use everything available on the machine running it. The application hosting the WASM module decides what functionality is exposed to it.

The idea is similar to how Android apps are sandboxed, with permissions controlling access to features such as the camera or location. For a WASM extension, LNbits controls access to capabilities such as wallet information or payments. The underlying mechanisms differ, but the principle is the same: running an application does not give it unrestricted access to the system.

That makes WASM particularly useful for plugin systems.

LNbits can effectively say to an extension:

> You can run this code, but these are the only doors through which it can interact with the rest of the system.

For LNbits this is very powerful as LNbits manages sensitive operations like Lightning wallets and payments, where running untrusted code directly could pose significant risks.

Examples of capabilities that a WASM extension might request include:

- Store and retrieve data
- Create Lightning invoices
- Watch for payments
- Access wallet information
- Send payments, when authorised
- Call permitted APIs
- Make HTTP requests

Third-party application code therefore needs to be treated carefully.

![WASM Quake](/static/images/articles/introducing-wasm-extensions/quake.jpg)
_Quake running as a WASM extension_

![WASM Street Fighter](/static/images/articles/introducing-wasm-extensions/streetfighter.jpg)
_Street Fighter running as a WASM extension_

## Traditional LNbits extensions

A traditional LNbits extension is a Python application integrated into LNbits.

A typical extension can contain Python routes, database models, migrations, templates, frontend JavaScript and other server-side application logic.

This model is extremely flexible. Developers can build sophisticated applications which feel like native parts of LNbits.

But flexibility comes with a trade-off.

Installing a traditional extension means running third-party Python code alongside LNbits itself. That means the extension code needs to be trusted.

For this reason LNbits has historically maintained a **vetted extensions repository**. Extensions submitted to it are reviewed before being included, and the registry explicitly asks developers to submit complete, reviewable applications rather than treating the review process as part of development.

That approach works, but it becomes increasingly difficult to scale as the number of extensions grows.

## Why WASM?

The way software is being created is changing quickly.

Coding assistants and LLMs now make it possible to go from an idea to a working application much faster than before. Someone who wants a very specific LNbits application can increasingly describe it to a coding agent and have a substantial amount of the code generated for them.

Generating more software is relatively easy. Reviewing every line of that software before allowing it to run next to a Lightning wallet is not.

WASM gives us another approach. Instead of relying entirely on reviewing an extension to determine what it _might_ do, LNbits can restrict what the extension is technically capable of doing.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fLjzZwiQaxI?si=t8SYT-OU42uoxmG0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
BitKarrot's LNbits Forms WASM extension in action

Developers can also require a payment to enable their WASM extensions, giving them a way to charge for their applications and support ongoing development.

## What comes next?

WASM extensions give us a way to keep building useful applications on LNbits while setting clearer boundaries around what each application can do. That is the idea at the heart of this new extension model: room to experiment, with access controlled through explicit capabilities.

This article is the starting point for our WASM extensions series. In the coming articles, we will take a deeper look at how the sandbox and runtime work, explore the security and permissions model, and walk through a practical guide to building your own extension.
