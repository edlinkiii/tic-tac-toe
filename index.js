let currentPlayer = 0;
let moves = 0;
let won = false;
let full = false;
const whoArea = document.querySelector('#who')
const infoArea = document.querySelector('#info')
const playAgain = document.querySelector('#play-again');
const players = ['X','O'];
const spaces = [];
const winningMoves = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#board .space').forEach((space) => {
        spaces.push(space);
        space.addEventListener('click', clickHandler);
    });

    playAgain.addEventListener('click', (e) => {
        clearBoard();
    });

    showCurrentPlayer();
});

function clickHandler({ target: el }) {
    if(won || full) return false;

    clearInfo();

    if(el.classList.contains('used')) {
        showInfo('In Use -- Try Again');
    }
    else {
        let player = players[currentPlayer]
        el.classList.remove('unused');
        el.classList.add('used',`is-${player}`);
        el.innerHTML = player;

        won = checkForWinner(player);

        if(won) {
            showInfo('Won The Game!');
            showReset();
        }
        else {
            moves++;
            if(moves === 9) {
                showInfo('No Winner -- Board Full');
                full = true;
                showReset();
                return false;
            }
            else {
                currentPlayer = (currentPlayer === 0) ? 1 : 0 ;
                showCurrentPlayer();
            }
        }
    }
}

function showCurrentPlayer() {
    whoArea.innerHTML = players[currentPlayer];
}

function showInfo(info) {
    infoArea.innerHTML = info;
}

function clearInfo() {
    infoArea.innerHTML = '';
}

function showReset() {
    playAgain.style.display = 'inline';
}

function hideReset() {
    playAgain.style.display = 'none';
}

function checkForWinner(player) {
    let isWinner = winningMoves.reduce((isWon, winningMove) => {
        if(isWon) return isWon

        isWon = (winningMove.every((move) => spaces[move].classList.contains(`is-${player}`)))
            ? true
            : false

        if(isWon) winningMove.forEach((move) => spaces[move].classList.add('win'))

        return isWon
    }, false)
    
    return isWinner
}

function clearBoard() {
    hideReset();
    currentPlayer = (currentPlayer === 0) ? 1 : 0 ;
    moves = 0;
    won = false;
    full = false;
    showCurrentPlayer();
    clearInfo();
    spaces.forEach((space) => {
        space.innerHTML = '';
        space.classList.remove('used','win','is-X','is-O');
        space.classList.add('unused');
    });
}
