
const state = {
    view: {
        
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),

        
        startScreen: document.querySelector('#start-screen'),
        playButton: document.querySelector('#play-button'),
        gameOverScreen: document.querySelector('#game-over-screen'),
        finalScore: document.querySelector('#final-score'),
        restartButton: document.querySelector('#restart-button'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions: {
       
      timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countdown, 1000),
    }
};


function showGameOver(finalScore) {
    state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
    state.view.gameOverScreen.style.display = 'flex'; 
    state.view.finalScore.textContent = finalScore; 
    document.getElementById('../src/audios/Bell.m4a').play(); 
  
  
  });
}


function countdown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        
        showGameOver(state.values.result);
    }
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
    
}


function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}


function startGame() {
    state.view.startScreen.style.display = 'none'; 
    
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countdown, 1000);
    playSound("Cartoon");
}


function initialize() {
    
    addListenerHitbox();

    
    state.view.playButton.addEventListener('click', startGame);    
    state.view.restartButton.addEventListener('click', () => {
      
      
        window.location.reload();
          playSound("Bell")
    });
}

initialize();