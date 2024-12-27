let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let newGame = document.querySelector('#new');
let msg = document.querySelector('.msg');
let win = document.querySelector('#winner');

let turnO = true; //X or O turn
let count = 0;

const winPat = [   // winning patterns 2D array
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msg.classList.add('hide');
};

const draw = () => {   // for draw
    win.innerText = `Game was a Draw`;
    msg.classList.remove('hide');
    disableBoxes();   
}

boxes.forEach((b) => {             // X or O turn
    b.addEventListener('click', () => {
        if (turnO) {
            b.innerText = 'O';
            turnO = false;   
        } else {
            
            b.innerText = 'X'
            turnO = true;
        }

        b.disabled = true; // cant change values
        count++;

        let winnerFound = checkWin();

        if (count === 9 && winnerFound != 'true') {
           draw(); 
        }


    });
});

const enableBoxes = () => {   // for new game
    for (let box of boxes) {
        box.disabled = false;
        box.innerText='';
    }
}

const disableBoxes = () => {   // cant continue after one player wins
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) =>{
    win.innerText = `Congratulations !! Winner is ${winner}`;
    msg.classList.remove('hide');
    disableBoxes();
}

const checkWin= () => {
    for (pat of winPat) {     // posVal = X or O 
        let pos1Val = boxes[pat[0]].innerText;
        let pos2Val = boxes[pat[1]].innerText;
        let pos3Val = boxes[pat[2]].innerText;

        if (pos1Val != '' && pos2Val != '' && pos3Val != '') { // should not be empty
            if (pos1Val === pos2Val && pos2Val === pos3Val) { // should b equal            
                
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGame.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);

