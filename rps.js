let score = JSON.parse(localStorage.getItem('score'))|| {
    wins:0,
    losses:0,
    ties:0
};

updateScoreElement();

/*
if(score === null){
    score = {
        wins:0,
        losses:0,
        ties:0
    };
}
*/

function playGame(playerMove){
    const compMove = pickCompMove();

    let result ='';
    
    if (playerMove === 'scissors'){
        if(compMove === 'rock'){
            result = 'You Lose';
            score.losses += 1;
        }else if (compMove === 'paper'){
            result = 'You Won';
            score.wins += 1;
        }else if (compMove === 'scissors'){
            result = 'Tie';
            score.ties += 1;
        }
    }else if(playerMove === 'paper'){
        if(compMove === 'rock'){
            result = 'You Won';
            score.wins += 1;
        }else if (compMove === 'paper'){
            result = 'Tie';
            score.ties += 1;
        }else if (compMove === 'scissors'){
            result = 'You Lose';
            score.losses += 1;
        }
    }else if(playerMove === 'rock'){
        if(compMove === 'rock'){
            result = 'Tie';
            score.ties += 1;
        }else if (compMove === 'paper'){
            result = 'You lose';
            score.losses ++;
        }else if (compMove === 'scissors'){
            result = 'You won';
            score.wins++;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> 
    <img src="images/${compMove}-emoji.png" class="move-icon"> Computer`;

    /*
    alert(`you picked ${playerMove}. Computer picked ${compMove}. ${result}\nWins:${score.wins},Losses:${score.losses},Ties:${score.ties}`);
    */
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}

function pickCompMove(){
    const randNum = Math.random();
    
    let compMove='';
    
    if(randNum >=0 && randNum< 1/3){
        compMove = 'rock';
    }else if (randNum >= 1/3 && randNum < 2/3){
        compMove = 'paper'
    }else if (randNum >= 2/3 && randNum < 1){
        compMove = 'scissors'
    }

    return compMove;
}

let isAutoPlaying = false;
let intervalId;

function autoplay(){
    if(!isAutoPlaying){
        intervalId = setInterval(function(){
            const playerMove = pickCompMove();
            playGame(playerMove);
        },1000);

        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.body.addEventListener('keydown',(event)=>{
    if (event.key === 'r'){
        playGame('rock');
    }else if (event.key === 'p'){
        playGame('paper');
    }else if (event.key === 's'){
        playGame('scissors');
    }
})