'use strict';

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const productObjects = [];
let randomizedProductObjects = [];
let firstCandidateInstance;
let secondCandidateInstance;
let thirdCandidateInstance;
const firstCandidateImage = document.querySelector('#productImages img:first-child');
const secondCandidateImage = document.querySelector('#productImages img:nth-child(2)');
const thirdCandidateImage = document.querySelector('#productImages img:last-child');
const viewResultsButton = document.querySelector('#viewResults');
const resultsList = document.querySelector('#resultsList');
let roundCounter = 0;
const maxRounds = 25;


// product constructor function
function Product(productName) {
  this.productName = productName;
  this.imgSrc = `img/${productName}.jpg`;
  this.views = 0;
  this.votes = 0;
}

// create product objects
function initProductObjects() {
  for (let i = 0; i < productNames.length; i++) {
    const currentProduct = new Product(productNames[i]);
    productObjects.push(currentProduct);
  }
}

// fix "sweep" product imgSrc file extension
function fixSweep() {
  for (let i = 0; i < productObjects.length; i++) {
    const currentProduct = productObjects[i];
    if (currentProduct.productName === 'sweep') {
      currentProduct.imgSrc = 'img/sweep.png';
    }
  }
}

// randomize order of the productObjects array with the Fisher-Yates shuffle algorithm via ChatGPT
function shuffleProductObjects() {
  randomizedProductObjects = productObjects.slice();
  for (let i = randomizedProductObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomizedProductObjects[i], randomizedProductObjects[j]] = [randomizedProductObjects[j], randomizedProductObjects[i]];
  }
}

// render products to be voted on
function renderProductCandidates() {
  if (roundCounter === maxRounds) {
    endVotingSession();
  }

  if (randomizedProductObjects.length === 0) {
    shuffleProductObjects();
  }

  firstCandidateInstance = randomizedProductObjects.pop();
  firstCandidateImage.setAttribute('src', firstCandidateInstance.imgSrc);
  firstCandidateImage.setAttribute('alt', firstCandidateInstance.productName);
  firstCandidateInstance.views++;

  if (randomizedProductObjects.length === 0) {
    shuffleProductObjects();
  }

  secondCandidateInstance = randomizedProductObjects.pop();
  secondCandidateImage.setAttribute('src', secondCandidateInstance.imgSrc);
  secondCandidateImage.setAttribute('alt', secondCandidateInstance.productName);
  secondCandidateInstance.views++;

  if (randomizedProductObjects.length === 0) {
    shuffleProductObjects();
  }

  thirdCandidateInstance = randomizedProductObjects.pop();
  thirdCandidateImage.setAttribute('src', thirdCandidateInstance.imgSrc);
  thirdCandidateImage.setAttribute('alt', thirdCandidateInstance.productName);
  thirdCandidateInstance.views++;
}

// end voting sessions
function endVotingSession() {
  firstCandidateImage.removeEventListener('click', firstCandidateVote);
  secondCandidateImage.removeEventListener('click', secondCandidateVote);
  thirdCandidateImage.removeEventListener('click', thirdCandidateVote);
  viewResultsButton.addEventListener('click', renderResults);
  viewResultsButton.removeAttribute('disabled');
}

// render results from voting session
function renderResults() {
  for (let i = 0; i < productObjects.length; i++) {
    const currentProduct = productObjects[i];
    const result = `${currentProduct.productName} got ${currentProduct.votes} votes and was shown as an option ${currentProduct.views} times.`;
    const resultListItem = document.createElement('li');
    resultsList.appendChild(resultListItem);
    resultListItem.textContent = result;
  }
}

// functions to handle votes for product candidates
function firstCandidateVote() {
  firstCandidateInstance.votes++;
  roundCounter++;
  renderProductCandidates();
}

function secondCandidateVote() {
  secondCandidateInstance.votes++;
  roundCounter++;
  renderProductCandidates();
}

function thirdCandidateVote() {
  thirdCandidateInstance.votes++;
  roundCounter++;
  renderProductCandidates();
}

// run application
initProductObjects();
fixSweep();
renderProductCandidates();

// event listeners for clicks (votes)
firstCandidateImage.addEventListener('click', firstCandidateVote);
secondCandidateImage.addEventListener('click', secondCandidateVote);
thirdCandidateImage.addEventListener('click', thirdCandidateVote);
