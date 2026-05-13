---
title: 'Spark lands in LNbits'
date: '2026-04-21T09:00:00.000Z'
summary: 'LNbits now supports Spark as a funding source, bringing simple, self-custodial Lightning payments to LNbits, the LNbits SaaS and the LNbitsBox.'
image: '/static/images/articles/lnbits-spark/banner.png'
draft: false
---

LNbits now supports **Spark** as a funding source, giving users another way to run simple, self-custodial Lightning payments without managing a Lightning node.

Spark can be used with LNbits wherever you run it using the [Spark Sidecar](https://github.com/lnbits/spark_sidecar/) daemon alongside LNbits. It is also available now on **LNbits SaaS** at [my.lnbits.com](https://my.lnbits.com/) and on **LNbitsBox** at [box.lnbits.com](http://box.lnbits.com/).

## Simple Lightning payments, less node management

Running Lightning infrastructure has traditionally meant running a Lightning node, managing channels, thinking about inbound liquidity, monitoring peers, backing up state, and dealing with the occasional awkward edge case.

For many users, that is too much.

LNbits is built to sit on top of different funding sources. Users can keep the familiar LNbits wallet, accounts system, API and extensions, while choosing the backend that best fits how they want to use Bitcoin and Lightning.

Spark adds a new option for people who want a simpler payment experience while keeping a strong degree of self-custody.

## What Spark brings to LNbits

Spark is designed to make Bitcoin payments feel easier for everyday use. Instead of asking users to manage Lightning channels themselves, Spark provides a payment layer that can support fast, low-friction payments while still giving users control of their funds.

For LNbits users, that means:

- a simpler setup experience
- no traditional Lightning channel management
- self-custodial payments - Lightning like unilateral exit with some [tradeoffs around leaf sizes](https://docs.spark.money/wallets/unilateral-exit)
- easier access to Lightning-style payments

## Available in the open-source LNbits project

LNbits can connect to Spark using the **Spark sidecar**, giving self-hosters and developers another funding-source option wherever they already run LNbits.

For users running LNbits on a server, VPS, or home machine, LNbits paired with the [Spark sidecar](https://github.com/lnbits/spark_sidecar/) provides a way to add simple, self-custodial Lightning payments without managing a traditional Lightning node.

This keeps the same LNbits approach: run LNbits where you want, choose the funding source that fits, and keep the familiar wallet, accounts, API and extensions on top.

## Available on LNbits SaaS

Spark is now available as a funding source on the [LNbits SaaS](https://my.lnbits.com/).

Users can spin up their own LNbits instance at [my.lnbits.com](https://my.lnbits.com/) and choose Spark as the funding source. This gives them a hosted LNbits setup with a simple funding source ready to go.

It is a good fit for users who want to start quickly, for personal use, run a project or business or provide Lightning wallets without taking on the operational work of node management.

## Available on LNbitsBox

Spark is also available on **LNbitsBox**, the plug-and-play LNbits device.

LNbitsBox gives users a small physical device running LNbits, with funding-source options built in. Spark makes the box easier to use for people who want self-custodial Lightning payments without learning how to run and maintain a full Lightning node.

Users can find out more at [box.lnbits.com](http://box.lnbits.com/).

## Why funding-source choice matters

LNbits supports many different funding sources, from full Lightning nodes backends such as Core Lightning and LND to lighter-weight options like Spark, Phoenixd, and Arkade.

Some users already run a Lightning node and want full control. Others want a simple payment backend that works with less configuration. Others want a way to run wallets, accept payments, build apps, and use LNbits extensions.

Spark gives LNbits' users simple, self-custodial Lightning payments with little operational overhead.

## A simpler path into Lightning

The goal is to give users more ways to run LNbits.

With Spark support on LNbits, available in the LNbits SaaS and on LNbitsBox, users can now choose a setup that is easy to start, operate, and remain aligned with the values of self-custody and control that matter in Bitcoin.
