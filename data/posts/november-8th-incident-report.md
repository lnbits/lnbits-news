---
title: 'November 8th Incident Report'
date: '2026-11-16T12:00:00.000Z'
summary: 'The LNbits team reports on the November 8 attacks, the evidence behind its assessment of AI involvement, and the changes underway to protect operators and their funds.'
image: '/static/images/articles/the-lnbits-hack.png'
draft: false
---

On Sunday, 8 November 2026, LNbits instances were targeted by a coordinated wave of cyberattacks. Our own infrastructure was among the affected systems, as were installations operated by members of the LNbits community. Funds were stolen, services were disrupted, and operators were forced to take their instances offline.

It was the most difficult week in the history of the LNbits project.

We want to explain what happened, how we responded, what we observed during the attacks, and how this experience is shaping the future of LNbits security.

Beyond LNbits, we believe these events demonstrate something important about the changing security landscape for Bitcoin and free and open-source software.

## How the attacks came to light

On Sunday morning, we began receiving concerning reports from LNbits operators. As the reports accumulated, it became apparent that multiple independent installations were being attacked simultaneously.

Once we understood the seriousness of the situation, we issued an urgent warning asking all LNbits operators to shut down their instances immediately. We distributed that warning through our community groups, communication channels and social media.

This was an extreme measure, but a necessary one.

LNbits supports a wide range of services, businesses and community projects. We understood that taking these systems offline would be disruptive, but our priority was to prevent further exploitation and protect users' funds.

The response from the community was extraordinary. Operators shared logs, reported suspicious activity and helped us investigate the attacks while our developers worked on identifying and addressing the vulnerabilities.

## How the Attacks Worked

Our investigation identified server-side request forgery (SSRF) vulnerabilities in several legacy Python extensions.

SSRF vulnerabilities can allow an attacker to cause a server to make requests to internal services or other destinations that would not normally be accessible externally. Depending on the surrounding infrastructure, this can expose sensitive information or provide opportunities for further exploitation.

We also identified attacks against extensions where vulnerabilities had recently been patched, but where some operators had not yet installed the updated versions.

In the most serious cases, attackers were able to move beyond LNbits and compromise the underlying servers on which instances were running.

Analysis of the available logs revealed a variety of subsequent activities. Some attackers attempted to interact with internal services, including the Caddy web server administration API. Others probed for credentials or attempted to gain additional access.

On some installations, malicious Python extensions were deployed, apparently constructed on-the-fly specifically for the targeted environment.

Although the initial vulnerabilities were similar, the subsequent attacks varied considerably between instances.

This variation, combined with the speed and scale of the activity, was one of the most striking aspects of the incident.

## Evidence of Autonomous AI-Driven Attacks

We believe the attacks exhibited strong characteristics of autonomous AI-driven operations.

Across numerous LNbits instances, we observed attacks occurring in parallel, with different techniques being applied to different environments.

Rather than following a single, repeated exploitation sequence, the activity appeared to adapt to the services and opportunities available on each server.

The speed of these operations, the variety of attempted exploits and the apparent generation of malicious Python extensions suggested something more sophisticated than a conventional, manually coordinated attack.

Our assessment is that the activity was consistent with multiple AI agents independently probing and exploiting vulnerable systems.

We cannot conclusively establish what tools or systems the attackers used. However, the behaviour we observed strongly suggests a level of automation and adaptability that would previously have required substantial human effort.

This has significant implications beyond LNbits.

Modern AI models are increasingly capable of examining large codebases, identifying potential vulnerabilities, developing exploits and adapting their approach based on the responses of target systems.

For Bitcoin projects, where exploitable vulnerabilities can provide direct access to financial value, the incentives for deploying these capabilities are particularly strong.

## The Response and LNbits 1.7

Following the shutdown announcement, our development team worked intensively to identify the vulnerabilities, implement patches and prepare a secure release.

We already had LNbits 1.7 under development. Rather than beginning a separate release process, we accelerated that work and incorporated the necessary security fixes and additional protections.

LNbits 1.7.0 was released on 10 November, followed by further security improvements in version 1.7.1.

These releases include important changes to authentication, extension management and the overall security of the platform.

We are extremely grateful to the developers and contributors who worked tirelessly, in some cases through the night, to make these releases possible.

