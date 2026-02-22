// ---------- Local Storage ----------
export const getItemFromStore = (
  key,
  defaultValue,
  store = localStorage
) => {
  try {
    const item = store.getItem(key);
    return item === null ? defaultValue : JSON.parse(item);
  } catch {
    return store.getItem(key) || defaultValue;
  }
};

export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, payload);

export const removeItemFromStore = (key, store = localStorage) =>
  store.removeItem(key);

// ---------- Date Utils ----------
export const getDates = (
  startDate,
  endDate,
  interval = 1000 * 60 * 60 * 24
) => {
  const duration = +endDate - +startDate;
  const steps = duration / interval;

  return Array.from({ length: steps + 1 }, (_, i) =>
    new Date(startDate.valueOf() + interval * i)
  );
};

export const getPastDates = (duration) => {
  let days;

  switch (duration) {
    case "week":
      days = 7;
      break;
    case "month":
      days = 30;
      break;
    case "year":
      days = 365;
      break;
    default:
      days = duration;
  }

  const date = new Date();
  const endDate = date;
  const startDate = new Date(
    new Date().setDate(date.getDate() - (days - 1))
  );

  return getDates(startDate, endDate);
};

// ---------- Number / Currency ----------
export const currencyFormat = (
  amount,
  locale = "en-US",
  options = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "usd",
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
};

export const getCurrencySymbol = (
  currency,
  locale = "en-US"
) => {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  })
    .formatToParts(0)
    .find((x) => x.type === "currency");

  return parts ? parts.value : "$";
};

export const numberFormat = (
  number,
  locale = "en-US",
  options = { notation: "standard" }
) =>
  new Intl.NumberFormat(locale, {
    ...options,
  }).format(number);

// ---------- Color ----------
export const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const hexToRgbChannel = (hexColor) => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
};

export const generatePaletteChannel = (palette) => {
  const channels = {};

  Object.entries(palette).forEach(([name, value]) => {
    if (value) {
      channels[`${name}Channel`] = hexToRgbChannel(value);
    }
  });

  return { ...palette, ...channels };
};

export const cssVarRgba = (color, alpha) => {
  return `rgba(${color} / ${alpha})`;
};

// ---------- String ----------
export const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

// ---------- Compact Number ----------
export const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (
      (num / 1_000_000_000).toFixed(
        num % 1_000_000_000 < 10 ? 0 : 1
      ) + "B"
    );
  } else if (num >= 1_000_000) {
    return (
      (num / 1_000_000).toFixed(
        num % 1_000_000 < 10 ? 0 : 1
      ) + "M"
    );
  } else if (num >= 1_000) {
    return (
      (num / 1_000).toFixed(
        num % 1_000 < 10 ? 0 : 1
      ) + "K"
    );
  } else {
    return num.toString();
  }
};
