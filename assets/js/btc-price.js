(function () {
  function formatCurrency(value) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
      return `$${Number(value).toFixed(2)}`;
    }
  }

  async function loadPrice(url) {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Price request failed (${response.status})`);
    }
    return response.json();
  }

  function mount() {
    const banner = document.querySelector("[data-btc-price]");
    if (!banner) return;
    const endpoint = banner.getAttribute("data-endpoint");
    if (!endpoint) return;
    const valueNode = banner.querySelector("[data-btc-price-value]");
    const timeNode = banner.querySelector("[data-btc-price-time]");

    loadPrice(endpoint)
      .then((payload) => {
        if (valueNode) {
          valueNode.textContent = payload && payload.price ? formatCurrency(payload.price) : "—";
        }
        if (timeNode) {
          const stamp = payload && payload.fetched_at ? new Date(payload.fetched_at) : new Date();
          timeNode.textContent = `Updated ${stamp.toLocaleString()}`;
        }
      })
      .catch((error) => {
        console.error("Unable to load BTC price", error);
        if (valueNode) valueNode.textContent = "Price unavailable";
        if (timeNode) timeNode.textContent = "";
      });
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
