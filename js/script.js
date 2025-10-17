document.addEventListener('keydown', keyPressed);
const GameObject = tictactoeHTML();
function BoardClass() {
    var self = {};
    var currentBoard;
    currentBoard = '.........';
    function areThereFreeSquares() {
        return currentBoard.indexOf('.') > 0;
    }
    function change(value, marker) {
        currentBoard = replaceCharInString(currentBoard, value, marker);
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
    function isWinning(value) {
        var result;
        result = true;
        if (!(playerBoard === '111000000' || (playerBoard === '000111000' || playerBoard === '000000111' || playerBoard === '100100100' || playerBoard === '010010010' || playerBoard === '001001001' || playerBoard === '100010001' || playerBoard === '001010100'))) {
            result = false;
        }
        return result;
    }
    function makeMove(value) {
        playerBoard = replaceCharInString(playerBoard, value, 1);
    }
    function setMarker(newMarker) {
        playerMarker = newMarker;
    }
    self.getBoard = getBoard;
    self.getMarker = getMarker;
    self.isWinning = isWinning;
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
    var _selectValue_10;
    if (e.key >= '1' && e.key <= '9') {
        GameObject.numberEntered(e.key);
    } else {
        _selectValue_10 = e.key;
        if (_selectValue_10 === 'Enter') {
            GameObject.start();
        } else {
            if (_selectValue_10 === 'Escape') {
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
    console.log('Press enter to start new game ...');
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
        console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
        console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
        drawBoard(Board.getBoard());
        self.state = 'playGame';
    }
    function playGame_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function playGame_numberEntered(value) {
        var finalMessage, validMove;
        validMove = Board.isValidMove(value);
        if (validMove) {
            currentPlayer.makeMove(value - 1);
            Board.change(value - 1, currentPlayer.getMarker());
            if (currentPlayer.isWinning()) {
                finalMessage = 'Player' + playerNum + ' win the game !!!';
                console.clear();
                drawBoard(Board.getBoard());
                console.log(finalMessage);
                Player1 = PlayerClass('X');
                Player2 = PlayerClass('O');
                Board = BoardClass();
                currentPlayer = '';
                playerNum = 1;
                console.log('Press enter to start new game ...');
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
                    invitePlayerToMove(playerNum);
                    console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
                    console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
                    drawBoard(Board.getBoard());
                    self.state = 'playGame';
                } else {
                    finalMessage = 'It\'s a draw game.';
                    console.clear();
                    drawBoard(Board.getBoard());
                    console.log(finalMessage);
                    Player1 = PlayerClass('X');
                    Player2 = PlayerClass('O');
                    Board = BoardClass();
                    currentPlayer = '';
                    playerNum = 1;
                    console.log('Press enter to start new game ...');
                    self.state = 'newGame';
                }
            }
        } else {
            if (Board.areThereFreeSquares()) {
                invitePlayerToMove(playerNum);
                console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
                console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
                drawBoard(Board.getBoard());
                self.state = 'playGame';
            } else {
                finalMessage = 'It\'s a draw game.';
                console.clear();
                drawBoard(Board.getBoard());
                console.log(finalMessage);
                Player1 = PlayerClass('X');
                Player2 = PlayerClass('O');
                Board = BoardClass();
                currentPlayer = '';
                playerNum = 1;
                console.log('Press enter to start new game ...');
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
function tictactoeHTML() {
    var self = {};
    var Board, Player1, Player2, container, currentPlayer, playerNum;
    container = document.querySelector('.container');
    container.style.visibility = 'hidden';
    Player1 = PlayerClass('X');
    Player2 = PlayerClass('O');
    Board = BoardClass();
    currentPlayer = '';
    playerNum = 1;
    self.state = 'newGame';
    function newGame_start() {
        container.style.visibility = 'visible';
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
        console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
        console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
        drawBoard(Board.getBoard());
        self.state = 'playGame';
    }
    function playGame_escapeEntered(value) {
        console.log('game over');
        self.state = undefined;
    }
    function playGame_numberEntered(value) {
        var finalMessage, validMove;
        validMove = Board.isValidMove(value);
        if (validMove) {
            currentPlayer.makeMove(value - 1);
            Board.change(value - 1, currentPlayer.getMarker());
            if (currentPlayer.isWinning()) {
                finalMessage = 'Player' + playerNum + ' win the game !!!';
                console.clear();
                drawBoard(Board.getBoard());
                console.log(finalMessage);
                container = document.querySelector('.container');
                container.style.visibility = 'hidden';
                Player1 = PlayerClass('X');
                Player2 = PlayerClass('O');
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
                    invitePlayerToMove(playerNum);
                    console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
                    console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
                    drawBoard(Board.getBoard());
                    self.state = 'playGame';
                } else {
                    finalMessage = 'It\'s a draw game.';
                    console.clear();
                    drawBoard(Board.getBoard());
                    console.log(finalMessage);
                    container = document.querySelector('.container');
                    container.style.visibility = 'hidden';
                    Player1 = PlayerClass('X');
                    Player2 = PlayerClass('O');
                    Board = BoardClass();
                    currentPlayer = '';
                    playerNum = 1;
                    self.state = 'newGame';
                }
            }
        } else {
            if (Board.areThereFreeSquares()) {
                invitePlayerToMove(playerNum);
                console.log(`Player1(${ Player1.getMarker() }) ${ Player1.getBoard() } ${ Player1.isWinning() }`);
                console.log(`Player2(${ Player2.getMarker() }) ${ Player2.getBoard() } ${ Player2.isWinning() }`);
                drawBoard(Board.getBoard());
                self.state = 'playGame';
            } else {
                finalMessage = 'It\'s a draw game.';
                console.clear();
                drawBoard(Board.getBoard());
                console.log(finalMessage);
                container = document.querySelector('.container');
                container.style.visibility = 'hidden';
                Player1 = PlayerClass('X');
                Player2 = PlayerClass('O');
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