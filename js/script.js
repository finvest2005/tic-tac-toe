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
    var _selectValue_8;
    if (e.key >= '1' && e.key <= '9') {
        GameObject.numberEntered(e.key);
    } else {
        _selectValue_8 = e.key;
        if (_selectValue_8 === 'Enter') {
            GameObject.start();
        } else {
            if (_selectValue_8 === 'Escape') {
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
    var Board, Player1, Player2;
    Player1 = PlayerClass('X');
    Player2 = PlayerClass('O');
    Board = BoardClass();
    console.log('Press enter to start game ...');
    self.state = 'newGame';
    function newGame_start() {
        if (!(randomInteger(1, 2) == 1)) {
            Player1.setMarker('O');
            Player2.setMarker('X');
        }
        if (randomInteger(1, 2) == 1) {
            invitePlayerToMove(1);
            console.log(Player1.getBoard());
            drawBoard(Board.getBoard());
            self.state = 'player1';
        } else {
            invitePlayerToMove(2);
            console.log(Player2.getBoard());
            drawBoard(Board.getBoard());
            self.state = 'player2';
        }
    }
    function player1_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function player1_numberEntered(value) {
        if (Board.isValidMove(value)) {
            Board.change(value - 1, Player1.getMarker());
            Player1.makeMove(value - 1);
            invitePlayerToMove(2);
            console.log(Player2.getBoard());
            drawBoard(Board.getBoard());
            self.state = 'player2';
        } else {
            invitePlayerToMove(1);
            console.log(Player1.getBoard());
            drawBoard(Board.getBoard());
            self.state = 'player1';
        }
    }
    function player2_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function player2_numberEntered(value) {
        if (Board.isValidMove(value)) {
            Board.change(value - 1, Player2.getMarker());
            Player2.makeMove(value - 1);
            invitePlayerToMove(1);
            console.log(Player1.getBoard());
            drawBoard(Board.getBoard());
            self.state = 'player1';
        } else {
            invitePlayerToMove(2);
            console.log(Player2.getBoard());
            drawBoard(Board.getBoard());
            self.state = 'player2';
        }
    }
    function escapeEntered(value) {
        switch (self.state) {
        case 'player1':
            return player1_escapeEntered(value);
        case 'player2':
            return player2_escapeEntered(value);
        default:
            return undefined;
        }
    }
    function numberEntered(value) {
        switch (self.state) {
        case 'player1':
            return player1_numberEntered(value);
        case 'player2':
            return player2_numberEntered(value);
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