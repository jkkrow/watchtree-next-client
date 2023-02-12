export const formatTime = (timeInSeconds: number): string => {
  const result = new Date(Math.round(timeInSeconds) * 1000)
    .toISOString()
    .substring(11, 19);
  // if duration is over hour
  if (+result.substring(0, 2) > 0) {
    // show 00:00:00
    return result;
  } else {
    // else show 00:00
    return result.substring(3);
  }
};

export const formatSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 B';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatString = (string: string): string => {
  const convertedString = string.trim().replace(/[^a-zA-Z0-9 ]/g, '');

  return convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
};

export const formatNumber = (number: number, digits = 1) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => number >= item.value);
  return item
    ? (number / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export const formatDate = (date: string | Date) => {
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);

  const count = interval ? Math.floor(seconds / interval.seconds) : seconds;
  const label = interval ? interval.label : 'second';

  return `${count} ${label}${count !== 1 ? 's' : ''} ago`;
};
