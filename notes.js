const noteNames = [
  'A', 'A♯', 'B♭',
  'B', 'C♭',
  'C', 'C♯', 'D♭',
  'D', 'D♯', 'E♭',
  'E', 'F♭',
  'F', 'F♯', 'G♭',
  'G', 'G♯', 'A♭'
];



function createNoteCard(note) {
  const svg = `
    <svg class="card-svg note-card" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="${cardWidth-8}" height="${cardHeight-8}" rx="24" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="72" font-family="'Lora', serif">${note}</text>
    </svg>
  `;
  return svg;
}

const noteContainer = document.getElementById('note-card-container');
if (noteContainer) {
  let notesHTML = '';
  for (const note of noteNames) {
      notesHTML += createNoteCard(note);
    }
  noteContainer.innerHTML = notesHTML;
}
