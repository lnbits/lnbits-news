---
title: 'Extension Update - Pay Links - Nostr Zaps and other fixes'
date: '2024-09-17T11:41:30.000Z'
summary: "Updates to LNbits' Pay Links Extension - Nostr Zaps bug fixes"
draft: false
---

The LNbits Pay Links (LNURLp) extension has undergone several updates since the release of version 0.5.0. These updates focus on enhancing functionality, bug fixes, and refining the user interface. Here’s a look at the key changes and the community members who have contributed to these improvements.

## Key Updates Since v0.5.0 on May 14th 2024

The Pay Links extension has had a number of updates aimed at increasing reliability and user experience:

- Bug fix where some Nostr Zap receipts were not being published to relays
- Increased LNAddress Length: The limit for LNAddress lengths was increased, allowing users more flexibility in creating payment links.
- Fixes and Improvements: Several key fixes were made, including:
  - Parsing URL errors and issues with empty success URLs were corrected to ensure smoother transaction experiences.
  - The change of wallet for a pay link and the early return in functions were adjusted to prevent potential disruptions during payment processing.
  - The handling of empty string content was refined to prevent errors in data processing.

## Contributions from the Community

This series of updates is the result of dedicated efforts from our community contributors. Special thanks to:

@dni: For their continuous involvement in refining the extension’s functionality.

@motorina0: Whose contributions have consistently addressed critical bugs.

@talvasconcelos: For improving webhook integrations.

@Opago-Pay: Notably made their first contribution, enhancing the LNAddress feature.

These contributors have played a pivotal role in ensuring that the LNBits Pay Links extension remains robust and user-friendly.

## Looking Forward

The LNbits project is committed to continuous improvement based on community feedback and emerging needs. We appreciate the community’s active involvement and encourage more users to participate in the development process.

Download the Latest Version: Update your Pay Links extension from within LNbits in the extensions control panel.

Thank you to all our contributors for their hard work and dedication to making the LNbits Pay Links extension better with each update.
