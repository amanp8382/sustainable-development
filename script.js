let currentCard = 0;
let points = 0;

function showCard(index) {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    card.style.display = idx === index ? 'block' : 'none';
    if (idx === index) {
      card.style.animation = "bounceIn 0.8s ease";
    }
  });
}

function nextChallenge() {
  const cards = document.querySelectorAll('.card');
  if (currentCard < cards.length - 1) {
    currentCard++;
    showCard(currentCard);
  } else {
    alert("🎉 You completed all today's challenges! Amazing work!");
  }
}

function acceptChallenge() {
  points += 10;
  animatePoints(points);
  nextChallenge();
}

function animatePoints(target) {
  const rewardElement = document.getElementById('reward-points');
  let current = parseInt(rewardElement.innerText.replace(/\D/g, '')) || 0;
  const increment = target > current ? 1 : -1;
  const timer = setInterval(() => {
    current += increment;
    rewardElement.innerText = `🏆 Reward Points: ${current}`;
    if (current === target) clearInterval(timer);
  }, 30);
}

// Initial card display
window.onload = () => {
  showCard(0);
};
