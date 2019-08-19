let currentPlayer = 0;
let moves = 0;
let won = false;
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

const checkForWinner = player => {
    for(let i=0; i < winningMoves.length; i++) {
        if(spaces[winningMoves[i][0]].classList.contains('is-'+player)
            &&
           spaces[winningMoves[i][1]].classList.contains('is-'+player)
            &&
           spaces[winningMoves[i][2]].classList.contains('is-'+player)
        ) {
            spaces[winningMoves[i][0]].classList.add('win');
            spaces[winningMoves[i][1]].classList.add('win');
            spaces[winningMoves[i][2]].classList.add('win');
            return true;
        }
    }
}

const clickHandler = el => {
    if(won) return false;

    clearInfo();

    if(el.classList.contains('used')) {
        showInfo('In Use -- Try Again');
    }
    else {
        el.classList.remove('unused');
        el.classList.add('used');
        el.classList.add('is-'+players[currentPlayer]);
        el.innerHTML = players[currentPlayer];
        
        won = checkForWinner(players[currentPlayer]);

        if(won) {
            showInfo('Won The Game!');
            showReset();
        }
        else {
            moves++;
            if(moves === 9) {
                showInfo('No Winner -- Board Full');
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

const showCurrentPlayer = () => {
    document.querySelector('#who').innerHTML = players[currentPlayer];
}

const showInfo = info => {
    document.querySelector('#info').innerHTML = info;
}

const clearInfo = () => {
    document.querySelector('#info').innerHTML = '';
}

const showReset = () => {
    document.querySelector('#play-again').style.display = 'inline';
}

const hideReset = () => {
    document.querySelector('#play-again').style.display = 'none';
}

const clearBoard = () => {
    hideReset();
    currentPlayer = (currentPlayer === 0) ? 1 : 0 ;
    moves = 0;
    won = false;
    showCurrentPlayer();
    clearInfo();
    spaces.forEach(s => {
        s.innerHTML = '';
        s.classList.remove('used','win','is-X','is-O');
        s.classList.add('unused');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showCurrentPlayer();
    document.querySelectorAll('#board div').forEach(d => {
        spaces.push(d);
        d.addEventListener('click', e => {
            clickHandler(e.target);
        });
    });
    document.querySelector('#play-again').addEventListener('click', e => {
        clearBoard();
    });
});
