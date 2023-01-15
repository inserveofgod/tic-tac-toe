// positions of X and O
pos = [[[], [], []], [[], [], []], [[], [], []]];

// id buttons
let buttonArray = ["btn00", "btn01", "btn02", "btn10", "btn11", "btn12", "btn20", "btn21", "btn22"];

// turn of player
let turn = true;

// class buttons
let buttons = document.getElementsByClassName("tic-btn");

// message box container
let container = document.getElementById("msg-box");


// filter first 'btn' char of button id
function filterArray(context){
    context = context.replace("btn", "");
    return context;
}

// set position of X and O
function setPos(which){
    let position = filterArray(buttonArray[which]);
    pos[0][parseInt(position[0])][parseInt(position[1])] = turn;
}

// check if all winnable fields equal
function checkTruth(truth){
    if (truth[0] === true && truth[1] === true && truth[2] === true){
        return true;
    }

    if (truth[0] === false && truth[1] === false && truth[2] === false){
        return true;
    }

    return false;
}

// check if all winnable fields filled
function checkWinning(){
    let won;

    let win1 = [pos[0][0][0], pos[0][0][1], pos[0][0][2]];
    let win2 = [pos[0][1][0], pos[0][1][1], pos[0][1][2]];
    let win3 = [pos[0][2][0], pos[0][2][1], pos[0][2][2]];
    let win4 = [pos[0][0][0], pos[0][1][0], pos[0][2][0]];
    let win5 = [pos[0][0][1], pos[0][1][1], pos[0][2][1]];
    let win6 = [pos[0][0][2], pos[0][1][2], pos[0][2][2]];
    let win7 = [pos[0][0][0], pos[0][1][1], pos[0][2][2]];
    let win8 = [pos[0][0][2], pos[0][1][1], pos[0][2][0]];
    let wins = [win1, win2, win3, win4, win5, win6, win7, win8];

    for (let win in wins){
        won = checkTruth(wins[win]);
        console.log(won);
        if (won){
            break;
        }
    }

    return won;
}

// make the text color white when clicked to show the content of button
function makeClicked(elem){
    elem.classList.add("clicked");
}

// toggle turn of player
function toggleTurn(){
    turn = !turn;
}

// toggle bg
function toggleMove(){
    if (turn){
        document.getElementById("player-one").classList.add("current-move");
        document.getElementById("player-two").classList.remove("current-move");
    } else {
        document.getElementById("player-one").classList.remove("current-move");
        document.getElementById("player-two").classList.add("current-move");
    }
}

// disable filled btn
function disable(ref){
    ref.classList.add("disabled");
    ref.disabled = true;
}

// disable all buttons after game finish
function disableAll(){
    for (let n = 0; n < buttonArray.length; n++){
        disable(document.getElementById(buttonArray[n]));
    }
}

// reload screen when user clicks msg box to retry
function setLoader(){
    container.onclick = function (){
        location.reload();
    }
}

// show message box
function showMsg(text){
    setLoader();

    container.innerHTML = text;
    container.style.bottom = "0";
}

// check if all buttons are disabled before any player wins else round is draw..
function checkDraw(){
    let text = "Oyun berabere bitti. :/ <br>Yeniden denemek için buraya tıklayın.";

    for (let n = 0; n < buttons.length; n++){
        if (!buttons[n].hasAttribute("disabled")){
            return false;
        }
    }

    showMsg(text);
    return true;
}

// fill game buttons and calculate other possibilities
function marker(event, which){
    let current = document.getElementById(buttonArray[which]);
    let player = (turn) ? "Oyuncu 1 (X)" : "Oyuncu 2 (O)";

    current.innerText = (turn) ? "X" : "O";
    disable(current);
    makeClicked(current);
    setPos(which);

    if (checkWinning()){
        disableAll();
        showMsg(player.concat(" kazandı..! :)<br>Yeniden denemek için buraya tıklayın."));
    } else {
        toggleTurn();
        toggleMove();

        checkDraw();
    }
}

// start game button listener
function startGameListeners(){
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function () {
            marker(this, i);
        });
    }
}

// we're starting game listener here..
startGameListeners();
