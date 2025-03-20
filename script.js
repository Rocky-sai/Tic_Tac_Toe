const cells = document.querySelectorAll('[data-cell]');
const turnIndicator = document.getElementById('turnIndicator');
const restartBtn = document.getElementById('restartBtn');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');
const newGameBtn = document.getElementById('newGameBtn');

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

let isXTurn = true;

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  turnIndicator.textContent = "X's Turn";
  resultScreen.style.display = 'none';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    showResult(`${currentClass.toUpperCase()} Wins!`);
  } else if (isDraw()) {
    showResult(`It's a Draw!`);
  } else {
    isXTurn = !isXTurn;
    updateTurnText();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function updateTurnText() {
  turnIndicator.textContent = isXTurn ? "X's Turn" : "O's Turn";
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.style.display = 'flex';
}

restartBtn.addEventListener('click', startGame);
newGameBtn.addEventListener('click', startGame);

// Initialize game
startGame();
