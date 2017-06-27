/*----- constants -----*/


/*----- app's state (variables) -----*/
//                  Game
//                  Board
//              ||          ||
//      box1    ||  box2    ||  box3
//     ===============================
//              ||          ||
//      box4    ||  box5    ||  box6
//     ===============================
//              ||          ||  
//      box7    ||  box8    ||  box9
//
var board = new Array(9);
var player1 = true;
var p1 = [];
var p2 = [];
var scoreP1 = 0;
var scoreP2 = 0;
var win = 0;
var winConditions = [["box1", "box2", "box3"], ["box1", "box4", "box7"], ["box1", "box5", "box9"], ["box2", "box5", "box8"], ["box3", "box5", "box7"], ["box3", "box6", "box9"], ["box4", "box5", "box6"], ["box7", "box8", "box9"]];

/*----- cached element references -----*/
var box = document.querySelectorAll("p");
var message = document.querySelector("h2");
var reset = document.querySelector("button");

/*----- event listeners -----*/
for (var i = 0; i < box.length; i++) {
    box[i].addEventListener('click', displayXO);
}

reset.addEventListener('click', initialize);

/*----- functions -----*/
// initialize();

function checkWin() {
    if (win === 1) {
        message.textContent = "P1 wins!";
    }
    else if (win === 2) {
        message.textContent = "P2 wins!";
    }
    else if (win === 3) {
        message.textContent = "It's a tie!";
    }
    else {
        return;
    }
}

function keepScore() {
    if (player1 && scoreP1 !== 3 && scoreP2 !== 3 && p1.length !== 5) {
        if (p1.length >= 3){
            for (var i = 0; i < winConditions.length; i++) {
                for (var j = 0; j < p1.length; j++) {
                   if (winConditions[i].indexOf(p1[j]) >= 0) {
                       scoreP1++;
                   }
                   if (scoreP1 === 3) {
                       win = 1;
                       return true;
                   }
                }
                scoreP1 = 0;
            }
        }
    }
    else if (!player1 && scoreP1 !== 3 && scoreP2 !== 3 && p1.length !== 5) {
        if (p2.length >= 3){
            for (var i = 0; i < winConditions.length; i++) {
                for (var j = 0; j < p2.length; j++) {
                   if (winConditions[i].indexOf(p2[j]) >= 0) {
                       scoreP2++;
                   }
                   if (scoreP2 === 3) {
                       win = 2;
                       return true;
                   }
                }
                scoreP2 = 0;
            }
        }
    }
    else {
        win = 3;
        return false;
    }
};

function displayXO() {
    if (this.textContent || win) {
        return;
    }  
    else if (player1 === true) {
        message.textContent = "It's Player 2's turn";
        this.textContent = "X";
        this.style.backgroundColor = "#22ffc8";
        p1.push(this.getAttribute('id'));
    }
    else {
        message.textContent = "It's Player 1's turn";
        this.textContent = "O";
        this.style.backgroundColor = "#ff7388";
        p2.push(this.getAttribute('id'));
    }

    this.style.padding = "50px 52.7px 50px 54px";
    keepScore()
    player1 = !player1;
    checkWin();
};

function onClick() {
    for (var i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = "#fff2bf";
        box[i].textContent = "";
        box[i].style.padding = "50px 60px 50px 60px";
        message.textContent = "It's Player 1's turn!"
    }
    player1 = true;
    p1 = [];
    p2 = [];
    scoreP1 = 0;
    scoreP2 = 0;
    win = 0;
};