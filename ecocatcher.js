const gameBoard = document.getElementById('gameBoard');
const winMessage = document.getElementById('winMessage');

const images = [
  "🌳", "♻️", "🌍", "🚲", "☀️", "💧", "🍎", "🚮"
];

let cards = [...images, ...images];
cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedCards = [];

cards.forEach(icon => {
  const card = document.createElement('div');
  card.classList.add('card');
  
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${icon}</div>
      <div class="card-back"></div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card, icon));
  
  gameBoard.appendChild(card);
});

function flipCard(card, icon) {
  if (flippedCards.length < 2 && !card.classList.contains('flip')) {
    card.classList.add('flip');
    flippedCards.push({ card, icon });
    
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  
  if (first.icon === second.icon) {
    matchedCards.push(first, second);
    if (matchedCards.length === cards.length) {
      winMessage.classList.remove('hidden');
    }
  } else {
    first.card.classList.remove('flip');
    second.card.classList.remove('flip');
  }
  
  flippedCards = [];
}
