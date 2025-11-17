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

  <section class="bitcoin-section bitcoin-section--price">
    <div
      class="btc-price-banner"
      data-btc-price
      data-endpoint="{{ '/assets/data/btc-usd.json' | relative_url }}"
    >
      <div>
        <p class="btc-price-banner__label">BTC/USD — Google Finance</p>
        <p class="btc-price-banner__time" data-btc-price-time>Fetching latest snapshot…</p>
      </div>
      <p class="btc-price-banner__value" data-btc-price-value>—</p>
    </div>
  </section>
</div>

<script src="{{ '/assets/js/btc-price.js' | relative_url }}" defer></script>
