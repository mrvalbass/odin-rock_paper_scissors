// Create a game of Rock, Paper, Scissors

// Capitalize a word
function capitalize(word) {
    return word.at(0).toUpperCase() + word.slice(1).toLowerCase()
}

// Format the game data for better readability
function formatGameData(gamesWon, gamesLost) {
    return `Games won : ${gamesWon} | Games Lost : ${gamesLost}`
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

// Get the user input
function getPlayerChoice(gamesLeft, gameData) {
    let playerSelection;
    do {
        playerSelection = prompt(
`Welcome to Odin Rock, Paper, Scissors game.
It is a BO5 game.
There ${gamesLeft > 1 ? `are ${gamesLeft} games` : `is ${gamesLeft} game`} left to play. 
${gameData}
Choose your weapon :`
        ).toLowerCase().trim();
        if (playerSelection !== 'rock' && playerSelection !== 'paper' && playerSelection !== 'scissors') {
            alert('Incorrect input! Choose from Rock, Paper of Scissors');
        };
    } while (playerSelection !== 'rock' && playerSelection !== 'paper' && playerSelection !== 'scissors');
    return playerSelection;
}

// Define winning, tie and losing cases according to player input and computer random choice
function playRound(playerSelection, computerSelection) {
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')) {
        return `You Won! ${capitalize(playerSelection)} beats ${computerSelection}` 
    } else if (playerSelection === computerSelection) {
        return "It's a tie. Rematch!"
    } else {
        return `You Lost! ${capitalize(computerSelection)} beats ${playerSelection}`
    }
}

// Play a BO5 Rock, Paper, Scissors game
function playGame() {
    // Game data
    let gamesWon = 0;
    let gamesLost = 0;

    for (let i = 0; i < 5; i++) {
        // Round data
        const gamesLeft = 5 - i
        let roundResult

        //Rematch if the round is a tie
        do {
            let playerSelection = getPlayerChoice(gamesLeft, formatGameData(gamesWon, gamesLost))
            roundResult = playRound(playerSelection,getComputerChoice());

            if (roundResult.includes('Won')) {
                gamesWon++;
            } else if (roundResult.includes('Lost')){
                gamesLost++;
            };

            alert(`${roundResult}\n${formatGameData(gamesWon, gamesLost)}`);
        } while (roundResult.includes('tie'));

        if (gamesWon === 3 || gamesLost === 3) {break};
    };

    if(gamesWon > gamesLost) {
        alert('Congratulations, you beat the computer')
    } else {
        alert('Computer won. Better luck next time')
    }
};

// Launch the Game
playGame()

