var Player1, Player2, dialog, enterButton, pElem, pElem1, pElem2, startGameButton;
pElem = document.querySelector('.container');
pElem.addEventListener('click', clickSquare);
pElem1 = document.querySelector('#player1Name');
pElem1.addEventListener('click', callBackPlayerName1);
pElem2 = document.querySelector('#player2Name');
pElem2.addEventListener('click', callBackPlayerName2);
dialog = document.querySelector('dialog');
enterButton = document.querySelector('#playerId');
enterButton.addEventListener('click', callBackEnterName);
startGameButton = document.querySelector('#newGame');
startGameButton.addEventListener('click', () => {
    GameObject.start();
});
Player1 = PlayerClass('X', 'Player1');
Player2 = PlayerClass('O', 'Player2');
const GameObject = tictactoeHTML(Player1, Player2);
function BoardClass() {
    var self = {};
    var currentBoard;
    currentBoard = '.........';
    function areThereFreeSquares() {
        return currentBoard.includes('.');
    }
    function change(value, marker) {
        var elem;
        currentBoard = replaceCharInString(currentBoard, value, marker);
        elem = document.querySelector('#s' + (value + 1));
        console.log(elem);
        elem.innerText = marker;
    }
    function getBoard() {
        return currentBoard;
    }
    function isValidMove(value) {
        return currentBoard[+value - 1] == '.';
    }
    self.areThereFreeSquares = areThereFreeSquares;
    self.change = change;
    self.getBoard = getBoard;
    self.isValidMove = isValidMove;
    return self;
}
function PlayerClass(marker, playerName) {
    var self = {};
    var playerBoard, playerMarker;
    playerBoard = '000000000';
    playerMarker = marker;
    function getBoard() {
        return playerBoard;
    }
    function getMarker() {
        return playerMarker;
    }
    function getName() {
        return playerName;
    }
    function initBoard() {
        playerBoard = '000000000';
    }
    function isWinning(value) {
        var arr, check_1, check_2, check_3, check_4, check_5, check_6, check_7, check_8;
        arr = playerBoard.split('');
        check_1 = arr[0] + arr[1] + arr[2];
        check_2 = arr[3] + arr[4] + arr[5];
        check_3 = arr[6] + arr[7] + arr[8];
        check_4 = arr[0] + arr[3] + arr[6];
        check_5 = arr[1] + arr[4] + arr[7];
        check_6 = arr[2] + arr[5] + arr[8];
        check_7 = arr[0] + arr[4] + arr[8];
        check_8 = arr[2] + arr[4] + arr[6];
        if (check_1 == '111')
            return true;
        if (check_2 == '111')
            return true;
        if (check_3 == '111')
            return true;
        if (check_4 == '111')
            return true;
        if (check_5 == '111')
            return true;
        if (check_6 == '111')
            return true;
        if (check_7 == '111')
            return true;
        if (check_8 == '111')
            return true;
        return false;
    }
    function makeMove(value) {
        playerBoard = replaceCharInString(playerBoard, value, 1);
    }
    function setMarker(newMarker) {
        playerMarker = newMarker;
    }
    function setName(name) {
        playerName = name;
    }
    self.getBoard = getBoard;
    self.getMarker = getMarker;
    self.getName = getName;
    self.initBoard = initBoard;
    self.isWinning = isWinning;
    self.makeMove = makeMove;
    self.setMarker = setMarker;
    self.setName = setName;
    return self;
}
function callBackEnterName(e) {
    var _selectValue_8, displayName1, displayName2, playerName;
    dialog = document.querySelector('dialog');
    playerName = document.querySelector('#playerName');
    displayName1 = document.querySelector('.game1Name');
    displayName2 = document.querySelector('.game2Name');
    _selectValue_8 = playerName.className;
    if (_selectValue_8 === 'p1') {
        Player1.setName(playerName.value);
        displayName1.innerText = playerName.value;
    } else {
        if (_selectValue_8 === 'p2') {
            Player2.setName(playerName.value);
            displayName2.innerText = playerName.value;
        }
    }
    e.preventDefault();
    dialog.close();
    console.log(playerName.className, playerName.value);
}
function callBackPlayerName1(e) {
    var label, playerName;
    playerName = document.querySelector('#playerName');
    playerName.value = Player1.getName();
    playerName.className = 'p1';
    label = document.querySelector('label');
    label.innerText = 'Player1 name';
    dialog = document.querySelector('dialog');
    dialog.showModal();
}
function callBackPlayerName2(e) {
    var label, playerName;
    playerName = document.querySelector('#playerName');
    playerName.value = Player2.getName();
    playerName.className = 'p2';
    label = document.querySelector('label');
    label.innerText = 'Player2 name';
    dialog = document.querySelector('dialog');
    dialog.showModal();
    Player2.setName(playerName);
}
function clearHTMLBoard() {
    var squares;
    squares = document.querySelectorAll('.container p');
    squares.forEach(item => {
        item.innerText = '';
    });
}
function clickSquare(e) {
    var square;
    square = e.target.id;
    GameObject.numberEntered(square.slice(1));
}
function disableButtons(status) {
    var button;
    button = document.querySelector('#newGame');
    button.disabled = status;
    button = document.querySelector('#player1Name');
    button.disabled = status;
    button = document.querySelector('#player2Name');
    button.disabled = status;
}
function displayGameResult(message) {
    var elem;
    elem = document.querySelector('.playerMove');
    elem.innerText = message;
}
function drawBoard(board) {
    board = board.split('').join(' ');
    console.log(board.slice(0, 5));
    console.log(board.slice(6, 11));
    console.log(board.slice(12));
}
function invitePlayerToMove(currentPlayer) {
    var elem, playerName;
    playerName = currentPlayer.getName();
    console.log(`${ playerName } move`);
    console.log('Enter number from 1 to 9');
    console.log('or ESC to exit the game...');
    elem = document.querySelector('.playerMove');
    elem.innerText = `${ playerName } move`;
}
function keyPressed(e) {
    var _selectValue_6;
    if (e.key >= '1' && e.key <= '9') {
        GameObject.numberEntered(e.key);
    } else {
        _selectValue_6 = e.key;
        if (_selectValue_6 === 'Enter') {
            GameObject.start();
        } else {
            if (_selectValue_6 === 'Escape') {
                GameObject.escapeEntered(e.key);
            }
        }
    }
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function replaceCharInString(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}
function tictactoeHTML(Player1, Player2) {
    var self = {};
    var Board, container, currentPlayer, playerNum;
    disableButtons(false);
    container = document.querySelector('.main');
    Board = BoardClass();
    currentPlayer = '';
    playerNum = 1;
    self.state = 'newGame';
    function newGame_start() {
        clearHTMLBoard();
        disableButtons(true);
        Player1.initBoard();
        Player2.initBoard();
        if (!(randomInteger(1, 2) == 1)) {
            Player1.setMarker('O');
            Player2.setMarker('X');
        }
        if (randomInteger(1, 2) == 1) {
            currentPlayer = Player1;
        } else {
            playerNum = 2;
            currentPlayer = Player2;
        }
        invitePlayerToMove(currentPlayer);
        console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
        console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
        drawBoard(Board.getBoard());
        self.state = 'playGame';
    }
    function playGame_escapeEntered(value) {
        clearHTMLBoard();
        console.log('game over');
        container = document.querySelector('.main');
        container.style.visibility = 'hidden';
        self.state = undefined;
    }
    function playGame_numberEntered(value) {
        var finalMessage, validMove;
        validMove = Board.isValidMove(value);
        if (validMove) {
            currentPlayer.makeMove(value - 1);
            Board.change(value - 1, currentPlayer.getMarker());
            if (currentPlayer.isWinning()) {
                finalMessage = currentPlayer.getName() + ' win the game !!!';
                drawBoard(Board.getBoard());
                console.log(finalMessage);
                displayGameResult(finalMessage);
                disableButtons(false);
                container = document.querySelector('.main');
                Board = BoardClass();
                currentPlayer = '';
                playerNum = 1;
                self.state = 'newGame';
            } else {
                if (playerNum == 1) {
                    playerNum = 2;
                    currentPlayer = Player2;
                } else {
                    playerNum = 1;
                    currentPlayer = Player1;
                }
                if (Board.areThereFreeSquares()) {
                    invitePlayerToMove(currentPlayer);
                    console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
                    console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
                    drawBoard(Board.getBoard());
                    self.state = 'playGame';
                } else {
                    finalMessage = 'It\'s a draw game.';
                    drawBoard(Board.getBoard());
                    console.log(finalMessage);
                    displayGameResult(finalMessage);
                    disableButtons(false);
                    container = document.querySelector('.main');
                    Board = BoardClass();
                    currentPlayer = '';
                    playerNum = 1;
                    self.state = 'newGame';
                }
            }
        } else {
            if (Board.areThereFreeSquares()) {
                invitePlayerToMove(currentPlayer);
                console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
                console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
                drawBoard(Board.getBoard());
                self.state = 'playGame';
            } else {
                finalMessage = 'It\'s a draw game.';
                drawBoard(Board.getBoard());
                console.log(finalMessage);
                displayGameResult(finalMessage);
                disableButtons(false);
                container = document.querySelector('.main');
                Board = BoardClass();
                currentPlayer = '';
                playerNum = 1;
                self.state = 'newGame';
            }
        }
    }
    function escapeEntered(value) {
        switch (self.state) {
        case 'playGame':
            return playGame_escapeEntered(value);
        default:
            return undefined;
        }
    }
    function numberEntered(value) {
        switch (self.state) {
        case 'playGame':
            return playGame_numberEntered(value);
        default:
            return undefined;
        }
    }
    function start() {
        switch (self.state) {
        case 'newGame':
            return newGame_start();
        default:
            return undefined;
        }
    }
    self.escapeEntered = escapeEntered;
    self.numberEntered = numberEntered;
    self.start = start;
    return self;
}