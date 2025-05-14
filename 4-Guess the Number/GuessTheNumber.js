// To generate a random number between 1 to 100
// Math.random() is used to generate the random number which is decimal values
// parseInt is used to convert floating number to an integer
let randomNumber = parseInt(Math.random()*100 + 1);

// fetch the submit button
const submit = document.querySelector('#subt');
// fetch the userInput
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrhigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = []; // Array of previous guesses
let numGuesses = 1; // number of guesses

let playGame = true; // to play the game

if(playGame){
    // you can play the game
    submit.addEventListener('click', function(e){
    e.preventDefault(); // to prevent the default action of going to that function
    const guess = parseInt(userInput.value); // Take the user input
    validateGuess(guess); // guess is valid or not check it
    });
}

function validateGuess(guess){ // guess is valid or not
    // Invalid
    if(isNaN(guess)) alert('Please enter a valid number');
    else if(guess < 1) alert('Please enter a number more than 1');
    else if(guess > 100) alert('Please enter a number less than 100');
    else{
        // valid
        prevGuess.push(guess); // Push it into the array
        if(numGuesses === 11){ // If the number of guesses ends
            displayGuess(guess); // display it
            displayMessage(`Game Over. Random number was ${randomNumber}`); // diplay the message
            endGame(); // end the game
        }
        else{
            // If the number of guesses does not ends
            displayGuess(guess); // display it
            checkGuess(guess); // check the guess
        }
    }
}

function checkGuess(guess){ // check the guess
    if(guess === randomNumber){ // equal to the random number
        displayMessage(`Your guessed it right`);
        endGame();
    }
    else if(guess < randomNumber){ // lesser than the random number
        displayMessage(`Number is TOO low`);
    }
    else if(guess > randomNumber){ // higher than the random number
        displayMessage(`Number is TOO high`);
    }
}

function displayGuess(guess){ // cleanup guess
    userInput.value = ''; // empty the user input
    guessSlot.innerHTML += `${guess}, `; // show the guess
    numGuesses++; // increment the number of guesses
    remaining.innerHTML = `${11-numGuesses}`;
}

function displayMessage(message){ // display the message interaction with DOM
    lowOrhigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){ // end the game
    userInput.value = ''; // clean the value
    userInput.setAttribute('disabled', ''); // setAttribute is key value pair so make it disabled
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){ // start a new game
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e){
        // Reset the number
    randomNumber = parseInt(Math.random()*100 + 1);
    prevGuess = [];
    numGuesses = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11-numGuesses}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
    });
}