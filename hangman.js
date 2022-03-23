var programming_languages = [
	"abject",
	"aberration",
	"abjure",
	"abnegation",
	"abrogate",
	"abscond",
	"abstruse",
	"accede",
	"accost",
	"accretion",
	"acumen",
	"adamant",
	"admonish",
	"adumbrate",
	"adverse",
	"advocate",
	"affluent",
	"aggrandize",
	"alacrity",
	"alias",
	"ambivalent",
	"amenable",
	"amorphous",
	"anachronistic",
	"anathema",
	"annex",
	"antediluvian",
	"antiseptic",
	"apathetic",
	"antithesis",
	"apocryphal",
	"approbation",
	"arbitrary",
	"arboreal",
	"arcane",
	"archetypal",
	"arrogate",
	"ascetic",
	"aspersion",
	"assiduous",
	"atrophy",
	"bane",
	"bashful",
	"beguile",
	"bereft",
	"blandishment",
	"bilk",
	"bombastic",
	"cajole",
	"callous",
	"calumny",
	"camaraderie",
	"candor",
	"capitulate",
	"carouse",
	"carp",
	"caucus",
	"cavort",
	"circumlocution",
	"circumscribe",
	"circumvent",
	"clamor",
	"cleave",
	"cobbler",
	"cogent",
	"cognizant",
	"commensurate",
	"complement",
	"compunction",
	"concomitant",
	"conduit",
	"conflagration",
	"congruity",
	"connive",
	"consign",
	"constituent",
	"construe",
	"contusion",
	"contrite",
	"contentious",
	"contravene",
	"convivial",
	"corpulence",
	"covet",
	"cupidity",
	"dearth",
	"debacle",
	"debauch",
	"debunk",
	"defunct",
	"demagogue",
	"denigrate",
	"derivative",
	"despot",
	"diaphanous",
	"didactic",
	"dirge",
	"disaffected",
	"discomfit",
	"disparate",
	"dispel",
	"disrepute",
	"divisive",
	"dogmatic",
	"dour",
	"duplicity",
	"duress",
	"eclectic",
	"edict",
	"ebullient",
	"egregious",
	"elegy"
]
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-warning m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
