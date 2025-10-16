document.addEventListener('keydown', keyPressed);
const GameObject = tictactoe();
function drawBoard(board) {
    console.log(board.slice(0, 3));
    console.log(board.slice(3, 6));
    console.log(board.slice(6));
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
    var currentBoard, player1Board, player1Marker, player2Board, player2Marker;
    currentBoard = '.........';
    player1Board = '000000000';
    player2Board = '000000000';
    player1Marker = 'X';
    player2Marker = 'O';
    console.log('Press enter to start game ...');
    self.state = 'newGame';
    function newGame_start() {
        if (!(randomInteger(1, 2) == 1)) {
            player1Marker = 'O';
            player2Marker = 'X';
        }
        if (randomInteger(1, 2) == 1) {
            invitePlayerToMove(1);
            drawBoard(currentBoard);
            self.state = 'player1';
        } else {
            invitePlayerToMove(2);
            drawBoard(currentBoard);
            self.state = 'player2';
        }
    }
    function player1_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function player1_numberEntered(value) {
        currentBoard = replaceCharInString(currentBoard, value - 1, player1Marker);
        invitePlayerToMove(2);
        drawBoard(currentBoard);
        self.state = 'player2';
    }
    function player2_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function player2_numberEntered(value) {
        currentBoard = replaceCharInString(currentBoard, value - 1, player2Marker);
        invitePlayerToMove(1);
        drawBoard(currentBoard);
        self.state = 'player1';
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