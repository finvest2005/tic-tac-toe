document.addEventListener('keydown', keyPressed);
const GameObject = tictactoe();
function keyPressed(e) {
    var _selectValue_8;
    if (e.key >= '0' && e.key <= '9') {
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
function tictactoe() {
    var self = {};
    console.log('Press enter to start game ...');
    self.state = 'newGame';
    function newGame_start() {
        console.log('tic tac toe starting ');
        console.log('player1 enter number from 1 to 9');
        console.log('or ESC to exit the game...');
        self.state = 'player1';
    }
    function player1_escapeEntered(value) {
        console.clear();
        console.log('player1 entered escape ', value);
        console.log('game over');
        self.state = undefined;
    }
    function player1_numberEntered(value) {
        console.clear();
        console.log('player1 entered number ', value);
        console.log('player2 enter number from 1 to 9');
        console.log('or ESC to exit the game...');
        self.state = 'player2';
    }
    function player2_escapeEntered(value) {
        console.clear();
        console.log('player2 entered escape ', value);
        console.log('game over');
        self.state = undefined;
    }
    function player2_numberEntered(value) {
        console.clear();
        console.log('player2 entered number ', value);
        console.log('player1 enter number from 1 to 9');
        console.log('or ESC to exit the game...');
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