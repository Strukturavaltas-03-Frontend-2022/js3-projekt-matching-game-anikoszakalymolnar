let oneCard = null;
let twoCard = null;
let cardNumber;
let matchCardsNumber;
let startTime;

// randomizálás
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// kártyák generálása betű alapján
function generateCard(letter) {
  return `<div class="card" data-sign="${letter}">
      <div class="card--front">
          <img src="assets/img/front.jpg" alt="" style="width:100%">
      </div>
      <div class="card--back">
          <img src="assets/img/${letter}.jpg" alt="" style="width:100%">
      </div>
      </div>`;
}

// pálya létrehozása
function initBoard() {
  document.querySelector('.message').innerHTML = '';
  document.querySelector('#time').innerHTML = '00:00';

  const letters = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e'];
  shuffleArray(letters); // betűk összekeverése

  cardNumber = letters.length; // kártyák száma
  matchCardsNumber = 0; // találatok száma
  startTime = null; // nincs időmérés

  // kártyák generálása a HTML-be
  const boardDiv = document.querySelector('.board');
  let innerCards = '';
  letters.forEach((letter) => {
    innerCards += generateCard(letter);
  });
  boardDiv.innerHTML = innerCards;

  // kártyák klikkelés eseménye
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => card.addEventListener('click', flipCard));
}

// eltelt idő frissítése
function showEllapsedTime() {
  if (startTime === null) return; // leállítás

  const now = new Date().getTime();
  const start = startTime.getTime();
  const ellapsedSec = Math.round((now - start) / 1000);
  const min = Math.round(ellapsedSec / 60);
  const sec = ellapsedSec % 60;
  let time = '';
  if (min < 10) time += '0';
  time += `${min}:`;
  if (sec < 10) time += '0';
  time += sec;

  document.querySelector('#time').innerHTML = time;

  setTimeout(showEllapsedTime, 1000); // frissítés mp-ként
}

// kártyára klikkelés figyelése
function flipCard() {
  if (startTime === null) { // időzítő indítása
    startTime = new Date();
    showEllapsedTime();
  }

  const clickedCard = this; // kártya beazonosítása

  // ugyanaz a kártya => kiléps
  if (oneCard === clickedCard) return;

  // csak 2db kártyát lehet kiválasztani, többet nem enged
  if (oneCard !== null && twoCard !== null) return;

  if (oneCard === null) { // első vagy második kártya
    oneCard = clickedCard;
  } else {
    twoCard = clickedCard;
  }
  clickedCard.classList.toggle('flipCard'); // kártya átforgatása

  // azonos kártyák ellenőrzése
  if (oneCard !== null && twoCard !== null) {
    const oneSign = oneCard.dataset.sign;
    const twoSing = twoCard.dataset.sign;

    if (oneSign === twoSing) {
      matchCards(); // azonos
    } else {
      setTimeout(hideSelectedCard, 1000); // visszaforgatás
    }
  }
}

// kártyák visszaforgatása
function hideSelectedCard() {
  oneCard.classList.toggle('flipCard');
  twoCard.classList.toggle('flipCard');
  oneCard = null;
  twoCard = null;
}

// megmaradó kártyák eseményének törlése
// játék végének ellenőrzése
function matchCards() {
  oneCard.removeEventListener('click', flipCard);
  twoCard.removeEventListener('click', flipCard);
  oneCard = null;
  twoCard = null;
  matchCardsNumber += 2;
  if (matchCardsNumber === cardNumber) {
    setTimeout(winner, 1000);
  }
}

// játék vége
function winner() {
  startTime = null; // leállítjuk a számlálás kijelzését
  document.querySelector('.message').innerHTML = 'Congratulation! You fond all cards!';
  setTimeout(initBoard, 5000); // 5mp múlva újrakezdődik
}

initBoard(); // indítás