We also recognise the patience of the operators who kept their services offline while this work was completed.

**All LNbits operators should update to the latest available release and follow the security recovery guidance.** Updating the software alone may not resolve an existing server compromise or invalidate previously exposed credentials.

Please read our [LNbits security update and upgrade guidance](https://news.lnbits.com/news/lnbits-1-7-0-security-update) for the recommended recovery steps.

## Strengthening the LNbits Architecture

The incident has reinforced the importance of security architecture that limits the consequences of individual vulnerabilities.

LNbits has historically supported extensions written in Python. This provides developers with considerable flexibility, but also gives extensions broad access to the application's runtime environment.

We had already begun addressing this architectural challenge with the introduction of our new WebAssembly (WASM) extension framework in LNbits 1.6.

WebAssembly allows extensions to run in sandboxed environments with more tightly controlled access to system resources. Rather than relying entirely on every extension being free of vulnerabilities, the architecture can restrict what an extension is permitted to do.

Several extensions had already been migrated to this framework before the attacks. The incident has reinforced the importance of continuing that transition.

LNbits 1.7 also introduces additional protections.

Public user registration is now disabled by default and must be explicitly enabled by administrators. During our investigation, we observed that installations with public registration disabled were not penetrated through the attack paths we identified.

We've also introduced an option for automatic extension updates, helping operators receive security fixes more quickly.

These changes form part of a broader effort to reduce the attack surface of LNbits and strengthen its default security configuration.

## Building Systems That Limit the Damage

Security audits and vulnerability detection remain essential, but we cannot assume that every vulnerability will be discovered before it is exploited.

LNbits has invested heavily in automated testing, continuous integration and security reviews, including audits using advanced AI models.

These processes have identified vulnerabilities that we have subsequently fixed. However, the vulnerabilities exploited during this incident had not been identified by those earlier reviews.

The lesson is that detecting vulnerabilities is only one part of securing a financial application.

We must also design systems that remain resilient when vulnerabilities exist.

For LNbits, this means expanding sandboxing, strengthening permission boundaries, introducing more granular payment policies and restricting access between components.

Our long-term objective is to ensure that a vulnerability in one part of the LNbits stack cannot easily compromise the entire system or provide unrestricted access to funds.

The impact of any individual security failure should be as limited as possible.

## Open-Source Security in a Changing Threat Landscape

The increasing capabilities of AI are changing the economics of cyberattacks.

Historically, sophisticated exploitation required significant technical expertise, time and resources. Attackers therefore had strong incentives to concentrate on high-value targets.

AI-assisted vulnerability discovery and exploitation can dramatically reduce those costs.

This means that smaller installations, including servers operated by hobbyists, may face increasingly sophisticated attacks previously associated with larger organisations.

For open-source Bitcoin software, we must also recognise that every publicly available change can potentially be analysed automatically.

A security patch published in a seemingly routine commit may reveal a vulnerability to systems capable of examining code changes continuously.

This places increasing pressure on the time between identifying, fixing and deploying security updates.

It also challenges traditional vulnerability disclosure practices, which have often relied on providing operators with sufficient time to update before technical details become widely known.

However, we do not believe that open-source software is inherently disadvantaged.

The same tools that enable attackers to identify vulnerabilities can also help developers discover and eliminate them more quickly.

Open-source projects can adapt through stronger isolation, safer defaults, automated security analysis and architectures designed to contain failures.

## The Future

The attacks on November 8 have been a difficult experience for LNbits and its community.

We are deeply sorry to everyone who lost funds, experienced service disruption or was otherwise affected.

We recognise the trust that operators and users place in LNbits, particularly when the software is used to manage real financial value.

Our focus now is on making LNbits more resilient: accelerating the transition to sandboxed extensions, strengthening security boundaries, improving the update process and making secure operation easier for everyone.

The broader Bitcoin ecosystem faces a changing threat environment, and we believe projects must adapt their architectures and security practices accordingly.

Finally, we want to thank the LNbits community for its patience, generosity and support throughout this incident.

The willingness of operators to share information, and the dedication of the developers and contributors who helped deliver the security updates, made an enormous difference.

We will take the lessons of this incident forward as we continue building LNbits.

**The LNbits Team**
