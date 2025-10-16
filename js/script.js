document.addEventListener('keydown', keyPressed);
const GameObject = tictactoe();
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
function tictactoe() {
    var self = {};
    var currentBoard, player1Board, player2Board;
    currentBoard = '.........';
    player1Board = '000000000';
    player2Board = '000000000';
    console.log('Press enter to start game ...');
    self.state = 'newGame';
    function newGame_start() {
        if (randomInteger(1, 2) == 1) {
            invitePlayerToMove(1);
            self.state = 'player1';
        } else {
            invitePlayerToMove(2);
            self.state = 'player2';
        }
    }
    function player1_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function player1_numberEntered(value) {
        invitePlayerToMove(2);
        self.state = 'player2';
    }
    function player2_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function player2_numberEntered(value) {
        invitePlayerToMove(1);
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