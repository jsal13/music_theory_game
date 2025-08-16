

const createTextCard = (text) => {
  const cardClass = (text === 'Major' || text === 'Minor') ? 'major-minor-card' : 'quality-card';
  return `
    <svg class="card-svg ${cardClass}" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="${cardWidth - 8}" height="${cardHeight - 8}" rx="24" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="60" font-family="'Lora', serif">${text}</text>
    </svg>
  `;
};

const createTitleCard = (title, symbol, symbolFontSize = 60) => {
  // Support explicit line breaks with \n
  let titleLines = title.split(/\\n|\n/);
  // If no explicit line break, fall back to auto-break for long titles
  if (titleLines.length === 1) {
    const maxLen = 12;
    if (title.length > maxLen && title.includes(' ')) {
      const idx = title.lastIndexOf(' ', maxLen);
      if (idx > 0) {
        titleLines = [title.slice(0, idx), title.slice(idx + 1)];
      }
    }
  }
  const lineSpacing = 28;
  const titleSVG = titleLines.map((line, i) =>
    `<tspan x="50%" dy="${i === 0 ? 0 : lineSpacing}" text-anchor="middle">${line}</tspan>`
  ).join('');
  return `
    <svg class="card-svg quality-card" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="${cardWidth - 8}" height="${cardHeight - 8}" rx="24" />
      <text x="50%" y="18%" text-anchor="middle" dominant-baseline="middle" font-size="28" font-family="'Lora', serif">${titleSVG}</text>
      <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" font-size="${symbolFontSize}" font-family="'Lora', serif">${symbol}</text>
    </svg>
  `;
};

const createInversionCard = (title, main, sup, sub) => `
  <svg class="card-svg quality-card" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="${cardWidth - 8}" height="${cardHeight - 8}" rx="24" />
    <text x="50%" y="22%" text-anchor="middle" dominant-baseline="middle" font-size="28" font-family="'Lora', serif">${title}</text>
    <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" font-size="60" font-family="'Lora', serif">
      ${main}<tspan dy="-0.7em" font-size="28">${sup}</tspan><tspan dy="1.2em" dx="-0.55em" font-size="28">${sub ? sub : ''}</tspan>
    </text>
  </svg>
`;


const BASIC_CARDS = [
  { type: 'text', value: 'Major' },
  { type: 'text', value: 'Major' },
  { type: 'text', value: 'Major' },
  { type: 'text', value: 'Major' },
  { type: 'text', value: 'Minor' },
  { type: 'text', value: 'Minor' },
  { type: 'text', value: 'Minor' },
  { type: 'text', value: 'Minor' },
  // 4 copies for Augmented and Diminished
  ...Array(2).fill({ type: 'title', title: 'Augmented', symbol: '+', symbolFontSize: 44 }),
  ...Array(2).fill({ type: 'title', title: 'Diminished', symbol: 'o', symbolFontSize: 44 }),
  // 6 copies for the rest
  ...Array(4).fill({ type: 'title', title: 'Dominant\n7th', symbol: '7' }),
  ...Array(4).fill({ type: 'title', title: 'Major 7th', symbol: 'maj7' }),
  ...Array(4).fill({ type: 'title', title: 'Minor 7th', symbol: 'min7' }),
  // 2 copies for the rest
  ...Array(2).fill({ type: 'inversion', title: '1st Inv', main: 'I', sup: '6', sub: '' }),
  ...Array(2).fill({ type: 'inversion', title: '2nd Inv', main: 'I', sup: '6', sub: '4' }),
  ...Array(2).fill({ type: 'title', title: 'Half\ndiminished', symbol: 'ø' }),
  ...Array(1).fill({ type: 'title', title: 'Ninth', symbol: '9' }),
  ...Array(2).fill({ type: 'title', title: 'Minor 7♭5', symbol: 'm7♭5' }),
  ...Array(2).fill({ type: 'title', title: 'Suspended 4th', symbol: 'sus4' }),
  ...Array(2).fill({ type: 'title', title: 'Suspended 2nd', symbol: 'sus2' }),
  ...Array(1).fill({ type: 'title', title: 'Add 9', symbol: 'add9' }),
  ...Array(1).fill({ type: 'title', title: 'Sixth', symbol: '6' }),
  // ...existing code...
];

const textCardContainer = document.getElementById('text-card-container');
if (textCardContainer) {
  const html = BASIC_CARDS.map(card => {
    switch (card.type) {
      case 'text':
        return createTextCard(card.value);
      case 'title':
        return createTitleCard(card.title, card.symbol, card.symbolFontSize);
      case 'inversion':
        return createInversionCard(card.title, card.main, card.sup, card.sub);
      default:
        return '';
    }
  }).join('');
  textCardContainer.innerHTML = html;
}
