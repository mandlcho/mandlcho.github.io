#!/usr/bin/env python3
"""Fetch BTC price from Google Finance and save as JSON snapshot."""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib import request

GOOGLE_URL = "https://www.google.com/finance/quote/BTC-USD"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}
PRICE_RE = re.compile(r'data-last-price="([0-9.,]+)"')


def fetch_price() -> float:
    req = request.Request(GOOGLE_URL, headers=HEADERS)
    with request.urlopen(req, timeout=15) as resp:  # nosec - trusted host
        html = resp.read().decode("utf-8")
    match = PRICE_RE.search(html)
    if not match:
        raise RuntimeError("Unable to parse BTC price from Google Finance page")
    return float(match.group(1).replace(",", ""))


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch Google Finance BTC price snapshot")
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
        "source": "google-finance",
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "url": GOOGLE_URL,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2))
    print(f"Wrote {output_path} -> ${price:,.2f}")


if __name__ == "__main__":
    main()
