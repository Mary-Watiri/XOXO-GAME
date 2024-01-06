document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.querySelector('.message');
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'Start New Game';

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function handleGameEnd(outcome) {
        gameActive = false;
        message.textContent = outcome;
        message.appendChild(newGameButton);
        newGameButton.addEventListener('click', startNewGame);
    }

    function handleClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        renderBoard();
        
        const winner = checkWinner();
        const draw = checkDraw();

        if (winner) {
            handleGameEnd(`Player ${winner} wins!`);
        } else if (draw) {
            handleGameEnd('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.addEventListener('click', () => handleClick(index));
            board.appendChild(cell);
        });
    }

    function startNewGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        message.textContent = `Player ${currentPlayer}'s turn`;
        newGameButton.remove();
        renderBoard();
    }

    renderBoard();
});
