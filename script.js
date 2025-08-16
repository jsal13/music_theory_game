const romanNumerals = [
  { upper: 'I', lower: 'i' },
  { upper: 'II', lower: 'ii' },
  { upper: 'III', lower: 'iii' },
  { upper: 'IV', lower: 'iv' },
  { upper: 'V', lower: 'v' },
  { upper: 'VI', lower: 'vi' },
  { upper: 'VII', lower: 'vii' }
];

const cardWidth = 240;
const cardHeight = 336;


function createCard(numeral, isUpper, fontSize = 72) {
  const text = isUpper ? numeral.upper : numeral.lower;
  const svg = `
    <svg class="card-svg roman-card" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="${cardWidth-8}" height="${cardHeight-8}" rx="24" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="${fontSize}" font-family="'Lora', serif">${text}</text>
    </svg>
  `;
  return svg;
}


const romanExtra = [
  'bVII',
  'ii°',
  'vii°',
  'V/ii',
  'V/iii',
  'V/IV',
  'V/V',
  'V/vi',
  'V/vii°'
];

const container = document.getElementById('card-container');
let cardsHTML = '';
for (const numeral of romanNumerals) {
  for (let i = 0; i < 6; i++) {
    cardsHTML += createCard(numeral, true);  // Uppercase
  }
}
for (const numeral of romanNumerals) {
  for (let i = 0; i < 6; i++) {
    cardsHTML += createCard(numeral, false); // Lowercase
  }
}
for (const extra of romanExtra) {
  if (extra.startsWith('V/')) {
    for (let i = 0; i < 2; i++) {
      cardsHTML += createCard({ upper: extra, lower: '' }, true, 72);
    }
  } else {
    cardsHTML += createCard({ upper: extra, lower: '' }, true, 72);
  }
}
container.innerHTML = cardsHTML;
