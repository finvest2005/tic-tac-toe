document.addEventListener('keydown', keyPressed);
const GameObject = tictactoe();
function BoardClass() {
    var self = {};
    var currentBoard;
    currentBoard = '.........';
    function change(value, marker) {
        currentBoard = replaceCharInString(currentBoard, value, marker);
    }
    function getBoard() {
        return currentBoard;
    }
    function isValidMove(value) {
        return currentBoard[+value - 1] == '.';
    }
    self.change = change;
    self.getBoard = getBoard;
    self.isValidMove = isValidMove;
    return self;
}
function PlayerClass(marker) {
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
    function makeMove(value) {
        playerBoard = replaceCharInString(playerBoard, value, 1);
    }
    function setMarker(newMarker) {
        playerMarker = newMarker;
    }
    self.getBoard = getBoard;
    self.getMarker = getMarker;
    self.makeMove = makeMove;
    self.setMarker = setMarker;
    return self;
}
function drawBoard(board) {
    board = board.split('').join(' ');
    console.log(board.slice(0, 5));
    console.log(board.slice(6, 11));
    console.log(board.slice(12));
}
function invitePlayerToMove(playerNumber) {
    console.clear();
    console.log(`Player${ playerNumber } move`);
    console.log('Enter number from 1 to 9');
    console.log('or ESC to exit the game...');
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
function tictactoe() {
    var self = {};
    var Board, Player1, Player2, currentPlayer, playerNum;
    Player1 = PlayerClass('X');
    Player2 = PlayerClass('O');
    Board = BoardClass();
    currentPlayer = '';
    playerNum = 1;
    console.log('Press enter to start game ...');
    self.state = 'newGame';
    function newGame_start() {
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
        invitePlayerToMove(playerNum);
        console.log(currentPlayer.getBoard());
        drawBoard(Board.getBoard());
        self.state = 'playGame';
    }
    function playGame_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function playGame_numberEntered(value) {
        if (Board.isValidMove(value)) {
            Board.change(value - 1, currentPlayer.getMarker());
            currentPlayer.makeMove(value - 1);
            if (playerNum == 1) {
                playerNum = 2;
                currentPlayer = Player2;
            } else {
                playerNum = 1;
                currentPlayer = Player1;
            }
        }
        invitePlayerToMove(playerNum);
        console.log(currentPlayer.getBoard());
        drawBoard(Board.getBoard());
        self.state = 'playGame';
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