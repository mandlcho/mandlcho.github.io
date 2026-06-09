#!/usr/bin/env python3
"""Fetch BTC/USD price and save it as JSON for the static site."""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable
from urllib import request

COINGUIDES_URL = "https://coinguides.org/tools/satoshi-converter/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; BTC price snapshot bot)",
    "Accept": "application/json",
}


def _read_json(url: str) -> Any:
    req = request.Request(url, headers=HEADERS)
    with request.urlopen(req, timeout=15) as resp:  # nosec - trusted hosts
        return json.loads(resp.read().decode("utf-8"))


def _coerce_price(value: Any, source: str) -> float:
    if value is None:
        raise ValueError(f"{source} payload did not include a price")
    return float(value)


def _parse_coinbase(payload: Any) -> float:
    amount = payload.get("data", {}).get("amount") if isinstance(payload, dict) else None
    return _coerce_price(amount, "coinbase")


def _parse_coingecko(payload: Any) -> float:
    price = payload.get("bitcoin", {}).get("usd") if isinstance(payload, dict) else None
    return _coerce_price(price, "coingecko")


def _parse_binance_us(payload: Any) -> float:
    price = payload.get("price") if isinstance(payload, dict) else None
    return _coerce_price(price, "binance-us")


PRICE_SOURCES: tuple[tuple[str, str, Callable[[Any], float]], ...] = (
    ("coinbase", "https://api.coinbase.com/v2/prices/BTC-USD/spot", _parse_coinbase),
    (
        "coingecko",
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        _parse_coingecko,
    ),
    ("binance-us", "https://api.binance.us/api/v3/ticker/price?symbol=BTCUSD", _parse_binance_us),
)


def fetch_price() -> tuple[float, str, str]:
    """Return the latest BTC/USD price, source name, and source URL."""
    errors: list[str] = []
    for source, url, parser in PRICE_SOURCES:
        try:
            price = parser(_read_json(url))
            if price <= 0:
                raise ValueError(f"invalid non-positive price: {price}")
            return price, source, url
        except Exception as exc:  # noqa: BLE001 - keep trying fallbacks for scheduled runs
            errors.append(f"{source}: {exc}")

    raise RuntimeError("Unable to fetch BTC/USD price from any source: " + "; ".join(errors))


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch BTC/USD price snapshot")
    parser.add_argument(
        "--output",
        default="assets/data/btc-usd.json",
        help="Path to JSON snapshot (default: assets/data/btc-usd.json)",
    )
    args = parser.parse_args()

    price, source, source_url = fetch_price()
    payload = {
        "symbol": "BTC-USD",
        "price": price,
        "currency": "USD",
        "source": source,
        "source_url": source_url,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "url": COINGUIDES_URL,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"Wrote {output_path} from {source} -> ${price:,.2f}")


if __name__ == "__main__":
    main()
