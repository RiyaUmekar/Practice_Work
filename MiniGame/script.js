// Define an array of word-picture pairs
const pairs = [
  { word: "apple", image: "apple.jpg" },
  { word: "banana", image: "banana.jpg" },
  // Add more pairs as needed
];

// Shuffle the pairs array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate the game board
function generateGameBoard() {
  const gameBoard = document.getElementById("game-board");
  shuffle(pairs);
  pairs.forEach((pair) => {
    const cardWord = document.createElement("div");
    cardWord.classList.add("card");
    cardWord.textContent = pair.word;
    const cardImage = document.createElement("div");
    cardImage.classList.add("card");
    cardImage.style.backgroundImage = `url(${pair.image})`;
    cardImage.dataset.word = pair.word;
    cardImage.addEventListener("click", flipCard);
    gameBoard.appendChild(cardWord);
    gameBoard.appendChild(cardImage);
  });
}

// Flip the card
function flipCard() {
  if (document.querySelectorAll(".flip").length >= 2) return; // Prevent flipping more than two cards at once
  this.classList.add("flip");
  const flippedCards = document.querySelectorAll(".flip");
  if (flippedCards.length === 2) {
    checkMatch(flippedCards);
  }
}

// Check if the flipped cards match
function checkMatch(flippedCards) {
  const [card1, card2] = flippedCards;
  if (card1.dataset.word === card2.dataset.word) {
    setTimeout(() => {
      card1.removeEventListener("click", flipCard);
      card2.removeEventListener("click", flipCard);
      card1.classList.add("matched");
      card2.classList.add("matched");
    }, 1000); // Delay before matching cards stay open
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
    }, 1000); // Delay before flipping back unmatched cards
  }
}

// Initialize the game
generateGameBoard();
