---
layout: page
title: Bitcoin
---

<div class="bitcoin-page">
  <header class="bitcoin-hero">
    <div class="bitcoin-hero__text">
      <h1>An Introduction to Bitcoin</h1>
      <p class="lead">A brief overview of the world's first decentralized digital currency.</p>
    </div>
  </header>

  <section class="bitcoin-section">
    <h2>What is Bitcoin?</h2>
    <p>Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain.</p>
  </section>

  <section class="bitcoin-section">
    <h2>Live Bitcoin Price (in USD)</h2>
    <div class="bitcoin-price-widget">
      <coingecko-coin-price-chart-widget  coin-id="bitcoin" currency="usd" height="300" locale="en"></coingecko-coin-price-chart-widget>
    </div>
  </section>

  <section class="bitcoin-section">
    <h2>Key Concepts</h2>
    <div class="bitcoin-concepts">
      <div class="bitcoin-concept">
        <h3>Blockchain</h3>
        <p>The blockchain is a public, distributed ledger that records all Bitcoin transactions. It is a chain of blocks, where each block contains a batch of transactions.</p>
      </div>
      <div class="bitcoin-concept">
        <h3>Mining</h3>
        <p>Mining is the process of adding new transactions to the blockchain. Miners use powerful computers to solve complex mathematical problems, and are rewarded with new bitcoins for their efforts.</p>
      </div>
      <div class="bitcoin-concept">
        <h3>Wallets</h3>
        <p>A Bitcoin wallet is a digital wallet that stores your bitcoins. It is secured with a private key, which is a secret piece of data that proves your right to spend bitcoins from a specific wallet.</p>
      </div>
    </div>
  </section>

  <section class="bitcoin-section">
    <h2>Tools & Research</h2>
    <div class="bitcoin-links">
      <a href="{{ '/bitcoin/tools/' | relative_url }}" class="bitcoin-link">
        <h3>Tools</h3>
        <p>A collection of useful tools for Bitcoin users and developers.</p>
      </a>
      <a href="{{ '/bitcoin/research/' | relative_url }}" class="bitcoin-link">
        <h3>Research</h3>
        <p>In-depth research and analysis on Bitcoin and related technologies.</p>
      </a>
    </div>
  </section>

  <section class="bitcoin-section bitcoin-cta">
    <h2>Learn More</h2>
    <p>The world of Bitcoin is vast and exciting. Start your journey today and become part of the decentralized revolution.</p>
    <a href="https://bitcoin.org" target="_blank" rel="noopener" class="bitcoin-button">Learn More at Bitcoin.org</a>
  </section>
</div>

<script src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"></script>