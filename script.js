const gameBoard = document.getElementById('game-board');
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const trapCountSpan = document.getElementById('trap-count');
const getSignalButton = document.getElementById('get-signal');
const trapLabel = document.getElementById('trapLabel');
const title = document.getElementById('title');
const languageModal = document.getElementById('languageModal');
const languageButtons = document.querySelectorAll('.language-button');

const rows = 5;
const cols = 5;

let trapCount = 1;
let board = [];

function createBoard() {
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            gameBoard.appendChild(cell);
        }
    }
}

function revealStars() {
    const starCounts = {
        1: 10,
        3: 5,
        5: 4,
        7: 3
    };

    const starCount = starCounts[trapCount];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('star');
        cell.classList.remove('revealed');
    });

    let revealedCount = 0;

    function revealNextStar() {
        if (revealedCount < starCount) {
            let randomCell;
            do {
                randomCell = cells[Math.floor(Math.random() * cells.length)];
            } while (randomCell.classList.contains('star'));
            randomCell.classList.add('star');
            randomCell.classList.add('revealed');
            const starImage = document.createElement('img');
            starImage.src = 'https://i.postimg.cc/TwmFJgGD/star-sprite.png'; // Замените на вашу ссылку на изображение звезды
            randomCell.appendChild(starImage);
            revealedCount++;
            setTimeout(revealNextStar, 500); // Задержка 500 мс между открытием звезд
        }
    }

    revealNextStar();
}

decreaseButton.addEventListener('click', () => {
    if (trapCount > 1) {
        trapCount -= 2;
        trapCountSpan.textContent = trapCount;
    }
});

increaseButton.addEventListener('click', () => {
    if (trapCount < 7) {
        trapCount += 2;
        trapCountSpan.textContent = trapCount;
    }
});

getSignalButton.addEventListener('click', () => {
    revealStars();
});

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        setLanguage(lang);
        languageModal.style.display = 'none';
    });
});

function setLanguage(lang) {
    if (lang === 'en') {
        title.textContent = 'Mines Hack';
        trapLabel.textContent = 'Number of Traps';
        getSignalButton.textContent = 'Get Signal';
    } else if (lang === 'ru') {
        title.textContent = 'Mines Hack';
        trapLabel.textContent = 'кол-во ловушек';
        getSignalButton.textContent = 'Получить сигнал';
    }
}

createBoard();
