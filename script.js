const Modul = (function () {
    const gameboard = [["", "", ""],
                        ["", "", ""],
                        ["", "", ""]];
    let player1, player2;
    let move = 0;
    let gameActive = true;
    const btnStart = document.querySelector('#start');
    const btnRestart = document.querySelector('#restart');
    const fields = document.querySelectorAll("#gameboard div");
    const divDisplay = document.querySelector('#result');

    function getUserInput(str) {
        return document.querySelector(str).value;
    }
    
    function createPlayer(name, sign, turn) {
        return {name, sign, turn};
    }

    function restartGame() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                gameboard[i][j] = "";
            }
        }
        move = 0;
        gameActive = true;

        fields.forEach((field) => {
            field.textContent = "";
        });

        divDisplay.textContent = "";
    }

    function displayResult(winner) {        
        if(winner) {
            divDisplay.textContent = "The winner is: " +  winner.name;
        } else {
            divDisplay.textContent = "It's a draw!";
        }
    }

    function setEventsAndIndexesOnAllDivs() {
        let index = 0;

        fields.forEach((field) => {
            field.dataset.row = Math.floor(index / 3);
            field.dataset.col = index % 3;
            index++;

            field.addEventListener('click', (e) => {markField(e.target)});
        });
    }

    function markField(field) {
        if(!gameActive || field.textContent !== "") {
            return;
        }

        let currentPlayer, nextPlayer;
        if(player1.turn) {
            currentPlayer = player1;
            nextPlayer = player2;
        } else if(player2.turn) {
            currentPlayer = player2;
            nextPlayer = player1;
        }

        gameboard[field.dataset.row][field.dataset.col] = currentPlayer.sign;
        field.textContent = currentPlayer.sign;
        move++;

        if(checkForWinner(currentPlayer, move)) {
            displayResult(currentPlayer);
            gameActive = false;
            return;
        }
        if(move >= 9) {
            displayResult();
            gameActive = false;
            return;
        }

        currentPlayer.turn = false;
        nextPlayer.turn = true;
    }

    function checkForWinner(currentPlayer) {
        const sign = currentPlayer.sign;

        for(let row = 0; row < 3; row++) {
            if(gameboard[row][0] === sign && gameboard[row][1] === sign && gameboard[row][2] === sign) {
                return true;
            }
        }

        for(let col = 0; col < 3; col++) {
            if(gameboard[0][col] === sign && gameboard[1][col] === sign && gameboard[2][col] === sign) {
                return true;
            }
        }

        if(gameboard[0][0] === sign && gameboard[1][1] === sign && gameboard[2][2] === sign) {
            return true;
        }

        if(gameboard[0][2] === sign && gameboard[1][1] === sign && gameboard[2][0] === sign) {
            return true;
        }
        return false;
    }    

    function startGame() {
        player1 = createPlayer(getUserInput('#player1'), 'X', true);
        player2 = createPlayer(getUserInput('#player2'), 'O', false);

        if(player1.name.trim() === "" || player2.name.trim() === "") {
            alert("Please enter names for both players");
            return;
        }
        setEventsAndIndexesOnAllDivs()
    }

    btnStart.addEventListener('click', startGame);
    btnRestart.addEventListener('click', restartGame);
})();