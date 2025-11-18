#!/usr/bin/env python3
"""Fetch BTC price from the CoinGuides converter feed and save it as JSON."""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib import parse, request

CRYPTOCOMPARE_URL = "https://min-api.cryptocompare.com/data/price"
COINGUIDES_URL = "https://coinguides.org/tools/satoshi-converter/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; CoinGuides price bot)",
    "Accept": "application/json",
}


def fetch_price() -> float:
    """Return the latest BTC/USD price backed by the CoinGuides converter feed."""
    query = parse.urlencode({"fsym": "BTC", "tsyms": "USD"})
    req = request.Request(f"{CRYPTOCOMPARE_URL}?{query}", headers=HEADERS)
    with request.urlopen(req, timeout=15) as resp:  # nosec - trusted host
        payload = json.loads(resp.read().decode("utf-8"))
    price = payload.get("USD")
    if not isinstance(price, (int, float)):
        raise RuntimeError("CoinGuides feed returned an invalid payload")
    return float(price)


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch CoinGuides BTC price snapshot")
    parser.add_argument(
        "--output",
        default="assets/data/btc-usd.json",
        help="Path to JSON snapshot (default: assets/data/btc-usd.json)",
    )
    args = parser.parse_args()

    price = fetch_price()
    payload = {
        "symbol": "BTC-USD",
        "price": price,
        "currency": "USD",
        "source": "coin-guides",
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "url": COINGUIDES_URL,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2))
    print(f"Wrote {output_path} -> ${price:,.2f}")


if __name__ == "__main__":
    main()
