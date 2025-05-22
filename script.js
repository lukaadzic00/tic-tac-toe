const Modul = (function () {
    const gameboard = [["", "", ""],
                        ["", "", ""],
                        ["", "", ""]];
    let winner;
    let turn = 1;
    let player1, player2;
    let gameActive = true;
    const btnStart = document.querySelector('#start');

    function getUserInput(str) {
        return document.querySelector(str).value;
    }
    
    function createPlayer(name, sign) {
        return {name, sign};
    }

    function setEventsAndIndexesOnAllDivs() {
        const fields = document.querySelectorAll("#gameboard div");
        let index = 0;

        fields.forEach((field) => {
            field.dataset.row = Math.floor(index / 3);
            field.dataset.col = index % 3;
            index++;

            field.addEventListener('click', (e) => {markerField(e.target)});
        });
    }

    function markerField(field) {
        if(!gameActive) {
            return;
        }
        const currentPlayer = (turn === 1) ? player1 : (turn === 2 ? player2 : null);

        gameboard[field.dataset.row][field.dataset.col] = currentPlayer.sign;
        field.textContent = currentPlayer.sign;

        if(checkForWinner(currentPlayer)) {
            winner = currentPlayer;
            console.log("GAME OVER, Winner is: " + currentPlayer.name);
            gameActive = false;
            return;
        }

        turn = (turn === 1) ? 2 : 1;
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
    }    

    function startGame() {
        player1 = createPlayer(getUserInput('#player1'), 'X');
        player2 = createPlayer(getUserInput('#player2'), 'O');

        setEventsAndIndexesOnAllDivs()
    }

    btnStart.addEventListener('click', startGame);
})();
