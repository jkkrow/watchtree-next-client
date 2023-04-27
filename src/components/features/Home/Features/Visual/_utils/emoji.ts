const emojis = [
  '😊',
  '😀',
  '😣',
  '😏',
  '😉',
  '😃',
  '🤨',
  '😁',
  '😄',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😇',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '🙂',
  '🙃',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🧐',
  '🤓',
  '😎',
  '🥸',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁',
  '☹️',
  '😖',
  '😫',
  '😩',
  '🥺',
  '😢',
  '😭',
  '😤',
  '😠',
  '😡',
  '🤬',
  '🥲',
];

export function getEmojis(n: number) {
  return emojis.slice(0, n);
}

export function getRandomEmojis(n: number, excludeEmojis: string[] = []) {
  const availableEmojis = emojis.filter(
    (emoji) => !excludeEmojis.includes(emoji)
  );

  if (n > availableEmojis.length) {
    throw new Error(
      'The requested number of unique emojis exceeds the available emojis.'
    );
  }

  const uniqueEmojis: Set<string> = new Set();

  while (uniqueEmojis.size < n) {
    const randomIndex = getRandomInt(0, availableEmojis.length - 1);
    uniqueEmojis.add(availableEmojis[randomIndex]);
  }

  return Array.from(uniqueEmojis);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
