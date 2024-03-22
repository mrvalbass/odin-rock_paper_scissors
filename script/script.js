// Create a game of Rock, Paper, Scissors

// DOM elements
const playerControls = document.querySelector('.player-selection');

const resultBox = document.querySelector('.result');
const roundScore = resultBox.querySelector('.round-score');
const gameScore = resultBox.querySelector('.game-score');
const endBox = document.querySelector('.end')
const gameResult = endBox.querySelector('.game-result');
const retryButton = endBox.querySelector('.retry');

const audio = document.querySelector('audio');
const musicControls = document.querySelector('.music-controls')
const musicButtons = Array.from(musicControls.children)

const computerControls = document.querySelector('.computer-selection');
const computerButtons = Array.from(computerControls.children);

// Set audio
audio.play()
audio.volume = 0.1
musicControls.addEventListener('click', () => {
    if (!audio.paused) {
        musicButtons[0].classList.add('hidden')
        musicButtons[1].classList.remove('hidden')
        audio.pause()
    } else {
        musicButtons[0].classList.remove('hidden')
        musicButtons[1].classList.add('hidden')
        audio.play()
    }
})

//Game Data Initialization
let roundsWon = 0;
let roundsLost = 0;
let gameEnded = false;

// Capitalize a word
function capitalize(word) {
    return word.at(0).toUpperCase() + word.slice(1).toLowerCase()
}

// Reset internal data and displayed info for new game 
function resetGame () {
    roundsWon = 0;
    roundsLost = 0;
    gameEnded = false;
    endBox.style.visibility = 'hidden'
    gameScore.textContent = 'Score : You 0 | Computer 0'
    roundScore.textContent = ''
}

// Get the computer to choose randomly between rock, paper and scissors
function getComputerChoice() {
    switch (Math.floor(Math.random()*3)){
        case 0:
            return 'rock'
        case 1:
            return'paper'
        case 2:
            return 'scissors'
    }
}

// Define winning, tie and losing cases according to player input and computer random choice
function playRound(playerSelection, computerSelection) {
    const roundWon = 
        (playerSelection === 'rock' && computerSelection === 'scissors') 
        || (playerSelection === 'paper' && computerSelection === 'rock')
        || (playerSelection === 'scissors' && computerSelection === 'paper')

    if (roundWon) {
        roundsWon++;
        return `You Won! ${capitalize(playerSelection)} beats ${computerSelection}`
    } else if (playerSelection === computerSelection) {
        return "It's a tie. Rematch!"
    } else {
        roundsLost++;
        return `You Lost! ${capitalize(computerSelection)} beats ${playerSelection}`
    }
}

// Play a Rock, Paper, Scissors game
function playGame(e, pointsToWin = 5) {
    // Update internal data
    const computerSelection = getComputerChoice()
    let roundResult = playRound(e.target.dataset.value,computerSelection);
    if (roundsWon === pointsToWin || roundsLost === pointsToWin) gameEnded = true

    //Display info to player
    computerButtons.forEach((button) => {
        if (button.dataset.value !== computerSelection) {
            button.style.display = 'none'
        } else {
            button.style.display = 'block'
        }
    })
    roundScore.textContent = roundResult
    gameScore.textContent = `Score : You ${roundsWon} | Computer ${roundsLost}`
    if (gameEnded) {
        gameResult.textContent = 
            roundsWon === pointsToWin 
            ? 'Congratulations, you beat the computer \r\n'
            : 'Computer won. Better luck next time \r\n'
        endBox.style.visibility = 'visible'
    }
}

// Listen to player action to launch and play the Game
playerControls.addEventListener('click', (e) => {
    const targetTag = e.target.tagName;
    if (!gameEnded && (targetTag === 'BUTTON' || targetTag === 'svg' || targetTag === 'path')) {
        playGame(e)
    }    
});

// Reset game when retry button is clicked
retryButton.addEventListener('click', () => {
    resetGame()
})