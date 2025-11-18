---
layout: landing
title: bitcoin
hero_title: bitcoin
description: "Notes, references, and the sats calculator I’m tinkering on."
permalink: /bitcoin/
---

<section class="bitcoin-section bitcoin-section--intro">
  <div class="bitcoin-card">
    <p class="bitcoin-card__eyebrow">orientation</p>
    <h2>What is bitcoin?</h2>
    <p>
      Bitcoin is a decentralized digital currency that runs on a peer-to-peer network.
      Transfers settle without intermediaries, transactions are verified cryptographically,
      and the ledger is stored in a public blockchain that anyone can inspect.
    </p>
    <p>
      Use this page to keep tabs on the latest BTC/USD snapshot and experiment with the sats calculator I’m
      building for my own research.
    </p>
  </div>
</section>

<section class="bitcoin-section bitcoin-section--price">
  <div
    class="btc-price-banner"
    data-btc-price
    data-endpoint="{{ '/assets/data/btc-usd.json' | relative_url }}"
  >
    <div class="btc-price-banner__details">
      <img
        class="btc-price-banner__flag"
        src="https://coinguides.org/wp-content/plugins/tool-satoshi-converter/btc.png"
        alt="Bitcoin flag"
        width="44"
        height="44"
        loading="lazy"
      />
      <div>
        <p class="btc-price-banner__label">BTC/USD — CoinGuides</p>
        <p class="btc-price-banner__time" data-btc-price-time>Fetching latest snapshot…</p>
        <p class="btc-price-banner__interval">Auto-updated every 30 minutes via GitHub Actions.</p>
      </div>
    </div>
    <p class="btc-price-banner__value" data-btc-price-value>—</p>
  </div>
</section>

<section class="bitcoin-section bitcoin-section--tool">
  <div class="bitcoin-section__heading">
    <div>
      <p class="bitcoin-card__eyebrow">conversion lab</p>
      <h2>Sats calculator</h2>
      <p class="bitcoin-section__lead">Convert between sats, BTC, and fourteen fiat currencies.</p>
    </div>
    <p class="bitcoin-section__meta">Rates from CryptoCompare · Flags via flagsapi.com</p>
  </div>
  <div class="sats-calculator" data-theme="light">
    <div class="app-card">
      <header class="app-header">
        <h3>Sats Calculator</h3>
        <div class="header-meta">
          <p class="platform-label" id="platformLabel"></p>
          <button id="themeToggle" type="button" class="theme-toggle" aria-label="toggle theme">₿</button>
        </div>
      </header>

      <section class="coinguides-card">
        <div class="section-heading">
          <div>
            <h4>Fiat to sats converter</h4>
            <p class="section-subtitle">BTC · sats · 14 fiat currencies</p>
          </div>
          <button id="cgRefreshBtn" type="button" class="ghost-button">Refresh</button>
        </div>
        <p class="cg-meta-text" id="cgRateMeta">Loading converter…</p>
        <div class="cg-grid">
          <label class="cg-field">
            <span class="input-label">Satoshis</span>
            <div class="cg-input-shell">
              <img
                src="https://coinguides.org/wp-content/plugins/tool-satoshi-converter/sats.png"
                alt="Sats"
                class="cg-icon"
                width="40"
                height="40"
              />
              <input id="cgSatsInput" type="number" min="0" step="1" inputmode="numeric" placeholder="Satoshi" />
            </div>
          </label>

          <label class="cg-field">
            <span class="input-label">Bitcoin</span>
            <div class="cg-input-shell">
              <img
                src="https://coinguides.org/wp-content/plugins/tool-satoshi-converter/btc.png"
                alt="BTC"
                class="cg-icon"
                width="40"
                height="40"
              />
              <input
                id="cgBtcInput"
                type="number"
                min="0"
                step="0.00000001"
                inputmode="decimal"
                placeholder="Bitcoin"
              />
            </div>
          </label>

          <label class="cg-field">
            <span class="input-label">Fiat amount</span>
            <div class="cg-input-shell cg-fiat-shell">
              <img id="cgFlag" src="https://flagsapi.com/US/flat/32.png" alt="Flag" class="cg-flag" width="40" height="40" />
              <select id="cgCurrencySelect" aria-label="Select fiat currency">
                <option value="usd" data-flag="US">usd</option>
                <option value="eur" data-flag="EU">eur</option>
                <option value="gbp" data-flag="GB">gbp</option>
                <option value="aud" data-flag="AU">aud</option>
                <option value="cny" data-flag="CN">cny</option>
                <option value="rub" data-flag="RU">rub</option>
                <option value="cad" data-flag="CA">cad</option>
                <option value="nzd" data-flag="NZ">nzd</option>
                <option value="sgd" data-flag="SG">sgd</option>
                <option value="jpy" data-flag="JP">jpy</option>
                <option value="kwd" data-flag="KW">kwd</option>
                <option value="inr" data-flag="IN">inr</option>
                <option value="chf" data-flag="CH">chf</option>
                <option value="aed" data-flag="AE">aed</option>
              </select>
              <input id="cgFiatInput" type="number" min="0" step="0.01" inputmode="decimal" placeholder="Amount" />
            </div>
          </label>
        </div>
        <p class="fine-print">Rates powered by CryptoCompare.</p>
      </section>
    </div>
  </div>
</section>

<script src="{{ '/assets/js/btc-price.js' | relative_url }}" defer></script>
<script src="{{ '/bitcoin/app.js' | relative_url }}" type="module"></script>
