const SATS_PER_BTC = 100_000_000;

const calculator = document.querySelector('.sats-calculator');
const platformLabel = document.getElementById('platformLabel');
const themeToggle = document.getElementById('themeToggle');
const cgSatsInput = document.getElementById('cgSatsInput');
const cgBtcInput = document.getElementById('cgBtcInput');
const cgFiatInput = document.getElementById('cgFiatInput');
const cgCurrencySelect = document.getElementById('cgCurrencySelect');
const cgFlag = document.getElementById('cgFlag');
const cgRateMeta = document.getElementById('cgRateMeta');
const cgRefreshBtn = document.getElementById('cgRefreshBtn');

const platformMap = {
  darwin: 'macos',
  win32: 'windows',
  linux: 'linux',
  browser: ''
};

const THEME_STORAGE_KEY = 'sats-calculator-theme';

const updateThemeToggleIcon = theme => {
  if (!themeToggle) {
    return;
  }
  const nextMode = theme === 'dark' ? 'light' : 'dark';
  const isDark = theme === 'dark';
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  themeToggle.classList.toggle('is-dark', isDark);
  themeToggle.setAttribute('aria-label', `switch to ${nextMode} mode`);
};

const applyTheme = theme => {
  if (!calculator) {
    return;
  }
  calculator.dataset.theme = theme;
  updateThemeToggleIcon(theme);
};

const initTheme = () => {
  if (!calculator) {
    return;
  }
  const platform = window.native?.platform ?? 'browser';
  if (platformLabel) {
    platformLabel.textContent = platformMap[platform] ?? platform;
  }
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme =
    storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      :
        window.native?.theme ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = calculator.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }
};

const initCoinGuidesConverter = () => {
  if (!cgSatsInput || !cgBtcInput || !cgFiatInput || !cgCurrencySelect || !cgRateMeta) {
    return;
  }

  let cgFiatRate = null;

  const updateCgFlag = () => {
    if (!cgFlag) {
      return;
    }
    const selectedOption = cgCurrencySelect.selectedOptions[0];
    const flagCode = selectedOption?.dataset.flag ?? 'US';
    cgFlag.src = `https://flagsapi.com/${flagCode}/flat/32.png`;
    cgFlag.alt = `${flagCode} flag`;
  };

  const clearOutputs = () => {
    cgBtcInput.value = '';
    cgSatsInput.value = '';
    cgFiatInput.value = '';
  };

  const convertFromSats = () => {
    const sats = parseFloat(cgSatsInput.value);
    if (Number.isNaN(sats)) {
      cgBtcInput.value = '';
      cgFiatInput.value = '';
      return;
    }
    const btc = sats / SATS_PER_BTC;
    cgBtcInput.value = btc.toFixed(8);
    cgFiatInput.value = cgFiatRate ? (btc * cgFiatRate).toFixed(2) : '';
  };

  const convertFromBtc = () => {
    const btc = parseFloat(cgBtcInput.value);
    if (Number.isNaN(btc)) {
      cgSatsInput.value = '';
      cgFiatInput.value = '';
      return;
    }
    cgSatsInput.value = Math.round(btc * SATS_PER_BTC).toString();
    cgFiatInput.value = cgFiatRate ? (btc * cgFiatRate).toFixed(2) : '';
  };

  const convertFromFiat = () => {
    if (!cgFiatRate) {
      return;
    }
    const fiat = parseFloat(cgFiatInput.value);
    if (Number.isNaN(fiat)) {
      cgBtcInput.value = '';
      cgSatsInput.value = '';
      return;
    }
    const btc = fiat / cgFiatRate;
    cgBtcInput.value = btc.toFixed(8);
    cgSatsInput.value = Math.round(btc * SATS_PER_BTC).toString();
  };

  const setRefreshState = disabled => {
    if (!cgRefreshBtn) {
      return;
    }
    cgRefreshBtn.disabled = disabled;
    cgRefreshBtn.textContent = disabled ? 'Loading…' : 'Refresh';
  };

  const fetchCgRate = async () => {
    const currency = cgCurrencySelect.value.toUpperCase();
    cgRateMeta.textContent = `Fetching BTC/${currency}…`;
    setRefreshState(true);
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${currency}`
      );
      if (!response.ok) {
        throw new Error(`CryptoCompare response ${response.status}`);
      }
      const data = await response.json();
      const rate = data?.[currency];
      if (typeof rate !== 'number' || Number.isNaN(rate)) {
        throw new Error('Invalid BTC rate payload');
      }
      cgFiatRate = rate;
      const formattedRate = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
      }).format(rate);
      cgRateMeta.textContent = `CoinGuides · 1 BTC = ${formattedRate}`;
      convertFromBtc();
    } catch (error) {
      console.error(error);
      cgRateMeta.textContent = 'Unable to load BTC rate.';
      clearOutputs();
    } finally {
      setRefreshState(false);
    }
  };

  cgSatsInput.addEventListener('input', convertFromSats);
  cgBtcInput.addEventListener('input', convertFromBtc);
  cgFiatInput.addEventListener('input', convertFromFiat);
  cgCurrencySelect.addEventListener('change', () => {
    updateCgFlag();
    fetchCgRate();
  });
  if (cgRefreshBtn) {
    cgRefreshBtn.addEventListener('click', fetchCgRate);
  }

  updateCgFlag();
  fetchCgRate();
};

initTheme();
initCoinGuidesConverter();
