// Create a game of Rock, Paper, Scissors

// Get the computer to choose randomly between rock, paper and scissors
function getComputerChoice () {
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
function getPlayerChoice (gamesLeft, gameData) {
    if (gamesLeft > 1) {
        return prompt(`Welcome to Odin Rock, Paper, Scissors game.\nIt is a BO5 game.\nThere are ${gamesLeft} games left to play.` + gameData + `\nChoose your weapon :`).toLowerCase()
    } else {
        return prompt(`Welcome to Odin Rock, Paper, Scissors game.\nIt is a BO5 game against the computer.\nThere is ${gamesLeft} game left to play.` + gameData + `\nChoose your weapon :`).toLowerCase()
    }
}

// Format the game data
function getGameData (gamesWon, gamesLost) {
    return `\nGames won : ${gamesWon} | Games Lost : ${gamesLost}`
}

// Define winning, tie and losing cases according to player input and computer random choice
function playRound(playerSelection, computerSelection) {
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')) {
        return `You Won! ${playerSelection.at(0).toUpperCase() + playerSelection.slice(1)} beats ${computerSelection}` 
    } else if (playerSelection === computerSelection) {
        return "It's a tie. Rematch!"
    } else {
        return `You Lost! ${computerSelection.at(0).toUpperCase() + computerSelection.slice(1)} beats ${playerSelection}`
    }
}

// Ask user for it's input that can only be rock, paper or scissors and play 5 games in a row
function playGame() {
    //Initialize game data
    let gamesWon = 0;
    let gamesLost = 0;

    for (let i = 0; i < 5; i++) {
        // Initialize round data
        const gamesLeft = 5 - i
        let gameResult = 'tie'

        //Rematch if the game is a tie
        while (gameResult.includes('tie')) {
            // Get user input
            let playerSelection = getPlayerChoice(gamesLeft, getGameData(gamesWon, gamesLost))

            // Check user input
            while (playerSelection !== 'rock' && playerSelection !== 'paper' && playerSelection !== 'scissors') {
                alert('Incorrect input! Choose from Rock, Paper of Scissors');
                playerSelection = getPlayerChoice(gamesLeft, getGameData(gamesWon, gamesLost));
            };

            //Play the round
            gameResult = playRound(playerSelection,getComputerChoice());

            if (gameResult.includes('Won')) {
                gamesWon++;
            } else if (gameResult.includes('Lost')){
                gamesLost++;
            };

            // Output data to the user
            alert(gameResult + getGameData(gamesWon, gamesLost));
        }

        // Stop the game if 3 games have been won from the user or the computer
        if (gamesWon === 3 || gamesLost === 3) {break}
    };

    // Output final message
    if(gamesWon > gamesLost) {
        alert('Congratulations, you beat the computer')
    } else {
        alert('Computer won. Better luck next time')
    }
};

// Launch the Game
playGame()

